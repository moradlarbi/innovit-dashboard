import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem, FormControl, InputLabel, Typography} from '@mui/material';
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
  const [category, setCategory] = useState()
  const [categories, setCategories] = useState([])
  const [categoriesDrinks, setCategoriesDrinks] = useState([])
  const [annoncer, setAnnoncer] = useState()
 
 
    const getData = () => {
     
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
        `http://localhost:5000/annonceurs`
      )
      .then((res) => {
        if (res.status == 200) {
          setSelectValues(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      axios
      .get(
        `http://localhost:5000/categories`
      )
      .then((res) => {
        if (res.status == 200) {
          setCategories(res.data)
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
          setCategoriesDrinks(res.data)
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
        console.log(item)
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
          

          <Dialog open={open} onClose={handleClose} maxWidth={false} sx={{ minWidth: 500}}>
            <DialogTitle>{info?.DialogTitle}</DialogTitle>

            <DialogContent>
              <DialogContentText>{info?.DialogDescription}</DialogContentText>
              <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">annoncer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="idAnnonceur"
                        type="number"
                        label="Annoncer"
                        onChange={handleChange}
                    >
                        {selectValues.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.nom} {v.prenom}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
              <Box sx={{display: "grid", gridTemplateColumns:"1fr",gap:"10px 10px",margin:"10px 0"}}>
              {columns
                ?.filter((e) => e.add)
                .map((column) => (
                  <Box key={column.id}>
                    {column.add && (column.type==="string" || column.type==="number"|| column.type=="email") &&
        
                        <TextField
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
                 </Box>
              ))}
              <FormControl fullWidth>
                    <InputLabel id="category">category</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select"
                        type='number'
                        name="idCategorie"
                        label="Category"
                        onChange={handleChange}
                    >
                        {categories.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.categorie}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="category">category Drink</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select"
                        name="idCategRecette"
                        type="number"
                        label="Category"
                        onChange={handleChange}
                    >
                        {categoriesDrinks.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.description}</MenuItem>
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
          
              <Box sx={{display: "grid", gridTemplateColumns:"1fr",gap:"10px 10px",margin:"10px 0"}}>
              {columns
                ?.filter((e) => e.add)
                .map((column) => (
                  <Box key={column.id}>
                    {column.add && (column.type==="string" || column.type==="number"|| column.type=="email") &&
        
                        <TextField
                            id="outlined-start-adornment"
                            name={column.field}
                            type={column.type}
                            label={column.headerName}
                            value={item[column.field]}
                            onChange={handleChangeUpdate}
                            {...column.TextFieledProps}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">{''}</InputAdornment>
                            ),
                            }}
                        />
                        }
                 </Box>
              ))}
              <FormControl fullWidth>
                    <InputLabel id="category">category</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select"
                        type='number'
                        name="categorie"
                        label="Category"
                        value={item?.categorie}
                        onChange={handleChangeUpdate}
                    >
                        {categories.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.categorie}</MenuItem>
                            )
                        })}
                        
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="category">category Drink</InputLabel>
                    <Select
                        labelId="category"
                        id="demo-simple-select"
                        name="categRecette"
                        type="number"
                        label="Category"
                        value={item.categRecette}
                        onChange={handleChangeUpdate}
                    >
                        {categoriesDrinks.map((v) => {
                            return (
                                <MenuItem key={v.id} value={v.id}>{v.description}</MenuItem>
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