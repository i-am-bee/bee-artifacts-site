'use client';

import { ArtifactShared } from '@/app/api/artifacts/types';
import { Loader } from '@/components/ui/Loader';
import { Theme, useTheme } from '@/hooks/useTheme';
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

  const { source_code: code } = artifact;

  const postMessage = (message: PostMessage) => {
    iframeRef.current?.contentWindow?.postMessage(
      message,
      USERCONTENT_SITE_URL
    );
  };

  const setFullscreen = useCallback((value: boolean) => {
    postMessage({ type: PostMessageType.SET_FULLSCREEN, value });
  }, []);

  const updateTheme = useCallback((theme: Theme) => {
    postMessage({ type: PostMessageType.UPDATE_THEME, theme });
  }, []);

  const updateCode = useCallback((code: string | undefined) => {
    if (!code) {
      return;
    }

    postMessage({ type: PostMessageType.UPDATE_CODE, code });
  }, []);

  const handleMessage = useCallback(
    async (event: MessageEvent<StliteMessage>) => {
      const { origin, data } = event;

      if (origin !== removeTrailingSlash(USERCONTENT_SITE_URL)) {
        return;
      }

      if (
        data.type === RecieveMessageType.SCRIPT_RUN_STATE_CHANGED &&
        data.scriptRunState === ScriptRunState.RUNNING
      ) {
        setState(State.READY);
      }
      if (data.type === RecieveMessageType.REQUEST) {
        try {
          switch (data.request_type) {
            case 'modules_to_packages':
              const packagesResponse = await modulesToPackages(
                data.payload.modules,
                token
              );
              postMessage({
                type: PostMessageType.RESPONSE,
                request_id: data.request_id,
                payload: packagesResponse,
              });
              break;
            case 'chat_completion':
              const response = await createChatCompletion(data.payload, token);
              const message = response?.choices[0]?.message?.content;
              if (!message) throw new Error(); // missing completion
              postMessage({
                type: PostMessageType.RESPONSE,
                request_id: data.request_id,
                payload: { message },
              });
              break;
          }
        } catch (err) {
          postMessage({
            type: PostMessageType.RESPONSE,
            request_id: data.request_id,
            payload: { error: getErrorMessage(err) },
          });
        }
      }
    },
    [token]
  );

  const handleIframeLoad = useCallback(() => {
    updateTheme(theme);
    setFullscreen(true);
  }, [theme, updateTheme, setFullscreen]);

  useEffect(() => {
    updateTheme(theme);
  }, [theme, updateTheme]);

  useEffect(() => {
    if (state === State.READY) {
      updateCode(code);
    }
  }, [code, state, theme, updateCode]);

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
        onLoad={handleIframeLoad}
      />

      {state === State.LOADING && (
        <div className="absolute inset-0 flex items-center justify-center bg-layer">
          <Loader />
        </div>
      )}
    </div>
  );
}

type PostMessage =
  | {
      type: PostMessageType.UPDATE_CODE;
      code: string;
    }
  | {
      type: PostMessageType.UPDATE_THEME;
      theme: Theme;
    }
  | {
      type: PostMessageType.SET_FULLSCREEN;
      value: boolean;
    }
  | {
      type: PostMessageType.RESPONSE;
      request_id: string;
      payload: unknown;
    };

enum PostMessageType {
  UPDATE_CODE = 'bee:updateCode',
  UPDATE_THEME = 'bee:updateTheme',
  SET_FULLSCREEN = 'bee:setFullscreen',
  // TODO: Add error handling
  RESPONSE = 'bee:response',
  ERROR = 'bee:error',
}

enum ScriptRunState {
  INITIAL = 'initial',
  NOT_RUNNING = 'notRunning',
  RUNNING = 'running',
}

enum State {
  LOADING = 'loading',
  READY = 'ready',
}

enum RecieveMessageType {
  SCRIPT_RUN_STATE_CHANGED = 'SCRIPT_RUN_STATE_CHANGED',
  REQUEST = 'bee:request',
}

export type StliteMessage =
  | {
      type: RecieveMessageType.SCRIPT_RUN_STATE_CHANGED;
      scriptRunState: ScriptRunState;
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
