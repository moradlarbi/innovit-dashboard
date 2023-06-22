import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem, IconButton, FormControl, InputLabel, Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useCtxt } from '../../context/app.context';
export default function DataGridAccounts({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate
}) {
  const {ctxt} = useCtxt()
    const [columnVisible, setColumnVisible] = useState();
    const [actifRole, setActifRole] = useState(5)
  useEffect(() => {
    let newColumns ={}
    columns.map((e) => {
        newColumns[e.field] = e.hide ? !e.hide : true
    })
    setColumnVisible(newColumns);
  }, [columns]);
    const [rows,setRows] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = React.useState(false)
  const [states, setStates] = React.useState()
  const [client, setClient] = useState()
  const [selectValues, setSelectValues] = useState([])
  const [recherche, setRecherche] = useState("")
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowPassword2 = () => setShowPassword2((show) => !show);
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setStates({ ...states, [event.target.name]: event.target.value })
  }
  const handleChangeSelect = (event) => {
    setClient(event.target.value)
  }
 
  //Update dependacies
  
  const handleChangeUpdate = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
    const getData = () => {
      console.log(fetchUrl);
     
      axios
      .get(
        `${fetchUrl}/role/${actifRole}`
      )
      .then((res) => {
        if (res.status == 200) {
          setRows(res.data)
          console.log(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
      React.useEffect(() => {
       if (Object.keys(item).length > 0){
        axios
      .get(
        `http://localhost:5000/entreprises`
      )
      .then((res) => {
        if (res.status == 200) {
          setSelectValues(res.data)
          setRefresh(!refresh)
          console.log(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
       }
        
      }, [item])
      React.useEffect(() => {

      }, [refresh])
      const types = [{id: 5, name:"Deciders"},{id: 4,name:"Commercial Agent"},{id: 3,name:"maintenance Agent"}]
  return (
    <Box sx={{ height: 500, width: '100%', padding:"15px 10px", }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <Typography variant='h4'>{info?.title}</Typography>}
      {info?.description && <p>{info?.description}</p>}
      {add && (
        <>
        <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between", margin:"20px 0"}}>
        <Box sx={{ display:"flex", gap:"10px"}}>
            {types.map((t) => {
                return (
                    <Box key={t.id} sx={{ background: t.id === actifRole ? "#11B07A": "#EBEEF1", color:t.id === actifRole ? "#fff": "#000", borderRadius:"15px", padding:"8px 30px", cursor:"pointer" }} onClick={() => {
                      setActifRole(t.id)
                      setRefresh(!refresh)
                    }}>
                        {t.name}
                    </Box>
                )
            })}
        </Box>
        <Button
            variant="contained"
            startIcon={info?.addIcon}
            onClick={handleClickOpen}
          >
            {info?.addText || 'Ajouter'}
          </Button>
        </Box>
          

          <Dialog open={open} onClose={handleClose}>
            <Box sx={{ display:"flex", width:"100%", justifyContent:"space-between", padding:"20px 30px"}}>
            <DialogTitle>{info?.DialogTitle}</DialogTitle>
            <FormControl sx={{ minWidth:"250px"}}>
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="idRole"
                        label="type"
                        onChange={handleChange}
                    >
                        {types.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.name}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
            </Box>
            

            <DialogContent>
              
              <Box sx={{display: "grid", gridTemplateColumns:"1fr 1fr",gap:"10px 10px",margin:"10px 0"}}>
              
              {columns
                ?.filter((e) => e.add)
                .map((column) => (
                  <Box key={column.id}>
                    {column.add && (column.type==="string" || column.type==="number"|| column.type=="email") &&
                        <TextField
                        fullWidth
                        key={column.id}
                            id="outlined-start-adornment"
                            name={column.field}
                            type={column.type}
                            label={column.headerName}
                            onChange={handleChange}
                            {...column.TextFieledProps}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">{''}</InputAdornment>
                            ),
                            }}
                        />
                        }
                        {column.add && column.type==="password" && <>
                        <TextField
                        id={column.field}
                        type={showPassword ? 'text':'password'}
                        name={column.field}
                        label={column.headerName}
                        onChange={handleChange}
                        {...column.TextFieledProps}
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
                    
                        </> }
                        
                 </Box>
              ))}
              <TextField
                        type={showPassword2 ? 'text':'password'}
                        name="confirm"
                        label="Confirm password"
                        onChange={handleChange}
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
              
              </Box>
            </DialogContent>
            <DialogActions>
            <Button
                variant="contained"
                onClick={() => {
                  handleClose()
                }}
              >
                        Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (addFunction) addFunction({...states,  idEntreprise: ctxt?.user.idEntreprise})
                  handleClose()

                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* Update dialog */}
          {edit && <Dialog open={openUpdate || false} onClose={handleCloseUpdate} >
          <Box sx={{ display:"flex", width:"100%", justifyContent:"space-between", padding:"20px 30px"}}>
            <DialogTitle>{info?.DialogUpdate}</DialogTitle>
          </Box>
          
        <DialogContent>
          <Box sx={{display: "grid", gridTemplateColumns:"1fr 1fr",gap:"10px 10px",margin:"10px 0"}}>
          {columns
                ?.filter((e) => e.edit)
                .map((column) => (
                  <>
                    {column.edit && (column.type==="string" || column.type==="number"|| column.type=="email") &&
        
                        <TextField
                        key={column.id}
                            id="outlined-start-adornment"
                            name={column.field}
                            type={column.type}
                            value={item[column.field]}
                            label={column.headerName}
                            onChange={handleChangeUpdate}
                            {...column.TextFieledProps}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">{''}</InputAdornment>
                            ),
                            }}
                        />
                        }
                        {column.edit && column.type==="password" && <>
                        <TextField
                        id={column.field}
                        type={showPassword ? 'text':'password'}
                        name={column.field}
                        value={item[column.field]}
                        label={column.headerName}
                        onChange={handleChangeUpdate}
                        {...column.TextFieledProps}
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
                        </> }
                 </>
              ))}
              
          
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button onClick={() => {
            if (editFunction){
              editFunction({...item,idRole:client})
              handleCloseUpdate()
            }
            handleCloseUpdate()
          }}>Save changes</Button>
        </DialogActions>
      </Dialog>}
        </>
      )}
      {/* The Data Grid Section */}
      <DataGrid
        rows={rows}
        columns={columns}
        columnVisibilityModel={columnVisible}
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
      />
    </Box>
  );
}