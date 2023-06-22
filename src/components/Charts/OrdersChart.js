import React, { useEffect, useState } from 'react';
import { Typography, Box, ButtonGroup, Button } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import { useCtxt } from '../../context/app.context';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
const ordersData = [
  { date: '2023-06-10', status: 'success' },
  { date: '2023-06-10', status: 'success' },
  { date: '2023-06-11', status: 'failed' },
  { date: '2023-06-12', status: 'success' },
  { date: '2023-06-12', status: 'failed' },
  { date: '2023-06-13', status: 'failed' },
  // ... add more orders here
];

const OrdersChart = () => {
  const {ctxt} = useCtxt()
    const [statistics, setStatistics] = useState([]);
  const [groupBy1, setgroupBy1] = useState('day');

  useEffect(() => {
    
    const groupedData = ordersData.reduce((acc, order) => {
      const orderDate = new Date(order.date);
      let key;

      if (groupBy1 === 'day') {
        key = orderDate.toLocaleDateString("en-US", {weekday: 'long'});
      } else if (groupBy1 === 'month') {
        key = orderDate.toLocaleDateString("en-US", {month: 'long'});
      } else if (groupBy1 === 'year') {
        key = orderDate.getFullYear();
      }

      const status = order.status;

      if (!acc[key]) {
        acc[key] = { success: 0, failed: 0 };
      }

      acc[key][status]++;

      return acc;
    }, {});

    setStatistics(Object.entries(groupedData));
  }, [groupBy1]);

  const handlegroupBy1Change = (value) => {
    setgroupBy1(value);
  };

  const chartData1 = {
    labels: statistics.map(([key]) => key),
    datasets: [
      {
        label: 'Success',
        data: statistics.map(([key, { success }]) => success),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
      {
        label: 'Failed',
        data: statistics.map(([key, { failed }]) => failed),
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions1 = {
    plugins: {
      title: {
        display: true,
        text: 'Succesful/failed orders',
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
    },
  };
  return (
    <Box>
      <ButtonGroup>
        <Button
          variant={groupBy1 === 'day' ? 'contained' : 'outlined'}
          onClick={() => handlegroupBy1Change('day')}
        >
          By Day
        </Button>
        <Button
          variant={groupBy1 === 'month' ? 'contained' : 'outlined'}
          onClick={() => handlegroupBy1Change('month')}
        >
          By Month
        </Button>
        <Button
          variant={groupBy1 === 'year' ? 'contained' : 'outlined'}
          onClick={() => handlegroupBy1Change('year')}
        >
          By Year
        </Button>
      </ButtonGroup>
      <Bar data={chartData1} options={chartOptions1} />
    </Box>
  )
}

export default OrdersChart