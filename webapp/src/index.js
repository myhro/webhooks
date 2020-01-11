import cookie from 'cookie';
import React from 'react';
import ReactDOM from 'react-dom';
import sha1 from 'sha1';
import { w3cwebsocket } from 'websocket';

import Table from './table';

import '../node_modules/materialize-css/dist/css/materialize.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    let api = '127.0.0.1:8080';
    let channel = this.loadChannel();
    let proto = location.protocol;

    this.state = {
      url: `${proto}//${api}/${channel}`,
      webhooks: [],
    }

    this.ws = new w3cwebsocket(`ws://${api}/${channel}/listen`);
    this.ws.onmessage = this.handleMessage.bind(this);
    this.ws.onopen = () => { console.log('WebSocket connected'); };
  }

  handleMessage(msg) {
    let webhooks = this.state.webhooks.slice();
    webhooks.push(JSON.parse(msg.data));
    this.setState({ webhooks });
  }

  loadChannel() {
    let channel;

    if (document.cookie == '') {
      channel = sha1(Math.random()).substring(0, 7);
      document.cookie = `channel=${channel}`;
    } else {
      let cookies = cookie.parse(document.cookie);
      channel = cookies.channel;
    }

    return channel;
  }

  render() {
    return (
      <div className="container">
        <h1>WebHooks + WebSockets</h1>
        <h6>Send HTTP requests to <a href={this.state.url}>{this.state.url}</a></h6>
        <Table webhooks={this.state.webhooks} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
