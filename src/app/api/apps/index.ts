/**
 * Copyright 2024 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { assertSuccessResponse } from '@/app/api/utils/assertSuccessResponse';
import { client } from '@/app/api/client';
import { ChatCompletionCreateBody } from '@/app/api/apps/types';

export async function createChatCompletion(
  body: ChatCompletionCreateBody,
  token: string
) {
  const res = await client.POST('/v1/chat/completions', {
    body,
    headers: { Authorization: `Bearer ${token}` },
  });
  assertSuccessResponse(res);
  return res.data;
}

export async function modulesToPackages(modules: string[], token: string) {
  const res = await client.GET('/v1/ui/modules_to_packages', {
    params: {
      query: { modules },
      headers: { Authorization: `Bearer ${token}` },
    },
  });
  assertSuccessResponse(res);
  return res.data;
}
