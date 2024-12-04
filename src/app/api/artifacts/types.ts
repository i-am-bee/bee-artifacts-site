import { ARTIFACT_ICONS } from '@/modules/artifacts/ArtifactIcon';
import { paths } from '../schema';
import { EntityWithDecodedMetadata } from '../types';

export type ArtifactSharedResult =
  paths['/v1/artifacts/{artifact_id}/shared']['get']['responses']['200']['content']['application/json'];

export interface ArtifactSharedMetadata {
  icon?: ArtifactSharedIcon;
}

export type ArtifactSharedIcon = keyof typeof ARTIFACT_ICONS;

export type ArtifactShared = EntityWithDecodedMetadata<
  ArtifactSharedResult,
  ArtifactSharedMetadata
>;
