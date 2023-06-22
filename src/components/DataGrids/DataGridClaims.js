import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,
   DialogTitle, DialogContentText,Typography, Select, MenuItem, IconButton} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
export default function DataGridClaims({
    fetchUrl,addFunction,editFunction,columns,info,refreshParent, add,edit,item,
    setItem,
    openUpdate,
    setOpenUpdate, openReply, setOpenReply
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
  const [states, setStates] = React.useState({})
  const [recherche, setRecherche] = useState("")

  const handleCloseReply = () => {
    setOpenReply(false)
  }

  const handleChange = (event) => {
    setStates({ ...states, [event.target.name]: event.target.value })
  }
  
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
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
  return (
    <Box sx={{ height: 500, width: '100%', padding:"15px 10px", }}>
      {/* The Dialog Section */}
      {/* Dialog Button */}
      {info?.title && <Typography variant='h4'>{info?.title}</Typography>}
      {info?.description && <p>{info?.description}</p>}
      {add && (
        <>
          

          <Dialog open={openUpdate} onClose={handleCloseUpdate}>
            <DialogTitle>{info?.DialogTitle}</DialogTitle>

            <DialogContent>
              <DialogContentText>{info?.DialogDescription}</DialogContentText>
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
                            value={item[column.field]}
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
              </Box>
            </DialogContent>
            <DialogActions>
            <Button
                variant="contained"
                onClick={() => {
                  handleCloseUpdate()
                }}
              >
                        Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleCloseUpdate()

                }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
          {/* Update dialog */}
          {edit && <Dialog open={openReply || false} onClose={handleCloseReply} >
        <DialogTitle>{info?.DialogUpdate}</DialogTitle>
        <DialogContent>
          <DialogContentText>{info?.DialogUpdateDescription}</DialogContentText>
          <Box sx={{display: "grid", gridTemplateColumns:"1fr",gap:"10px 10px",margin:"10px 0", minWidth:"400px"}}>
            <TextField
              fullWidth
                  id="outlined-start-adornment"
                  name="Email"
                  type="string"
                  label="Email"
                  disabled
                  value={item.Email}
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">{''}</InputAdornment>
                  ),
                  }}
              />
              <TextField
              fullWidth
                  id="outlined-start-adornment"
                  name="message"
                  type="string"
                  label="Message"
                  value={states.message}
                  onChange={handleChange}
                  InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">{''}</InputAdornment>
                  ),
                  }}
              />
          
          </Box>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReply}>Annuler</Button>
          <Button onClick={() => {
            if (editFunction){
              editFunction({message: states.message, userEmail: item.Email})
              handleCloseUpdate()
            }
            handleCloseReply()
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