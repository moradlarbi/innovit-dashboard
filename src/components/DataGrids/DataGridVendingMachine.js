import React, {useEffect, useState, } from 'react';
import {Box, Button, TextField, Dialog, DialogActions, DialogContent, FormControl,InputLabel,Select,Typography, MenuItem,InputAdornment,
   DialogTitle, DialogContentText, } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import styled from '@emotion/styled';

export default function DataGridVendingMachine({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate,
    openView, setOpenView
}) {

    const [rows,setRows] = useState([])
    const [refresh, setRefresh] = useState(false)
  const [states, setStates] = React.useState()
  const [state, setState] = useState()
  const [selectValues, setSelectValues] = useState([])

  const handleCloseView = () => {
    setOpenView(false)
  }

  const handleChange = (event) => {
    setStates({ ...item, [event.target.name]: event.target.value })
  }
  const handleChangeSelect = (event) => {
    setItem({...item, pack: {...item.pack, idState: event.target.value}})
    setRefresh(!refresh)

  };
  //Update dependacies
  
  
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
    const getData = () => {
      console.log(fetchUrl);
     
      axios
      .get(
        `${fetchUrl}`
      )
      .then((res) => {
        if (res.status == 200) {
          setRows(res.data)
          console.log(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })}
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
      const [ingredients, setIngredients] = useState([
        {id: 1, name: "coffee", value: 15,},
        {id: 2, name: "Milk", value: 75,},
        {id: 4, name: "Water", value: 23,},
        {id: 3, name: "sugar", value: 56,},
        {id: 5, name: "vanilla", value: 10,},
      ])
      const [components, setComponents] = useState([])
      const [receipents, setReceipents] = useState([{ name: 'none', Count: 69.5 },
      { name: 'vibration', Count: 25.5 },
      { name: 'motion', Count: 0 },
      { name: 'temperature', Count: 4.74 },
      ])
      React.useEffect(() => {
        if (Object.keys(item).length > 0){
        console.log(item)
        }
        
      }, [item])
      const types = [{id: 1, name:"actif"},{id: 2,name:"shutdown"},{id: 3,name:"under maintenance"}]
      useEffect(() => {
        axios.post("https://innovit-2cs-project.onrender.com/ODB/sensors/data?id=1&security=false").then((res) => {
          if (res.status == 200) {
            console.log(res.data)
            setComponents(res.data)
          }
        }).catch((err) => {
          console.log(err)
        })
      }, [])
      const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
        '& .state-2': {
          backgroundColor: "#ffc1c1",
          '&:hover': {
            backgroundColor: "#ffc1c1",
          },
        },
        '& .state-1': {
          backgroundColor: "#b2ffb2",
          '&:hover': {
            backgroundColor: "#b2ffb2",
          },
        },
        '& .state-3': {
          backgroundColor: "#ffff8e",
          '&:hover': {
            backgroundColor: "#ffff8e",
          },
        },
      }));
      
  return (
    <Box sx={{ height: 300, width: '100%', padding:"15px 10px", }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <Typography>{info?.title}</Typography>}
      {info?.description && <p>{info?.description}</p>}
      <Dialog open={openView || false} onClose={handleCloseView} >
      <Box sx={{ width:"100%", background:"#fff", position:"relative"}}>
        <Box sx={{ position:"absolute", background:"#FF665A",top:"20px",right:"20px", cursor:"pointer", padding:"0px 8px", borderRadius:"5px",color:"#fff",zIndex:"100", fontSize:"1.2rem"}} onClick={handleCloseView}>
          x
        </Box>
        <Swiper
        spaceBetween={50}
        slidesPerView={1}
        modules={[Navigation]}
        navigation
        
        >
          <SwiperSlide style={{minHeight:"300px",width:"100%",padding:"30px 0"}}>
            <Typography sx={{ textAlign:"center",fontSize:"2rem"}}>Ingredients’  levels</Typography>
            <Box sx={{margin:"30px auto", display:"flex",flexDirection:"column", gap:"20px"}}>
              {ingredients.map((ing) => {
                return <Box key={ing.id} sx={{display:"flex",width:"100%", padding:"0 80px 0 0px", justifyContent:"flex-end",gap:"30px"}}>
                  <Typography sx={{textTransform:"capitalize"}}>{ing.name}</Typography>
                  <Box sx={{borderRadius:"20px", background:"#EBEEF1",textAlign:"center",position:"relative", width:"60%"}}>
                  <Box sx={{position:"inherit",zIndex:"10"}}>{ing.value}%</Box>
                    <Box sx={{ background: ing.value > 50 ? "#11B07A": "#FF665A",position:"absolute",width:`${ing.value}%`,height:"100%",top:"0",left:"0",zIndex:"1", borderRadius:"20px" }}></Box>
                  </Box>
                </Box>
              })}
            </Box>
          </SwiperSlide>
          <SwiperSlide style={{minHeight:"300px",width:"100%",padding:"30px 0"}}>
            <Typography sx={{ textAlign:"center",fontSize:"2rem"}}>Components’ temperatures</Typography>
            <Box sx={{margin:"30px auto", display:"flex",flexDirection:"column", gap:"20px"}}>
              {components?.map((ing) => {
                return <Box key={ing.id} sx={{display:"flex",width:"100%", padding:"0 80px 0 0px", justifyContent:"flex-end",gap:"30px"}}>
                  <Typography sx={{textTransform:"capitalize"}}>{ing.categorysensors}</Typography>
                  <Box sx={{borderRadius:"20px", background:"#EBEEF1",textAlign:"center",position:"relative", width:"60%"}}>
                  <Box sx={{position:"inherit",zIndex:"10"}}>{ing.categorysensors === "Seisme" ? ing.value: `${ing.value}%`}</Box>
                    {ing.categorysensors === "Seisme" ?<Box sx={{ background: ing.value ===1 ? "#FF665A": "#11B07A",position:"absolute",width:ing.value === 1 ? "0%":"100%",height:"100%",top:"0",left:"0",zIndex:"1", borderRadius:"20px" }}></Box>
                    :<Box sx={{ background: ing.value > 50 ? "#11B07A": "#FF665A",position:"absolute",width:`${ing.value}%`,height:"100%",top:"0",left:"0",zIndex:"1", borderRadius:"20px" }}></Box>}
                  </Box>
                </Box>
              })}
            </Box>
          </SwiperSlide>
          <SwiperSlide style={{minHeight:"300px",width:"100%",padding:"30px 0"}}>
            <Typography sx={{ textAlign:"center",fontSize:"2rem"}}>Predictive failover components</Typography>
            <Box sx={{margin:"30px auto", display:"flex",flexDirection:"column", gap:"20px"}}>
              {receipents.map((ing) => {
                return <Box key={ing.id} sx={{display:"flex",width:"100%", padding:"0 80px 0 0px", justifyContent:"flex-end",gap:"30px"}}>
                  <Typography sx={{textTransform:"capitalize"}}>{ing.name}</Typography>
                  <Box sx={{borderRadius:"20px", background:"#EBEEF1",textAlign:"center",position:"relative", width:"60%"}}>
                  <Box sx={{position:"inherit",zIndex:"10"}}>{ing.Count}%</Box>
                    <Box sx={{ background: ing.Count > 50 ? "#11B07A": "#FF665A",position:"absolute",width:`${ing.Count}%`,height:"100%",top:"0",left:"0",zIndex:"1", borderRadius:"20px" }}></Box>
                  </Box>
                </Box>
              })}
            </Box>
          </SwiperSlide>
        </Swiper>
        </Box>
        
      </Dialog>
      <Dialog open={openUpdate || false} onClose={handleCloseUpdate} >
          <Box sx={{ display:"flex", width:"100%", justifyContent:"space-between", padding:"20px 30px"}}>
            <DialogTitle>{info?.DialogUpdate}</DialogTitle>
          
          </Box>
          
        <DialogContent>
        <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="idState"
                        label="State"
                        value={item.pack?.idState}
                        onChange={handleChangeSelect}
                    >
                        {types.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button onClick={() => {
            if (editFunction){
              editFunction(item)
              handleCloseUpdate()
            }
            handleCloseUpdate()
          }}>Save changes</Button>
        </DialogActions>
      </Dialog>
      {/* The Data Grid Section */}
      <StyledDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection={false}
        disableRowSelectionOnClick
        getRowClassName={(params) => `state-${params.row.pack.idState}`}
      />
    </Box>
  );
}