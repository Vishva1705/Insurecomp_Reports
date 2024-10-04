
import React from 'react';
import { Table } from 'react-bootstrap';

const MostPopularItem = ({ report }) => {
  return (
    <div>
      <h2 className="text-center mb-4 text-success">Most Popular Items by Month</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>SKU</th>
            <th>Total Quantity Sold</th>
          </tr>
        </thead>
        <tbody>
          {report.map(({ month, sku, totalQuantity }) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{sku}</td>
              <td>{totalQuantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MostPopularItem;
