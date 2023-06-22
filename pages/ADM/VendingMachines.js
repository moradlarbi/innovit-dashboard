import {useState} from 'react'
import axios from 'axios'
import { Visibility, Edit } from '@mui/icons-material'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridVendingMachine from "../../src/components/DataGrids/DataGridVendingMachine"
import Layout from '../../src/components/Layout'
import { useCtxt } from '../../src/context/app.context';
const VendingMachine = () => {
  const {ctxt} = useCtxt()
  const [refresh, setrefresh] = useState(false)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});
  
  const propsDialog = {
    openUpdate: open2,
    setOpenUpdate: setOpen2,
    openView: open,
    setOpenView: setOpen,
    item: item,
    setItem: setItem,
  }
  const info = {
    addText: 'Nouveau SmartBev',
    DialogTitle: 'Ajouter un SmartBev',
    DialogUpdate: "Modifier un SmartBev",
    DialogDescription: "La création d'un SmartBev et sa configuration",
    DialogUpdateDescription: "La modification d'un SmartBev et sa configuration"
  }
  const propsInfo = {
    add: false,
    delete: false,
    edit: true
  }
  const types = {1:"In use",
  2: "Out of service",
  3: "Disconnected"
}
  const columns = [
    {
      field: 'identifiant',
      headerName: 'Identifiant',
      type: 'string',
      editable: false,
      add: false,
      edit: false,
    },
    {
      field: 'region',
      headerName: 'Region',
      type: 'string',
      editable: false,
      add: true,
      edit: false,
      hide: true,
      valueGetter: (params) => {
        return `${params.row.pack?.localisation}`
      }
    },
    {
      field: 'state',
      headerName: 'state',
      type: 'select',
      editable: false,
      add: true,
      edit: true,
      width: 150,
      valueGetter: (params) => {
        switch (params.row?.pack.idState){
          case 1:
            return "actif"
          case 2:
            return "shutdown"
          case 3:
            return "under maintenance"
          default:
            return ""
        }
      }
    },
    {
      field: "actions",
      headerName: "",
      type: 'string',
      sortable: false,
      filterable: false,
      editable: false,
      hide: !propsInfo.edit,
      width: 100,
      renderCell: (params) => {
        return (<Box sx={{ display: "flex", gap:"10px", alignItems:"center"}}>
        <div style={{"cursor":"pointer"}} onClick={() => {
        setItem(params.row)
        setOpen(true);
      }}>
        <Visibility />
      </div>
      <div style={{"cursor":"pointer"}} onClick={() => {
        setItem(params.row)
        setOpen2(true);
      }}>
        <Edit />
      </div>
      </Box>)
          
      }
    }
  ];
  const addOne = (values,client) => {
    
  }
  const deleteOne= (id) => {
    
    
  };
  const updateOne = (values) => {
    axios.patch(`http://localhost:5000/distributeurs/edit/${values.id}`, values).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `L'état du distributeur ${values.id} a bien été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `L'état du distributeur ${values.id} n'a pas été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            if (res.status === 400) {
              console.log('bad req')
            }
           } 
        }).catch((e) => {
          console.log(e)
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `L'état du distributeur ${values.id} n'a pas été mis a jour`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
  }
  return (
    <Layout>
    <Box sx={{ marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridVendingMachine 
      columns={columns}
      fetchUrl={`http://localhost:5000/distributeurs/entreprises/${ctxt.user?.idEntreprise}`}
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

export default VendingMachine