import React, {useEffect, useState } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,Typography,
   DialogTitle, DialogContentText, Select,FormControl, InputLabel, MenuItem} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
export default function DataGridVendingAdmin({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate
}) {
    const [rows,setRows] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = React.useState(false)
  const [states, setStates] = React.useState()
  const [client, setClient] = useState()
  const [selectValues, setSelectValues] = useState([])
  const [recherche, setRecherche] = useState("")
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
    setClient(event.target.value);
    setRefresh(!refresh)

  };
  //Update dependacies
  
  const handleChangeUpdate = (event) => {
    if (event.target.type === "number"){
      setItem({ ...item, [event.target.name]: Number(event.target.value) });
    }
    else {
      setItem({ ...item, [event.target.name]: event.target.value });
    }
    
  };
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
      })
      axios
      .get(
        `http://localhost:5000/dashboard/clients`
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
          setSelectValues(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
      useEffect(() => {
        if (Object.keys(item).length > 0) {
          console.log(item.entreprise)
          setClient(item.entreprise?.id)
        }
      }, [item])
  return (
    <Box sx={{ height: 500, width: '100%', padding:"15px 10px", }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <Typography variant='h4'>{info?.title}</Typography>}
      {info?.description && <p>{info?.description}</p>}
      {add && (
        <>
        <Box sx={{display:"flex", alignItems:"center", width:"100%", justifyContent:"space-between", margin:"20px 0"}}>
        <TextField
            id="input-with-icon-textfield"
            label="Rechercher"
            name="recherche"
            placeholder="Rechercher un distributeur"
            style={{maxWidth:"700px", flex:"auto", background: "#ffffff"}}
            onChange={(e) => {
              setRecherche(e.target.value)
            }}
            InputProps={{
            endAdornment: (
                <InputAdornment position="start">
                <SearchIcon sx={{ cursor: "pointer"}} onClick={() => {
                }} />
                </InputAdornment>
            ),
            }}
            variant="outlined"
        />
        <Button
            variant="contained"
            startIcon={info?.addIcon}
            onClick={handleClickOpen}
          >
            {info?.addText || 'Ajouter'}
          </Button>
        </Box>
          

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{info?.DialogTitle}</DialogTitle>

            <DialogContent>
              <DialogContentText>{info?.DialogDescription}</DialogContentText>
              <Box sx={{display: "grid", gridTemplateColumns:"1fr 1fr",gap:"10px 10px",margin:"10px 0"}}>
              {columns
                ?.filter((e) => e.add && (e.type =="string" || e.type =="number"))
                .map((column) => (
                  <TextField
                  key={column.field}
                  type={column.type}
                    id="outlined-start-adornment"
                    name={column.field}
                    label={column.headerName}
                    onChange={handleChange}
                    {...column.TextFieledProps}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">{''}</InputAdornment>
                      ),
                    }}
                  />
                ))}
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="client"
                        label="client"
                        onChange={handleChange}
                    >
                        {selectValues.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.nom}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
            <Button
                variant="contained"
                onClick={() => {
                  handleClose()
                }}
              >
                  Annuler
              </Button>
              <Button
                variant="contained"
                onClick={() => {

                  if (addFunction) addFunction(states)
                  handleClose()

                }}
              >
                Enregistrer
              </Button>
            </DialogActions>
          </Dialog>
          {/* Update dialog */}
          {edit && <Dialog open={openUpdate || false} onClose={handleCloseUpdate} >
        <DialogTitle>{info?.DialogUpdate}</DialogTitle>
        <DialogContent>
          <DialogContentText>{info?.DialogUpdateDescription}</DialogContentText>
          <Box sx={{display: "grid", gridTemplateColumns:"1fr 1fr",gap:"10px 10px",margin:"10px 0"}}>
          {columns?.map((column) => (
            <>
            {column.edit && (column.type==="string" || column.type==="number" ) && <TextField
                key={column.field}
                id="outlined-start-adornment"
                type={column.type}
                name={column.field}
                value={item[column.field]}
                label={column.headerName}
                onChange={handleChangeUpdate}
                {...column.TextFieledProps}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{''}</InputAdornment>
                  ),
                }}
              /> }
              
              
            </>
          ))}
          <TextField
                id="outlined-start-adornment"
                type="string"
                defaultValue={item.pack?.localisation}
                name="localisation"
                value={item.localisation}
                label="localisation"
                onChange={handleChangeUpdate}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">{''}</InputAdornment>
                  ),
                }}
              />
          <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Client</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="client"
                        label="client"
                        value={client}
                        onChange={handleChangeSelect}
                    >
                        {selectValues.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.nom}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button onClick={() => {
            if (editFunction){
              console.log("-----",client);
              editFunction(item,client)
              handleCloseUpdate()
            }
            handleCloseUpdate()
          }}>Mettre a jour</Button>
        </DialogActions>
      </Dialog>}
        </>
      )}
      {/* The Data Grid Section */}
      <DataGrid
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
      />
    </Box>
  );
}