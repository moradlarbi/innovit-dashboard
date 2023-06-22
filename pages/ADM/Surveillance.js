import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import Layout from '../../src/components/Layout'
import DataGridSurveillance from '../../src/components/DataGrids/DataGridSurveillance'
const Surveillance = () => {
  const [refresh, setrefresh] = useState(false)
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});
  
  const propsDialog = {
    openUpdate: open,
    setOpenUpdate: setOpen,
    item: item,
    setItem: setItem,
  }
  const info = {
    addText: 'Add a new account',
    addIcon: <AddIcon />,
    DialogTitle: 'Add an account',
    DialogUpdate: "Edit an account",
    DialogDescription: "The creation of an account profil",
    DialogUpdateDescription: "Update of an account profil"
  }
  const propsInfo = {
    add: true,
    delete: true,
    edit: true
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90,visible: false, hide: true },
    {
      field: 'name',
      headerName: 'Vending Machine ID',
      type: 'string',
      editable: false,
      width: 150,
      valueGetter: (params) => {
        return `${params.row.distr}`
      }
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        valueGetter: (params) => {
          return `${params.row.categorysensors}`
        }
      },
      {
        field: 'value',
        headerName: 'Degré',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        valueGetter: (params) => {
          return `${params.row.value}`
        }
      },
    {
      field: 'date',
      headerName: 'Theft date',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      width: 300,
    },
  ];
  const addOne = (values) => {
    
  }
  const updateOne = (values) => {
    
  }
  return (
    <Layout>
    <Box sx={{ background: "#fff",marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridSurveillance 
      columns={columns}
      fetchUrl="https://innovit-2cs-project.onrender.com/ODB/sensors/data?id=1&security=true"
      addFunction={addOne}
      editFunction={updateOne}
      {...propsInfo}
      {...propsDialog}
      info={info}
      refreshParent={refresh}
       />
    </Box>
    </Layout>
  )
}

export default Surveillance