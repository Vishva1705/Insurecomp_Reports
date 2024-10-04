import React from 'react';
import { Table } from 'react-bootstrap';

const MostPopularItemStats = ({ report }) => {
  return (
    <div>
      <h2 className="text-center mb-4 text-info">Most Popular Item Statistics</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Min Orders</th>
            <th>Max Orders</th>
            <th>Average Orders</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(report).map(([month, stats]) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{stats.minOrders}</td>
              <td>{stats.maxOrders}</td>
              <td>{stats.avgOrders.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MostPopularItemStats;
