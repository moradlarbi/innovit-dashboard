import React from 'react'
import { Box,Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MicrowaveIcon from '@mui/icons-material/Microwave';
const Sidebar = () => {
  const links=[{id: 1, label:"Accounts", icon: <PersonIcon />},
  {id: 2, label:"Vending machines", icon: <MicrowaveIcon />},
  {id: 3, label:"Surveillance", icon: <VisibilityIcon />},
  {id: 4, label:"Maintenance", icon: <EngineeringIcon />},
  {id: 5, label:"Profile", icon: <ManageAccountsIcon />},
]
  return (
    <Stack sx={{display:"flex",height:"100vh",padding:"0px 20px",color:"#fff", background:"#11B07A", flexDirection:"column", justifyContent:"space-around"}}>
      <Box>
        <img src="/assets/logo.png" alt="logo img" />
      </Box>
      <Box sx={{display:"flex", flexDirection:"column", gap:"20px", cursor:"pointer"}}>
        {links.map((link) => {
          return (
            <Box key={link.id} sx={{display:"flex",gap:"10px"}}>
              {link.icon}
              <Typography>{link.label}</Typography>
              
            </Box>
          )
        })}
      </Box>
      <Box sx={{display:"flex",gap:"10px"}}>
        <LogoutIcon />
        <Typography>Déconnexion</Typography>
          
        </Box>
    </Stack>
  )
}

export default Sidebar