import React from 'react';
import { Table } from 'react-bootstrap';

const MonthWiseSalesTotal = ({ report }) => {
  return (
    <div>
      <h2 className="text-center mb-4 text-danger">Month-wise Sales Totals</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Sales</th>
          </tr>
        </thead>
        <tbody>
          {report.map(({ month, totalSales }) => (
            <tr key={month}>
              <td>{month}</td>
              <td>{totalSales.toFixed(2)}</td> 
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MonthWiseSalesTotal;
