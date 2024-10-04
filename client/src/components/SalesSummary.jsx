// TotalSalesReport.js
import React from 'react';
import { Table, Container } from 'react-bootstrap';
 

const TotalSalesReport = ({ report }) => {

  let overallTotalQuantity = 0;
  let overallTotalRevenue = 0;

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4 text-primary">Total Sales Report</h2>
      <Table striped bordered hover responsive variant="light">
        <thead className="table-primary">
          <tr>
            <th>SKU</th>
            <th>Unit Price</th>
            <th>Total Quantity Sold</th>
            <th>Total Revenue</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(report).map(([sku, data]) => {
            overallTotalQuantity += data.totalQuantity; 
            overallTotalRevenue += data.totalRevenue; 

            return (
              <tr key={sku}>
                <td>{sku}</td>
                <td>{data.unitPrice.toFixed(2)}</td>
                <td>{data.totalQuantity}</td>
                <td>{data.totalRevenue.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="table-secondary">
            <td colSpan={2}><strong>Overall Total</strong></td>
            <td><strong>{overallTotalQuantity}</strong></td>
            <td><strong>{overallTotalRevenue.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
};

export default TotalSalesReport;
