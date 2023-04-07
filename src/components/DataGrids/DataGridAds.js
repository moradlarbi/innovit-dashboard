import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem, FormControl, InputLabel} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
export default function DataGridAds({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate
}) {
    const [columnVisible, setColumnVisible] = useState();
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
  const [selectValues, setSelectValues] = useState([])
  const [recherche, setRecherche] = useState("")
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
  
  //Update dependacies
  
  const handleChangeUpdate = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
    const getData = () => {
      console.log(fetchUrl);
     
      // axios
      // .get(
      //   `${fetchUrl}`
      // )
      // .then((res) => {
      //   if (res.status == 200) {
      //     setRows(res.data)
      //     console.log(res.data)
      //   }
      // })
      // .catch((e) => {
      //   console.log(e)
      // })
      // axios
      // .get(
      //   `http://localhost:5000/dashboard/users`
      // )
      // .then((res) => {
      //   if (res.status == 200) {
      //     console.log(res.data);
      //     setSelectValues(res.data)
      //   }
      // })
      // .catch((e) => {
      //   console.log(e)
      // })
      setRows( [
        { id: 1, first_name: 'Snow', last_name: 'Jon',  phone_number:"pack1" },
        { id: 2, first_name: 'Lannister', last_name: 'Cersei',phone_number:"pack1" },
        { id: 3, first_name: 'Lannister', last_name: 'Jaime', phone_number:"pack1" },
        { id: 4, first_name: 'Stark', last_name: 'Arya',  phone_number:"pack1" },
        { id: 5, first_name: 'Targaryen', last_name: 'Daenerys',  phone_number:"pack1" },
        { id: 6, first_name: 'Melisandre', last_name: null,  phone_number:"pack1" },
        { id: 7, first_name: 'Clifford', last_name: 'Ferrara',  phone_number:"pack1" },
        { id: 8, first_name: 'Frances', last_name: 'Rossini',  phone_number:"pack1" },
        { id: 9, first_name: 'Roxie', last_name: 'Harvey',  phone_number:"pack1"},
      ])
      setSelectValues([{id: 1,label:"Client1"},{id: 2,label:"Client2"},{id: 3,label:"Client3"},])
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
  return (
    <Box sx={{ height: 500, width: '100%', padding:"15px 10px", }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <h1>{info?.title}</h1>}
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
                ?.filter((e) => e.add)
                .map((column) => (
                  <>
                    {column.add && (column.type==="string" || column.type==="number"|| column.type=="email") &&
        
                        <TextField
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
                 </>
              ))}
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

                  if (addFunction) addFunction(states)
                  handleClose()

                }}
              >
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {/* Update dialog */}
          {edit && <Dialog open={openUpdate || false} onClose={handleCloseUpdate} >
        <DialogTitle>{info?.DialogUpdate}</DialogTitle>
        <DialogContent>
          <DialogContentText>{info?.DialogUpdateDescription}</DialogContentText>
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
                        
                        
                 </>
              ))}
              <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Choose an admin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="admin"
                        label="Administrator"
                        onChange={handleChangeUpdate}
                    >
                        {selectValues.map((v) => {
                            return (
                                <MenuItem value={v.id}>{v.label}</MenuItem>
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