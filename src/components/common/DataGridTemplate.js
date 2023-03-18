import React, {useState } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText, Select, MenuItem} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';





export default function DataGridTemplate({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate
}) {
    const [rows,setRows] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = React.useState(false)
  const [states, setStates] = React.useState()
  const [select, setSelect] = useState()
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
    setSelect(event.target.value);
  };
  //Update dependacies
  
  const handleChangeUpdate = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };
  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };
    const getData = () => {
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
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
  return (
    <Box sx={{ height: 800, width: '100%' }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <h1>{info?.title}</h1>}
      {info?.description && <p>{info?.description}</p>}
      {add && (
        <>
          <Button
            variant="contained"
            startIcon={info?.addIcon}
            onClick={handleClickOpen}
          >
            {info?.addText || 'Ajouter'}
          </Button>

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
          {columns?.map((column) => (
            <>
            {column.edit && (column.type==="string" || column.type==="number" ) && <TextField
                key={item.id}
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
              {column.edit && column.type==="password" && <TextField
                key={item.id}
                id="outlined-start-adornment"
                type={showPassword ? 'text' : 'password'}
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
              /> }
            </>
            
            
          ))}
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