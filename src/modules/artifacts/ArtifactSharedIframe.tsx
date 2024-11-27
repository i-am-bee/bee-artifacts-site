import { ArtifactShared } from '@/app/api/artifacts/types';

interface Props {
  artifact: ArtifactShared;
}

export function ArtifactSharedIframe({ artifact }: Props) {
  console.log(artifact);

  return null;
}
