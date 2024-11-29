import { paths } from '../schema';

export type ArtifactShared =
  paths['/v1/artifacts/{artifact_id}/shared']['get']['responses']['200']['content']['application/json'];
