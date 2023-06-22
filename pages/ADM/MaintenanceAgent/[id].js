import {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Layout from '../../../src/components/Layout'
import MaintenanceAgentChart from '../../../src/components/Charts/MaintenanceAgentChart'
import { Box, Typography } from '@mui/material'
import { useCtxt } from '../../../src/context/app.context'
const MaintenanceAgent = () => {
    const router = useRouter()
    const {ctxt} = useCtxt()
    const { id } = router.query;
    console.log(id)
    const [user, setUser] = useState({})
    const [nb, setNb] = useState(0)
    useEffect(() => {
      axios.get("http://localhost:5000/users/"+id).then((res) => {
        if (res.status === 200){
            console.log(res.data)
            setUser(res.data)
        }
      }).catch((e) => {
        console.log(e)
      })
      axios.get("https://innovit-2cs-project.onrender.com/dashboard/statTasks/"+ctxt.user.idEntreprise).then((res) => {
        if (res.status === 200){
            console.log(res.data)
            setNb(res.data.length)
        }
      }).catch((e) => {
        console.log(e)
      })
    
    }, [id])
    
  return (
    <Layout>
        <Box sx={{ display:"grid",gap:"20px", gridTemplateColumns:"3fr 2fr",padding:"0 20px"}}>
            <Box sx={{display:"flex",gap:"20px", alignItems:"center"}}>
                <Box>
                    <Typography sx={{fontSize:"1.2rem", textTransform:"capitalize"}}>{user.nom} {user.prenom}</Typography>
                    <Typography>{user.mail}</Typography>
                    <Typography>{user.tel}</Typography>
                </Box>
            </Box>
            <Box sx={{display:"flex",gap:"10px", alignItems:"center"}}>
                <Typography> {nb}</Typography>
                <Typography>repair breakdowns</Typography>
            </Box>
        </Box>
        <Box sx={{}}>
        <MaintenanceAgentChart />
        </Box>
        
    </Layout>
  )
}

export default MaintenanceAgent