import { client } from '../client';
import { assertSuccessResponse } from '../utils/assertSuccessResponse';
import { fetchEntity } from '../utils/fetchEntity';
import { decodeEntityWithMetadata } from '../utils/metadata';
import { ArtifactShared } from './types';

type Params = {
  id: string;
  secret: string;
};

async function readArtifactShared({ id, secret }: Params) {
  const res = await client.GET('/v1/artifacts/{artifact_id}/shared', {
    params: {
      query: { secret },
      path: { artifact_id: id },
    },
  });

  assertSuccessResponse(res);

  return res.data;
}

export async function fetchArtifactShared(params: Params) {
  const artifact = await fetchEntity(() => readArtifactShared(params));

  return artifact
    ? decodeEntityWithMetadata<ArtifactShared>(artifact)
    : artifact;
}
