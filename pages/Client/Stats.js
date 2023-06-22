import Layout from '../../src/components/Layout'
import { Typography, Box, ButtonGroup, Button } from '@mui/material';
import OrdersChart from '../../src/components/Charts/OrdersChart';
import PaymentsChart from '../../src/components/Charts/PaymentsChart';
import IncomeOutcomeChart from '../../src/components/Charts/IncomeOutcomeChart';
const Stats = () => {
  
  return (
    <Layout>
      <Box sx={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"50px", padding:"0 20px"}}>
        <OrdersChart />
        <PaymentsChart />
        {/* <IncomeOutcomeChart /> */}
      </Box>
      
    </Layout>
  )
}

export default Stats