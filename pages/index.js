import * as React from 'react';
import Container from '@mui/material/Container';
import { Box, Stack, Button, Typography, Link,InputAdornment,TextField, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import { useCtxt } from '../src/context/app.context';
import { useRouter } from 'next/router';
export default function Index() {
  const {push} = useRouter()
  const {ctxt, dispatch} = useCtxt()
  const [states, setStates] = useState({});
  const handleChange = (event) => {
    setStates({ ...states, [event?.target?.name]: event?.target?.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const login = (values) => {

  }
  const handleSubmit = (e) => {
    e.preventDefault();
      login({...states})
    }
   React.useEffect(() => {
    console.log(ctxt.user)
    if (ctxt.user !== null) {
      push("/Profil")
    }
    else {
      push("/Login")
    }
   }, [])
  return (
      <Box sx={{width:"100%", display:"flex", height:"100vh"}}>
       
        
          
        </Box>
  );
}
