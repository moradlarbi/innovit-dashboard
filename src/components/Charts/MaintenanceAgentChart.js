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

const MaintenanceAgentChart = () => {
  const {ctxt} = useCtxt()
  const [ordersData, setOrdersData] = useState([])
    const [statistics, setStatistics] = useState([]);
  const [groupBy1, setgroupBy1] = useState('day');

  const fetchData = () => {
    let t = []
    axios.get(
      `https://innovit-2cs-project.onrender.com/dashboard/statTasks/1`
    )
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        res.data.map((payment) => {
          let date = payment.date
          date = date.split("-").reverse().join("-")
          t.push({date: date, status:"success"})
        })
        setOrdersData(t)
      }
    })
    .catch((e) => {
      console.log(e)
    })
    
  }
  useEffect(() => {
    fetchData()
  }, [])
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
    console.log(groupedData)
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
    ],
  };

  const chartOptions1 = {
    plugins: {
      title: {
        display: true,
        text: 'Succesful repairs',
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
    <Box sx={{padding:"30px ",height:"400px"}}>
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

export default MaintenanceAgentChart