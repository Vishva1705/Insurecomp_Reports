
import React from 'react';
import { Table } from 'react-bootstrap';

const MostRevenueItem = ({ report }) => {
  return (
    <div>
      <h2 className="text-center mb-4 text-warning">Items Generating Most Revenue by Month</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>SKU</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {report.map(({ month, sku, totalRevenue }) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{sku}</td>
              <td>{totalRevenue.toFixed(2)}</td> 
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MostRevenueItem;
