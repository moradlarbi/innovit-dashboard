import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridAnnoncer from '../../src/components/DataGrids/DataGridAnnoncer'
import Layout from '../../src/components/Layout'
const Annoncer = () => {
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
    title: "List of annoncers",
    description: "View and edit your annoncers",
    addText: 'Add an announcer',
    addIcon: <AddIcon />,
    DialogTitle: 'Add a announcer',
    DialogUpdate: "Edit a announcer",
    DialogDescription: "The creation of a announcer profil",
    DialogUpdateDescription: "Update of a announcer profil"
  }
  const propsInfo = {
    add: true,
    delete: true,
    edit: true
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      editable: false,
      add: false,
      edit: false,
      width: 150,
      valueGetter: (params) => {
        return `${params.row.nom} ${params.row.prenom}`
      }
    },
    {
        field: 'nom',
        headerName: 'First Name',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        hide: true,
        width: 150,
      },
    {
        field: 'prenom',
        headerName: 'Last Name',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        hide: true,
        width: 150,
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
    axios.post('http://localhost:5000/annonceurs/add', {...values, idCreatedpar: 1}).then((res) => {
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
      }
        }).catch((e) => {
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
      text: "Vous voulez vraiment supprimé l'item?",
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: `Annuler`,
    })
    .then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/annonceurs/delete/${id}`)
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
    console.log(values)
    axios.patch(`http://localhost:5000/annonceurs/edit/${values.id}`, values).then((res) => {
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
      <DataGridAnnoncer 
      columns={columns}
      fetchUrl="http://localhost:5000/annonceurs"
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

export default Annoncer