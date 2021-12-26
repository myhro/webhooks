import React from 'react';

import { Headers, Webhook } from './webhook';

type HeadersProps = {
  headers: Headers;
};

type RowProps = {
  webhook: Webhook;
};

type TableProps = {
  webhooks: Webhook[];
};

class HeadersColumn extends React.Component<HeadersProps, unknown> {
  render(): JSX.Element {
    return (
      <div className="headers">
        {Object.keys(this.props.headers).map((key: string, i: number) => (
          <span key={i}>
            <strong>{key}</strong>: {this.props.headers[key]}
            <br />
          </span>
        ))}
      </div>
    );
  }
}

class Row extends React.Component<RowProps, unknown> {
  render(): JSX.Element {
    return (
      <tr>
        <td>{this.props.webhook.date}</td>
        <td>{this.props.webhook.ip}</td>
        <td>{this.props.webhook.proto}</td>
        <td>{this.props.webhook.method}</td>
        <td>
          <HeadersColumn headers={this.props.webhook.headers} />
        </td>
        <td>{this.props.webhook.body}</td>
      </tr>
    );
  }
}

class Table extends React.Component<TableProps, unknown> {
  render(): JSX.Element {
    if (this.props.webhooks.length > 0) {
      return (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>IP</th>
              <th>Protocol</th>
              <th>Method</th>
              <th>Headers</th>
              <th>Body</th>
            </tr>
          </thead>
          <tbody>
            {this.props.webhooks.map((w: Webhook, i: number) => (
              <Row key={i} webhook={w} />
            ))}
          </tbody>
        </table>
      );
    }
    return <React.Fragment />;
  }
}

export default Table;
