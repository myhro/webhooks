import React from 'react';

class Table extends React.Component {
  renderHeaders(header) {
    return Object.keys(header).map((item, i) => {
      return (
        <span key={i}>
          <strong>{item}</strong>: {header[item]}
          <br />
        </span>
      );
    });
  }

  renderRows() {
    return this.props.webhooks.map((item, i) => {
      return (
        <tr key={i}>
          <td>{item.date}</td>
          <td>{item.ip}</td>
          <td>{item.proto}</td>
          <td>{item.method}</td>
          <td>{this.renderHeaders(item.headers)}</td>
          <td>{item.body}</td>
        </tr>
      );
    });
  }

  render() {
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
