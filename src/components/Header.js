import React from 'react'
import { Box,Stack, Typography } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useCtxt } from '../context/app.context';
const Header = () => {
  const { ctxt : {user}, dispatch } = useCtxt();
  return (
    <Box sx={{display:"flex", justifyContent:"flex-end", width:"100%",alignItems:"center",padding:"20px 30px",gap:"10px"}}>
      <Box style={{position: "relative", cursor:"pointer"}} onClick={() => {
    }}>
        <NotificationsNoneIcon style={{ color: '#acacac', fontSize: 30 }} />
    </Box>
      <Stack
        direction="row"
        gap="16px"
        alignItems="center"
        justifyContent="center"
      >
        {/* {user? (
          <Box sx={{ backgroundColor: "#EFEFEF", padding: "12px", borderRadius: "10px", cursor: "pointer"}} color="#000" onClick={() => {
            
          }}>
            <Typography style={{ textTransform: "uppercase"}} >{user?.nom?.substring(0,2)}</Typography>
        </Box>
        ) : null} */}
      </Stack>
    </Box>
    
  )
}

export default Header