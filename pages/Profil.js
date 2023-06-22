import React, { useEffect, useState } from 'react'
import { Box, Stack, Button, Typography, Link,InputAdornment,TextField, IconButton } from "@mui/material";
import Layout from '../src/components/Layout';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FileUploadComponent from '../src/components/FileUploadComponent';
import { useCtxt } from '../src/context/app.context';
import axios from 'axios';
import Swal from 'sweetalert2';
const Profil = () => {
  const [refresh, setrefresh] = useState(false)
  const {ctxt, dispatch} = useCtxt()
  const [image, setImage] = useState();
  const [user, setUser] =useState({
    id: null,
    nom: "",
    prenom: "",
    tel: ""
  });
  const uploadImage = (file) => {
    console.log(file)
    if (file) {
      setImage(file)
    }
    else {
      console.log("error upload image")
    }
  }
  const handleChangeUpdate = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };
  
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const saveNormal = () => {
    dispatch({type:"setUser", payload: user})
    axios.patch(`http://localhost:5000/users/edit/${user.id}`, user).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `vos informations ont bien été mis a jour`,
          showConfirmButton: false,
          timer: 1500,
        });
        setrefresh(!refresh)
      }
       else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `vos informations n'ont pas été mis a jour`,
          showConfirmButton: false,
          timer: 1500,
        });
        if (res.status === 400) {
          console.log('bad req')
        }
       } 
    }).catch((e) => {
      console.log(e)
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `vos informations n'ont pas été mis a jour`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
  }
  const savePassword = () => {

  }
  useEffect(() => {
    setUser(ctxt?.user)
    console.log(ctxt.user)
  }, [ctxt.user])
  useEffect(() => {

  }, [refresh])
  return (
    <Layout>
        <Box sx={{width:"100%",display:"flex",gap:"20px", background:"#F8F8F8",padding:"20px 20px",height:"100%", justifyContent:"space-between"}}>
          <Box sx={{height:"100%",background:"#fff",flex:"1", padding:"30px 50px",borderRadius:"20px"}}>
            <Typography variant="h5" sx={{fontWeight:"bold"}}>Personal information</Typography>
            <form style={{display:"flex", flexDirection:"column",gap:"30px",marginTop:"50px"}}>
              <TextField
                name="prenom"
                type="string"
                value={user?.prenom}
                label="First name"
                onChange={handleChangeUpdate}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{''}</InputAdornment>
                ),
                }}
              />
              <TextField
                name="nom"
                type="string"
                value={user?.nom}
                label="Last name"
                onChange={handleChangeUpdate}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{''}</InputAdornment>
                ),
                }}
              />
              <TextField
                name="tel"
                type="string"
                value={user?.tel}
                label="Phone number"
                onChange={handleChangeUpdate}
                InputProps={{
                startAdornment: (
                    <InputAdornment position="start">{''}</InputAdornment>
                ),
                }}
              />
              <Button variant='contained' background="primary" onClick={() => {
                saveNormal()
              }}>Save changes</Button>
            </form>
          </Box>
          <Box sx={{display:"flex",flexDirection:"column", gap:"20px",flex:"auto",borderRadius:"20px"}}>
                  <Box>
                    <FileUploadComponent onUpload={uploadImage} />
                  </Box>
                  <Box sx={{background:"#fff",borderRadius:"20px", padding:"30px 50px"}}>
                       <form style={{display:"flex", flexDirection:"column",gap:"30px"}}>
                       <TextField
                        type={showPassword ? 'text':'password'}
                        name="mdp"
                        label="Password"
                        onChange={handleChangeUpdate}
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
                    <TextField
                        type={showPassword2 ? 'text':'password'}
                        name="nvMdp"
                        label="New Password"
                        onChange={handleChangeUpdate}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword2}
                                edge="end"
                            >
                                {showPassword2 ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                    <Button variant='contained' background="primary" onClick={() => {
                      savePassword()
                    }}>Save changes</Button>
                       </form>
                  </Box>
            </Box>
          </Box>
    </Layout>
  )
}

export default Profil