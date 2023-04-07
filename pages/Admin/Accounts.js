import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridAccounts from '../../src/components/DataGrids/DataGridAccounts'
import Layout from '../../src/components/Layout'
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
      type: 'string',
      editable: false,
      valueGetter: (params) => {
        return `${params.row.last_name} ${params.row.first_name}`
      }
    },
    {
      field: 'last_name',
      headerName: 'Last name',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      hide: true,
    },
    {
      field: 'first_name',
      headerName: 'First name',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      hide: true,
    },
    {
        field: 'type',
        headerName: 'Type',
        type: 'select',
        editable: false,
        add: true,
        edit: true,
      },
    {
      field: 'email',
      headerName: 'Email',
      type: 'email',
      editable: false,
      add: true,
      edit: true,
    },
    {
        field: 'phone_number',
        headerName: 'Phone number',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
      },
      {
        field: 'password',
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
  const addOne = (values,client) => {
    console.log(client)
    axios.post('http://localhost:3001/book', values).then((res) => {
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
        axios.delete(`http://localhost:3001/book/${id}`)
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
    axios.put(`http://localhost:3001/api/${values.id}`, values).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${values.name} a bien été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${values.name} n'a pas été mis a jour`,
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
    <Box sx={{ background: "#EBEEF1",marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridAccounts 
      columns={columns}
      fetchUrl=""
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