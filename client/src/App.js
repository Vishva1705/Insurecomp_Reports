import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';

import SalesSummaryReport from './components/SalesSummary';
import MostPopularItem from './components/PopularItems'; 
import MostRevenueItem from './components/RevenueItems'; 
import MonthWiseSalesTotal from './components/MonthWiseSales'; 
import MostPopularItemStats from './components/SalesStatics'; 

const App = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://insurecomp-reports.onrender.com/api/salesData');
        const csvData = response.data;

        const parsedData = parseCSV(csvData);
        setSalesData(parsedData);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const parseCSV = (csvData) => {
    const lines = csvData.trim().split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    const data = lines.slice(1).map(line => {
      const values = line.split(',').map(value => value.trim());
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = isNaN(values[index]) ? values[index] : Number(values[index]);
      });
      return obj;
    });
    return data;
  };

  const generateTotalSalesReport = () => {
    return salesData.reduce((acc, sale) => {
      const sku = sale.SKU;
      const unitPrice = sale['Unit Price'];
      const quantity = sale.Quantity;
      const totalPrice = sale['Total Price'];

      if (!acc[sku]) {
        acc[sku] = {
          unitPrice: unitPrice,
          totalQuantity: 0,
          totalRevenue: 0,
        };
      }

      acc[sku].totalQuantity += quantity;
      acc[sku].totalRevenue += totalPrice;

      return acc;
    }, {});
  };

  const generateMonthlyReports = () => {
    return salesData.reduce((acc, sale) => {
      const date = new Date(sale.Date);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' }); 
      const sku = sale.SKU;
      const quantity = sale.Quantity;
      const totalPrice = sale['Total Price'];

      if (!acc[month]) {
        acc[month] = {
          popularItem: { sku: sku, totalQuantity: quantity },
          revenueItem: { sku: sku, totalRevenue: totalPrice },
          totalSales: 0, 
          orders: [] 
        };
      } else {
        if (quantity > acc[month].popularItem.totalQuantity) {
          acc[month].popularItem = { sku: sku, totalQuantity: quantity };
        }

        if (totalPrice > acc[month].revenueItem.totalRevenue) {
          acc[month].revenueItem = { sku: sku, totalRevenue: totalPrice };
        }
      }

      acc[month].totalSales += totalPrice; 
      acc[month].orders.push(quantity); 

      return acc;
    }, {});
  };

  const calculateMostPopularItemStats = (monthlyReports) => {
    const stats = {};

    for (const month in monthlyReports) {
      const orders = monthlyReports[month].orders;

      stats[month] = {
        minOrders: Math.min(...orders),
        maxOrders: Math.max(...orders),
        avgOrders: orders.length > 0 ? (orders.reduce((a, b) => a + b, 0) / orders.length) : 0,
      };
    }

    return stats;
  };

  const totalSalesReport = useMemo(generateTotalSalesReport, [salesData]);
  const monthlyReports = useMemo(generateMonthlyReports, [salesData]);
  const mostPopularItemStats = useMemo(() => calculateMostPopularItemStats(monthlyReports), [monthlyReports]);

  return (
    <Container>
      {loading ? ( 
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
          <Spinner animation="border" variant="primary" size="lg" /> 
          <h4 className="mt-3">Please wait, loading report...</h4> 
        </div>
      ) : (
        <>
          <SalesSummaryReport report={totalSalesReport} /> 
          <MostPopularItem report={Object.entries(monthlyReports).map(([month, data]) => ({ month, ...data.popularItem }))} />
          <MostRevenueItem report={Object.entries(monthlyReports).map(([month, data]) => ({ month, ...data.revenueItem }))} />
          <MonthWiseSalesTotal report={Object.entries(monthlyReports).map(([month, data]) => ({ month, totalSales: data.totalSales }))} />
          <MostPopularItemStats report={mostPopularItemStats} />
        </>
      )}
    </Container>
  );
};

export default App;
