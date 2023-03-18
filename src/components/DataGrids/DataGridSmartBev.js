import React, {useState } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
export default function DataGridSmartBev({
    fetchurl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
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
  };
  //Update dependacies
  
  const handleChangeUpdate = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
    const getData = () => {
      axios
      .get(
        `${fetchurl}`
      )
      .then((res) => {
        if (res.status == 200) {
          setRows(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      axios
      .get(
        `http://localhost:3001/api/roles`
      )
      .then((res) => {
        if (res.status == 200) {
          setSelectValues(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
        setRows( [
            { id: 1, name: 'Snow', client: 'Jon', goblet: 35, spoon: 12, sugar: 4, pack:"pack1" },
            { id: 2, name: 'Lannister', client: 'Cersei', goblet: 42, spoon: 12, sugar: 4,pack:"pack1" },
            { id: 3, name: 'Lannister', client: 'Jaime', goblet: 45, spoon: 12, sugar: 4,pack:"pack1" },
            { id: 4, name: 'Stark', client: 'Arya', goblet: 16, spoon: 12, sugar: 4, pack:"pack1" },
            { id: 5, name: 'Targaryen', client: 'Daenerys', goblet: 41, spoon: 12, sugar: 4, pack:"pack1" },
            { id: 6, name: 'Melisandre', client: null, goblet: 15, spoon: 12, sugar: 40, pack:"pack1" },
            { id: 7, name: 'Clifford', client: 'Ferrara', goblet: 44, spoon: 12, sugar: 4, pack:"pack1" },
            { id: 8, name: 'Frances', client: 'Rossini', goblet: 36, spoon: 12, sugar: 4, pack:"pack1" },
            { id: 9, name: 'Roxie', client: 'Harvey', goblet: 65, spoon: 12, sugar: 4 , pack:"pack1"},
          ])
          setSelectValues([{id: 1,label:"Client1"},{id: 2,label:"Client2"},{id: 3,label:"Client3"},])
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
  return (
    <Box sx={{ height: 800, width: '100%', padding:"15px 10px", }}>
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
            placeholder="Rechercher un produit"
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
                  key={column.id}
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
                {columns
                ?.filter((e) => e.add && e.type=="select")
                .map((column) => (
                  <Select
                  key={column.id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client}
                    label="Client"
                    onChange={handleChangeSelect}
                  >
                    {selectValues.map((v) => {
                        return (
                            <MenuItem value={v.id}>{v.label}</MenuItem>
                        )
                    })}
                    
                  </Select>
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
                  Annuler
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (addFunction) addFunction(states)
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
                key={column.id}
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
          {columns
                ?.filter((e) => e.add && e.type=="select")
                .map((column) => (
                  <Select
                    key={column.id}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={client}
                    label="Client"
                    onChange={handleChangeSelect}
                  >
                    {selectValues.map((v) => {
                        return (
                            <MenuItem value={v.id}>{v.label}</MenuItem>
                        )
                    })}
                    
                  </Select>
                ))}
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button onClick={() => {
            if (editFunction){
              editFunction(item)
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
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}