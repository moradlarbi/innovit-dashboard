import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridAdmin from '../../src/components/DataGrids/DataGridAdmin'
import Layout from '../../src/components/Layout'

const AdministratorAdmin = () => {
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
    addText: 'Add an administrator',
    addIcon: <AddIcon />,
    DialogTitle: 'Add an administrator',
    DialogUpdate: "Update an administrator",
    DialogDescription: "The creation of administrator profil",
    DialogUpdateDescription: "Update of an administrator profil"
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
      type: 'string',
      editable: false,
      valueGetter: (params) => {
        return `${params.row.nom} ${params.row.prenom}`
      },
      width: 150,
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
    axios.post('http://localhost:5000/auth/signup',{...values,idRole: 2, isActive: 1, idCreatedpar: 0 }).then((res) => {
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
    
        console.log(values)
  }
  const deleteOne= (id) => {
    Swal.fire({
      text: "Vous voulez vraiment désactivé ce compte?",
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: `Annuler`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.patch(`http://localhost:5000/users/status/${id}`,{isActive: 0})
          .then((res) => {
            if (res.status === 200) {
              Swal.fire({
                position: "center",
                icon: "success",
                title: "Le compte a bien été désactivé",
                showConfirmButton: false,
                timer: 1500,
              });
              setrefresh(!refresh)
            } else {
              Swal.fire({
                position: "center",
                icon: "error",
                title: "Le compte n'a pas été désactivé",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Le compte n'a pas été désactivé",
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
    <Box sx={{ marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridAdmin 
      columns={columns}
      fetchUrl="http://localhost:5000/users/role/5"
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

export default AdministratorAdmin