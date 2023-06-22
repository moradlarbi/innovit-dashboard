import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridAds from '../../src/components/DataGrids/DataGridAds'
import Layout from '../../src/components/Layout'
const Ads = () => {
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
    title: "List of ads",
    description: "View and edit your ads",
    addText: 'Add an advertisement',
    addIcon: <AddIcon />,
    DialogTitle: 'Add a advertisement',
    DialogUpdate: "Edit a advertisement",
    DialogDescription: "The creation of a advertisement",
    DialogUpdateDescription: "Update of a advertisement"
  }
  const propsInfo = {
    add: true,
    delete: true,
    edit: true
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90, hide: true },
    {
        field: 'annonceur',
        headerName: 'Annoncer',
        type: 'select',
        editable: false,
        add: false,
        edit: false,
        width: 150,
      },
    {
        field: 'categRecette',
        headerName: 'Category',
        type: 'select',
        editable: false,
        add: false,
        edit: false,
        hide: true,
        width: 150,
      },
    {
      field: 'categorie',
      headerName: 'age',
      type: 'select',
      editable: false,
      add: false,
      edit: false,
      hide: true,
      width: 150,
    },
    {
        field: 'url',
        headerName: 'Url',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        hide: false,
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
    axios.post('http://localhost:5000/walou/add', values).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `la publicité a bien été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
        setrefresh(!refresh)
      } 
      else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `la publicité n'a pas été ajouté`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
        }).catch((e) => {
          console.log(e)
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `la publicité n'a pas été ajouté`,
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
        axios.delete(`http://localhost:5000/walou/delete/${id}`)
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
    console.log(values)
    axios.patch(`http://localhost:5000/walou/edit/${values.id}`, values).then((res) => {
          if (res.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `la publicité a bien été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `la publicité n'a pas été mis a jour`,
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
            title: `la publicité n'a pas été mis a jour`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
  } 
  return (
    <Layout>
    <Box sx={{marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridAds 
      columns={columns}
      fetchUrl="http://localhost:5000/publicites"
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

export default Ads