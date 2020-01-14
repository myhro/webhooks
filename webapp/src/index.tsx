import cookie from 'cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import sha1 from 'sha1';
import { IMessageEvent, w3cwebsocket } from 'websocket';

import Table from './table';
import { Webhook } from './webhook';

import '../node_modules/materialize-css/dist/css/materialize.min.css';

import './css/style.css';

type AppProps = {};

type AppState = {
  url: string;
  webhooks: Webhook[];
  ws: w3cwebsocket;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    const api = process.env.API_URL;
    const channel = this.loadChannel();
    const proto = location.protocol;
    const wsProto = proto == 'http:' ? 'ws' : 'wss';

    const url = `${proto}//${api}/${channel}`;
    const webhooks: Webhook[] = [];
    const ws = new w3cwebsocket(`${wsProto}://${api}/${channel}/listen`);
    ws.onmessage = this.handleMessage.bind(this);
    ws.onopen = (): void => {
      console.log('WebSocket connected');
    };
    ws.onclose = (): void => {
      console.log('WebSocket disconnected');
    };

    this.state = { url, webhooks, ws };
  }

  private handleMessage(msg: IMessageEvent): void {
    const webhooks = this.state.webhooks.slice();
    const data = String(msg.data);
    webhooks.push(JSON.parse(data));
    this.setState({ webhooks });
  }

  private loadChannel(): string {
    let channel;
    if (document.cookie.includes('channel=')) {
      const cookies = cookie.parse(document.cookie);
      channel = cookies.channel;
    } else {
      const random = String(Math.random());
      channel = sha1(random).substring(0, 7);
      document.cookie = cookie.serialize('channel', channel);
    }
    return channel;
  }

  render(): JSX.Element {
    return (
      <div className="container">
        <h1>Webhooks + WebSockets</h1>
        <h6>
          Send HTTP requests to <a href={this.state.url}>{this.state.url}</a>
        </h6>
        <Table webhooks={this.state.webhooks} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
