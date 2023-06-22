import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem, FormControl, InputLabel,Typography} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { useCtxt } from '../../context/app.context';
export default function DataGridDrinks({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate
}) {
  const {ctxt} = useCtxt()
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
  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setStates({ ...states, [event.target.name]: event.target.value })
  }
  
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
        `${fetchUrl}`
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data)
          setRows(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      axios
      .get(
        `http://localhost:5000/categoriesDrink`
      )
      .then((res) => {
        if (res.status == 200) {
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
      const [file, setFile] = useState()
      const uploadImage = (e) => {
        console.log(e.target.files)
        if (e.target.files) {
          setFile(e.target.files[0])
        }
        else {
          console.log("error upload image")
        }
      }
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
              <FormControl fullWidth>
                    <InputLabel id="category">Category</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select"
                        name="category"
                        label="Category"
                        onChange={handleChange}
                    >
                        {selectValues.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.description}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
              <Box sx={{display: "grid", gridTemplateColumns:"1fr",gap:"10px 10px",margin:"10px 0",minWidth:"400px"}}>
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
                            endAdornment: (
                                <InputAdornment position="start">{column.type =="number" ? "DZD":""}</InputAdornment>
                            ),
                            }}
                        />
                        }
                        
                 </Box>
              ))}

              <Box>
                <Typography>Drink Image</Typography>
                <Box sx={{ display:"flex", gap:"10px", alignItems:"center"}} fullWidth>
                <label htmlFor="upload-file">
                        <input
                            style={{ display: 'none' }}
                            id="upload-file"
                            name="upload-file"
                            onChange={uploadImage}
                            type="file"
                        />
                        <Box sx={{background:"#9BAEBC", color:"#fff", borderRadius:"10px", padding:"10px 10px", cursor:"pointer"}}>
                            <Typography>Browse files</Typography>
                        </Box>
                    </label>
                    <Typography sx={{ flex:"auto", background: "#EBEEF1", padding:"10px 10px", borderRadius:"10px"}}>{file?.name ?? ""}</Typography>
                </Box>
            
            </Box>
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

                  if (addFunction) addFunction({...states,  idEntreprise: ctxt?.user.idEntreprise}, file)
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
          <Box sx={{display: "grid", gridTemplateColumns:"1fr",gap:"10px 10px",margin:"10px 0", minWidth:"400px"}}>
          {columns
                ?.filter((e) => e.edit)
                .map((column) => (
                  <Box key={column.id}>
                    {column.edit && (column.type==="number") &&
        
                        <TextField
                        fullWidth
                            id="outlined-start-adornment"
                            name={column.field}
                            type={column.type}
                            value={item[column.field]}
                            label={column.headerName}
                            onChange={handleChangeUpdate}
                            {...column.TextFieledProps}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">{column.type =="number" ? "DZD":""}</InputAdornment>
                            ),
                            }}
                        />
                        }
                 </Box>
              ))}
          
          </Box>
          
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