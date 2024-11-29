import { createApiErrorResponse } from '@/app/api/utils/createApiErrorResponse';
import { API_URL } from '@/utils/constants';
import httpProxy from 'http-proxy';
import { NextApiRequest, NextApiResponse } from 'next';
import http from 'node:http';
import https from 'node:https';

const agentOptions = {
  keepAlive: true,
  keepAliveMsecs: 60 * 1000,
};

const agents: Record<string, any> = {
  http: new http.Agent(agentOptions),
  https: new https.Agent(agentOptions),
};
const target = new URL(API_URL);

const proxy = httpProxy.createProxy({
  target,
  changeOrigin: true,
  xfwd: true,
  agent: agents[target.protocol],
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let { path } = req.query;

  if (!path) path = [];
  if (!Array.isArray(path)) path = [path];

  let search = '';
  const searchStart = req.url?.indexOf('?');

  if (searchStart != null && searchStart >= 0) {
    const params = new URLSearchParams(req.url?.substring(searchStart + 1));
    search = `?${params.toString()}`;
  }

  req.url = '/' + path.join('/') + search;

  proxy.web(req, res, {}, (error: NodeJS.ErrnoException) => {
    const { code, message } = error;

    if (code === 'ECONNREFUSED') {
      res
        .status(503)
        .json(
          createApiErrorResponse('service_unavailable', 'Service Unavailable')
        );
    } else if (code === 'ECONNRESET') {
      res
        .status(504)
        .json(createApiErrorResponse('service_unavailable', message));
    } else {
      res
        .status(500)
        .json(createApiErrorResponse('internal_server_error', message));
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
    responseLimit: false,
  },
};
