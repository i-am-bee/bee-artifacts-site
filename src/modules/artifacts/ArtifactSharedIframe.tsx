'use client';

import { ArtifactShared } from '@/app/api/artifacts/types';
import { Loader } from '@/components/ui/Loader';
import { useTheme } from '@/hooks/useTheme';
import { USERCONTENT_SITE_URL } from '@/utils/constants';
import { removeTrailingSlash } from '@/utils/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatCompletionCreateBody } from '@/app/api/apps/types';
import { createChatCompletion, modulesToPackages } from '@/app/api/apps';
import { ApiError } from '@/app/api/errors';

interface Props {
  artifact: ArtifactShared;
  token: string;
}

function getErrorMessage(error: unknown) {
  if (error instanceof ApiError && error.code === 'too_many_requests') {
    return 'You have exceeded the limit for using LLM functions';
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'Unknown error when calling LLM function.';
}

export function ArtifactSharedIframe({ artifact, token }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<State>(State.LOADING);
  const theme = useTheme();
  const [iframeLoadCount, setIframeLoadCount] = useState<number>(0);

  const postMessage = useCallback((message: PostMessage) => {
    if(iframeLoadCount === 0) return;
    iframeRef.current?.contentWindow?.postMessage(
      message,
      USERCONTENT_SITE_URL
    );
  }, [iframeLoadCount]);

  useEffect(() => {
    postMessage({
      type: PostMessageType.UPDATE_STATE,
      stateChange: {
        code: artifact.source_code ?? undefined,
        theme: theme,
        fullscreen: true,
        ancestorOrigin: window.location.origin,
        config: {
          canFixError: false
        }
      }
    })
  }, [artifact.source_code, postMessage, theme]);

  const handleMessage = useCallback(
    async (event: MessageEvent<StliteMessage>) => {
      const { origin, data } = event;

      if (origin !== removeTrailingSlash(USERCONTENT_SITE_URL)) {
        return;
      }

      if (data.type === RecieveMessageType.READY) {
        setState(State.READY);
        return;
      }

      if (data.type === RecieveMessageType.REQUEST) {
        const respond = (payload: unknown = undefined) =>
          postMessage({
            type: PostMessageType.RESPONSE,
            request_id: data.request_id,
            payload,
          });

        try {
          switch (data.request_type) {
            case 'modules_to_packages':
              const packagesResponse = await modulesToPackages(
                data.payload.modules,
                token
              );
              respond(packagesResponse);
              break;

            case 'chat_completion':
              const response = await createChatCompletion(
                data.payload,
                token
              );
              const message = response?.choices[0]?.message?.content;
              if (!message) throw new Error(); // missing completion
              respond({ message });
              break;
          }
        } catch (err) {
          respond({ error: getErrorMessage(err) });
        }
      }
    },
    [token, postMessage]
  );

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <div className="relative h-full w-full lg:mx-auto lg:w-1/2 lg:min-w-[39rem] lg:max-w-[calc(theme(screens.2xl)-theme(spacing.12))]">
      <iframe
        ref={iframeRef}
        src={USERCONTENT_SITE_URL}
        title="BeeAI Artifact"
        sandbox={[
          'allow-scripts',
          'allow-downloads',
          'allow-same-origin',
          'allow-popups',
          'allow-popups-to-escape-sandbox',
        ].join(' ')}
        className="h-full w-full"
        onLoad={() => setIframeLoadCount(i => i + 1)}
      />

      {state === State.LOADING && (
        <div className="absolute inset-0 flex items-center justify-center bg-layer">
          <Loader />
        </div>
      )}
    </div>
  );
}

interface AppState {
  fullscreen: boolean,
  theme: 'light' | 'dark' | 'system',
  code: string,
  config: {
    canFixError: boolean
  },
  ancestorOrigin: string,
}

type PostMessage =
  | {
      type: PostMessageType.UPDATE_STATE;
      stateChange: Partial<AppState>;
    }
  | {
      type: PostMessageType.RESPONSE;
      request_id: string;
      payload: unknown;
    };

enum PostMessageType {
  UPDATE_STATE = 'bee:updateState',
  RESPONSE = 'bee:response',
}

enum State {
  LOADING = 'loading',
  READY = 'ready',
}

enum RecieveMessageType {
  READY = 'bee:ready',
  REQUEST = 'bee:request',
}

export type StliteMessage =
  | {
      type: RecieveMessageType.READY;
    }
  | {
      type: RecieveMessageType.REQUEST;
      request_type: 'modules_to_packages';
      request_id: string;
      payload: { modules: string[] };
    }
  | {
      type: RecieveMessageType.REQUEST;
      request_type: 'chat_completion';
      request_id: string;
      payload: ChatCompletionCreateBody;
    };
