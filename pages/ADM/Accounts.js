import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridAccounts from '../../src/components/DataGrids/DataGridAccounts'
import Layout from '../../src/components/Layout'
import PersonOffIcon from '@mui/icons-material/PersonOff';
const Accounts = () => {
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
    title: "Agents' List",
    description: "View and edit accounts of your agents",
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
  const types = [{id: 2, name:"Deciders"},{id: 3,name:"Commercial Agent"},{id: 4,name:"maintenance Agent"}]
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
        field: 'idRole',
        headerName: 'Type',
        type: 'select',
        editable: false,
        add: false,
        edit: false,
        width: 150,
        valueGetter: (params) => {
          switch (params.row.idRole){
            case 5:
              return "Decider"
            case 3:
              return "Agent maintenacier"
            case 4:
              return "Agent commercial"
            default:
              return ""
          }
           
        }
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
        field: 'mdp',
        headerName: 'password',
        type: 'password',
        editable: false,
        add: true,
        edit: false,
        hide: true
      },
    {
      field: "actions",
      headerName: "Actions",
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
        { info.editIcon ? info.editIcon : <EditIcon />  }
      </div>
      <div style={{"cursor":"pointer"}} onClick={() => {
        deleteOne(params.row.id)
      }}>
        { info.deleteIcon ? info.deleteIcon : <DeleteIcon />  }
      </div>

      </Box>)
          
      }
    }
  ];
  const addOne = (values) => {
    console.log(values)
    axios.post('http://localhost:5000/auth/signup',{...values, isActive: 1}).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${values.nom} a bien été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
        setrefresh(!refresh)
      } 
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${values.nom} n'a pas été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
      }}).catch((e) => {
        console.log(e)
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `${values.nom} n'a pas été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
      })

  }
  const deleteOne= (id) => {
    Swal.fire({
      text: "Vous voulez vraiment desactivé ce compte?",
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: `Annuler`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/users/status/${id}`, {
          isActive: 0
        })
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
              title: "L'item n'a pas été supprimé",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } 
    })
    
  };
  const updateOne = (values) => {
    axios.patch(`http://localhost:5000/users/edit/${values.id}`, values).then((res) => {
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
        }).catch((e) => {
          console.log(e)
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${values.nom} n'a pas été mis a jour`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
  }
  return (
    <Layout>
    <Box sx={{ background: "#fff",marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridAccounts 
      columns={columns}
      fetchUrl="http://localhost:5000/users"
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

export default Accounts