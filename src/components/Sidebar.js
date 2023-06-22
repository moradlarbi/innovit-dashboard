import React, { useEffect, useState } from 'react'
import { Box,Stack, Typography } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import { useRouter } from 'next/router'
import Link from 'next/link';
import axios from 'axios';
import { useCtxt } from '../context/app.context';
const Sidebar = () => {
  const { ctxt:{user}, dispatch } = useCtxt();
  const router = useRouter()
  const [refresh, setRefresh] = useState(false)
  const linksDecider=[
    {id: 2, label:"Vending machines", icon: <MicrowaveIcon />, url:"/Client/VendingMachines"},
    {id: 3, label:"Statistiques", icon: <VisibilityIcon />, url:"/Client/Stats"},
    {id: 5, label:"Profile", icon: <ManageAccountsIcon />, url:"/Profil"},
  ]
  const linksAdmin=[
    {id: 1, label:"Accounts", icon: <MicrowaveIcon />, url:"/ADM/Accounts"},
  {id: 2, label:"Vending machines", icon: <MicrowaveIcon />, url:"/ADM/VendingMachines"},
  {id: 3, label:"Surveillance", icon: <VisibilityIcon />, url:"/ADM/Surveillance"},
  {id: 4, label:"Maintenance", icon: <EngineeringIcon />, url:"/ADM/MaintenanceAgents"},
  {id: 5, label:"Profile", icon: <ManageAccountsIcon />, url:"/Profil"},
]
const linksSuperAdmin=[
  {id: 1, label:"Entreprises", icon: <PersonIcon />, url:"/Admin/ClientAdmin"},
  {id: 2, label:"Vending machines", icon: <MicrowaveIcon />, url:"/Admin/SmartBevAdmin"},
  {id: 3, label:"Administrator", icon: <VisibilityIcon />, url:"/Admin/AdministratorAdmin"},
  {id: 5, label:"Profile", icon: <ManageAccountsIcon />, url:"/Profil"},
]
const linksAC=[
  {id: 2, label:"Claims", icon: <MicrowaveIcon />, url:"/AC/Claims"},
  {id: 3, label:"Advertisments", icon: <VisibilityIcon />, url:"/AC/Advertisements"},
  {id: 6, label:"Annoncer", icon: <PersonIcon />, url:"/AC/Annoncer"},
  {id: 4, label:"Drinks", icon: <VisibilityIcon />, url:"/AC/Drinks"},
  {id: 5, label:"Profile", icon: <ManageAccountsIcon />, url:"/Profil"},
]
const [links, setLinks] = useState(linksSuperAdmin)
useEffect(() => {
  console.log(user)
 if (user?.idRole === 5) {
    setLinks(linksDecider)
  }
  else if(user?.idRole === 4) {
    setLinks(linksAC)
  }
  else if(user?.idRole === 2) {
    setLinks(linksAdmin)
  }
  else if(user?.idRole === 3) {
    setLinks([])
  }
  else {
    setLinks(linksSuperAdmin)
  }
  setRefresh(!refresh)
}, [])
useEffect(() => {
  
}, [refresh])
  return (
    <Stack sx={{display:"flex",height:"100vh",padding:"0px 20px",color:"#fff", background:"#11B07A", flexDirection:"column", justifyContent:"space-around"}}>
      <Box>
        <img src="/assets/logo.png" alt="logo img" />
      </Box>
      <Box sx={{display:"flex", flexDirection:"column", gap:"20px", cursor:"pointer"}}>
        {links.map((link) => {
          return (
            <Link href={link.url} key={link.id} >
              <Box sx={{display:"flex",gap:"10px",padding:"10px 5px",borderRadius:"20px",color: router.pathname === link.url ? "#11B07A": "#fff",background: router.pathname === link.url ? "#fff": "transparent"}}>
              {link.icon}
              <Typography>{link.label}</Typography>
              </Box>
              
              
            </Link>
          )
        })}
      </Box>
      <Box sx={{display:"flex",gap:"10px", cursor:"pointer"}} onClick={() => {
        axios
        .get(
          `http://localhost:5000/auth/logout`
        )
        .then((res) => {
          if (res.status == 200) {
            dispatch({type: "setUser",payload: null})
            localStorage.setItem("user",null)
            router.push("/")

           
          }
        })
        .catch((e) => {
          console.log(e)
        })
      }}>
        <LogoutIcon />
        <Typography>Déconnexion</Typography>
          
        </Box>
    </Stack>
  )
}

export default Sidebar