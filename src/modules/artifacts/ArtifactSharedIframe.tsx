'use client';

import { ArtifactShared } from '@/app/api/artifacts/types';
import { Loader } from '@/components/ui/Loader';
import { USERCONTENT_SITE_URL } from '@/utils/constants';
import { removeTrailingSlash } from 'openapi-fetch';
import { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  artifact: ArtifactShared;
}

export function ArtifactSharedIframe({ artifact }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState<State>(State.LOADING);
  const { source_code: code } = artifact;

  const updateCode = useCallback((code: string | undefined) => {
    if (!code) {
      return;
    }

    iframeRef.current?.contentWindow?.postMessage(
      {
        type: StliteMessageType.UPDATE_CODE,
        code,
      },
      USERCONTENT_SITE_URL
    );
  }, []);

  const handleMessage = useCallback((event: MessageEvent<StliteMessage>) => {
    const { origin, data } = event;

    if (origin !== removeTrailingSlash(USERCONTENT_SITE_URL)) {
      return;
    }

    if (
      data.type === SCRIPT_RUN_STATE_CHANGED &&
      data.scriptRunState === ScriptRunState.RUNNING
    ) {
      setState(State.READY);
    }
  }, []);

  useEffect(() => {
    if (state === State.READY) {
      updateCode(code);
    }
  }, [code, state, updateCode]);

  useEffect(() => {
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [handleMessage]);

  return (
    <div className="relative h-full w-full">
      <iframe
        ref={iframeRef}
        src={USERCONTENT_SITE_URL}
        title="Bee Artifact"
        sandbox="allow-scripts allow-downloads allow-same-origin"
        className="h-full w-full"
      />

      {state === State.LOADING && (
        <div className="absolute inset-0 flex items-center justify-center bg-layer">
          <Loader />
        </div>
      )}
    </div>
  );
}

enum StliteMessageType {
  UPDATE_CODE = 'updateCode',
  // TODO: Add error handling
  ERROR = 'error',
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

const SCRIPT_RUN_STATE_CHANGED = 'SCRIPT_RUN_STATE_CHANGED';

interface StliteMessage {
  type: typeof SCRIPT_RUN_STATE_CHANGED;
  scriptRunState: ScriptRunState;
}
