import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import Layout from '../../src/components/Layout'
import DataGridMaintenanceAgents from '../../src/components/DataGrids/DataGridMaintenaceAgents'
import { useRouter } from 'next/router'
import { Visibility } from '@mui/icons-material'
const MaintenanceAgents = () => {
  const router = useRouter()
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
      field: 'full_name',
      headerName: 'Full name',
      type: 'sa',
      editable: false,
      width: 150,
      valueGetter: (params) => {
        return `${params.row.nom} ${params.row.prenom}`
      }
    },
    {
      field: 'nom',
      headerName: 'Last name',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      hide: true,
    },
    {
      field: 'prenom',
      headerName: 'First name',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      hide: true,
    },
    {
      field: 'mail',
      headerName: 'Email',
      type: 'email',
      editable: false,
      add: true,
      edit: true,
      width: 150,
    },
    {
        field: 'tel',
        headerName: 'Phone number',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        width: 150,
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
          router.push(`/ADM/MaintenanceAgent/${params.row.id}`)
        }}>
          <Visibility />
        </div>
        </Box>)
            
        }
      }
  ];
  const addOne = (values) => {
    axios.post('http://localhost:5000/dashboard/accounts', values).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${values.name} a bien été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
        setrefresh(!refresh)
      } else if (res.status === 400) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${values.name} n'a pas été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
        console.log('bad req')
      }
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${values.name} n'a pas été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
        })
    
        console.log(values)
  }
  const deleteOne= (id) => {
    Swal.fire({
      text: "Vous voulez vraiment supprimé l'item?",
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: `Annuler`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/dashboard/users/delete/${id}`)
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "L'item a bien été supprimé",
                showConfirmButton: false,
                timer: 1500,
              });
              setrefresh(!refresh)
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Le item n'a pas été supprimé",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "L'item n'a pas été ajouté",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } 
    })
    
  };
  const updateOne = (values) => {
    axios.put(`http://localhost:5000/dashboard/account/edit/${values.id}`, values).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${values.nom} a bien été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${values.nom} n'a pas été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            if (res.status === 400) {
              console.log('bad req')
            }
           } 
        })
  }
  return (
    <Layout>
    <Box sx={{ background: "#fff",marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridMaintenanceAgents 
      columns={columns}
      fetchUrl="http://localhost:5000/users/role/4"
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

export default MaintenanceAgents