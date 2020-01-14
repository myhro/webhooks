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

function Headers(props: HeadersProps): JSX.Element {
  return (
    <div className="headers">
      {Object.keys(props.headers).map((key: string, i: number) => (
        <span key={i}>
          <strong>{key}</strong>: {props.headers[key]}
          <br />
        </span>
      ))}
    </div>
  );
}

function Row(props: RowProps): JSX.Element {
  return (
    <tr>
      <td>{props.webhook.date}</td>
      <td>{props.webhook.ip}</td>
      <td>{props.webhook.proto}</td>
      <td>{props.webhook.method}</td>
      <td>
        <Headers headers={props.webhook.headers} />
      </td>
      <td>{props.webhook.body}</td>
    </tr>
  );
}

function Table(props: TableProps): JSX.Element {
  if (props.webhooks.length > 0) {
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
          {props.webhooks.map((item: Webhook, i: number) => (
            <Row key={i} webhook={item} />
          ))}
        </tbody>
      </table>
    );
  }
  return <React.Fragment />;
}

export default Table;
