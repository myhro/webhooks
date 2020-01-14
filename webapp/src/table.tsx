import React from 'react';

import { Header, Webhook } from './webhook';

type TableProps = {
  webhooks: Webhook[];
};

type TableState = {};

class Table extends React.Component<TableProps, TableState> {
  private renderHeaders(header: Header): JSX.Element[] {
    return Object.keys(header).map((key: string, i: number) => {
      return (
        <span key={i}>
          <strong>{key}</strong>: {header[key]}
          <br />
        </span>
      );
    });
  }

  private renderRows(): JSX.Element[] {
    return this.props.webhooks.map((item: Webhook, i: number) => {
      return (
        <tr key={i}>
          <td>{item.date}</td>
          <td>{item.ip}</td>
          <td>{item.proto}</td>
          <td>{item.method}</td>
          <td>
            <div className="headers">{this.renderHeaders(item.headers)}</div>
          </td>
          <td>{item.body}</td>
        </tr>
      );
    });
  }

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
          <tbody>{this.renderRows()}</tbody>
        </table>
      );
    }
    return <React.Fragment />;
  }
}

export default Table;
