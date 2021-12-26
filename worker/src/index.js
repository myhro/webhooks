export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isHash = /^\/[0-9a-f]{7}/.test(url.pathname);

    if (isHash) {
      const hash = url.pathname.split('/')[1];
      const id = env.listener.idFromName(hash);
      const stub = env.listener.get(id);
      return stub.fetch(request);
    }

    return new Response('Not Found', { status: 404 });
  },
};

async function parseBody(request) {
  try {
    return JSON.stringify(await request.json());
  } catch (e) {
    return '';
  }
}

function parseHeaders(request) {
  const headers = {};
  const map = new Map(request.headers);
  map.forEach((v, k) => {
    headers[k] = v;
  });
  return headers;
}

export class Listener {
  constructor(state, env) {
    this.clients = [];
    this.env = env;
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname.endsWith('/listen')) {
      if (request.headers.get('Upgrade') !== 'websocket') {
        return new Response('expected websocket', { status: 400 });
      }

      const [client, server] = Object.values(new WebSocketPair());
      this.handleWebSocket(server);
      return new Response(null, { status: 101, webSocket: client });
    }

    const body = await parseBody(request);
    this.clients.forEach((ws) => {
      const message = {
        body,
        date: new Date().toUTCString(),
        headers: parseHeaders(request),
        ip: request.headers.get('CF-Connecting-IP'),
        method: request.method,
      };
      ws.send(JSON.stringify(message));
    });

    return new Response(null, { status: 200 });
  }

  handleWebSocket(ws) {
    ws.accept();
    this.clients.push(ws);
  }
}
