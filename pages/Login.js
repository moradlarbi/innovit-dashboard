import { Box, Stack, Button, Typography, Link,InputAdornment,TextField, IconButton } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";
import { useCtxt } from "../src/context/app.context";
import { useRouter } from "next/router";
const Login = () => {
  const {push} = useRouter()
  const { ctxt:{user}, dispatch } = useCtxt();
  const [states, setStates] = useState({});
  const handleChange = (event) => {
    setStates({ ...states, [event?.target?.name]: event?.target?.value });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const login = (values) => {
    console.log(values)
    axios
    .post(
      `http://localhost:5000/auth/login`,values
    )
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data)
        localStorage.setItem("user",JSON.stringify(res.data.data))
        dispatch({type:"setUser", payload: res.data.data})
        push("/")
       
      }
    })
    .catch((e) => {
      console.log(e)
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
      login({...states})
    }
  return (
      <Box sx={{width:"100%", display:"flex", height:"100vh"}}>
       <Box sx={{width:"60%",background:"#F8F8F8", display:"flex", justifyContent:"center", alignItems:"center"}}>
       <Stack
          direction="column"
          spacing={3}
          sx={{
            width: 400,
            maxWidth: '100%',
            background:"#fff",
            padding:"50px 70px",
            borderRadius:"20px"
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSubmit(e)
            }
          }}
        >
            <Typography variant="h5" sx={{ color:"#11B07A", fontWeight:"bold"}}>Login Here!</Typography>
          <TextField
            required
              id="outlined-required"
              name="mail"
              label="Email"
              placeholder="Email"
              type="text"
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">{''}</InputAdornment>
                ),
              }}
              style={{backgroundColor: "#ffffff"}}
            />
            <TextField
            required
              id="outlined-required2"
              type={showPassword ? 'text' : 'password'}
              name="mdp"
              placeholder="Mot de passe"
              label="Mot de passe"
              style={{backgroundColor: "#ffffff"}}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{
              height: 50,
            }}
            onClick={(e) => handleSubmit(e)}
          >
            Login
          </Button>
        </Stack>
       </Box>
       <Box sx={{width:"40%",background:"#11B07A",padding:"0 30px", display:"flex", justifyContent:"center", alignItems:"center",gap:"20px",flexDirection:"column",textAlign:"center"}}>
            <Box
            sx={{
                width: 200,
            }}
            >
            <img src="/assets/logo.svg" alt="Logo" />
            </Box>
            <Typography variant="h5" sx={{ color:"#fff", fontWeight:"bold"}}>SmartBev</Typography>
            <Typography sx={{ color:"#fff",fontSize:"1.2rem"}}>“Get Your Caffeine Fix,The Smart Way”</Typography>
        </Box>
        
          
        </Box>
  );
}

export default Login
