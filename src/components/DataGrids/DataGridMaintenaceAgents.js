import React, {useState, useEffect } from 'react';
import {Box, Button, InputAdornment, TextField, Dialog, DialogActions, DialogContent,Typography,
   DialogTitle, DialogContentText, Select, MenuItem, IconButton, FormControl, InputLabel} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
export default function DataGridMaintenanceAgents({
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
    const [filtredRows, setFiltredRows] = useState([])
    const [value, setValue] = React.useState('');
    const handleRecherche = () => {
      setFiltredRows(rows.filter((r) => (r.nom + r.prenom).toLowerCase().includes(value.toLocaleLowerCase())))
    }

  const handleChange = (event) => {
    setValue( event.target.value );
  }
  useEffect(() => {
    setFiltredRows(rows.filter((r) => (r.nom + r.prenom).toLowerCase().includes(value.toLocaleLowerCase())))
  },[value])
 
    const getData = () => {
      console.log(fetchUrl);
     
      axios
      .get(
        `${fetchUrl}`
      )
      .then((res) => {
        if (res.status == 200) {
          setRows(res.data)
          setFiltredRows(res.data)
        }
      })
      .catch((e) => {
        console.log(e)
      })
      }
      React.useEffect(() => {
        getData()
      }, [ refreshParent, refresh])
  return (
    <Box sx={{ height: 500, width: '100%', padding:"15px 10px", }}>
      <TextField
          id="input-with-icon-textfield"
          label="Recherche"
          name="recherche"
          placeholder="Recherche"
          style={{flex: "auto", background: "#ffffff", margin: "20px 0"}}
          onChange={handleChange}
          InputProps={{
          endAdornment: (
              <InputAdornment position="start">
              <SearchIcon sx={{ cursor: "pointer"}} onClick={() => {
                handleRecherche()
              }} />
              </InputAdornment>
          ),
          }}
          variant="outlined"
        />
      {/* The Data Grid Section */}
      <DataGrid
        rows={filtredRows}
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