import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from 'sweetalert2'
import DataGridSmartBev from '../src/components/DataGrids/DataGridSmartBev'
const SmartBevAdmin = () => {
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
    addText: 'Nouveau SmartBev',
    addIcon: <AddIcon />,
    DialogTitle: 'Ajouter un SmartBev',
    DialogUpdate: "Modifier un SmartBev",
    DialogDescription: "La création d'un SmartBev et sa configuration",
    DialogUpdateDescription: "La modification d'un SmartBev et sa configuration"
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
      headerName: 'Identifiant',
      type: 'string',
      editable: false,
      add: false,
      edit: true,
    },
    {
      field: 'capaciteGoblet',
      headerName: 'Goblet',
      type: 'number',
      editable: false,
      add: true,
      edit: true,
    },
    {
      field: 'capaciteSucre',
      headerName: 'Sugar',
      type: 'number',
      editable: false,
      add: true,
      edit: true,
    },
    {
      field: 'capaciteSpoon',
      headerName: 'Spoon',
      type: 'number',
      editable: false,
      add: true,
      edit: true,
    },
    {
      field: 'pack',
      headerName: 'Pack',
      type: 'string',
      editable: false,
      add: false,
      edit: true,
    },
    {
      field: 'client',
      headerName: 'Client',
      type: 'select',
      editable: false,
      add: false,
      edit: true,
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
    console.log(values);
    axios.post('http://localhost:5000/dashboard/distributeurs/add', {
      capaciteGoblet : parseInt(values.capaciteGoblet),
      capaciteSucre : parseInt(values.capaciteSucre),
      capaciteSpoon : parseInt(values.capaciteSpoon),
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `L'ajout a bien été effectué`,
          showConfirmButton: false,
          timer: 1500,
        });
        setrefresh(!refresh)
      } else if (res.status === 400) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: `L'ajout n'a pas été effectué`,
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
        axios.delete(`http://localhost:5000/dashboard/distributeur/delete/${id}`)
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
  const updateOne = (values,idClient) => {
    axios.put(`http://localhost:5000/dashboard/distributeur/edit/${values.id}`, {
      capaciteGoblet : parseInt(values.capaciteGoblet),
      capaciteSucre : parseInt(values.capaciteSucre),
      capaciteSpoon : parseInt(values.capaciteSpoon),
      idUser:parseInt(idClient)
    }).then((res) => {
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
        axios.post(`http://localhost:5000/dashboard/distributeurs/attr/${values.id}`, {
          idUser:parseInt(idClient)
        }).then((res) => {
          if (res.status === 200) {
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
        
  }
  return (
    <Box sx={{ background: "#fff", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridSmartBev 
      columns={columns}
      fetchUrl="http://localhost:5000/dashboard/distributeurs"
      addFunction={addOne}
      editFunction={updateOne}
      {...propsInfo}
      {...propsDialog}
      info={info}
      refreshParent={refresh}
       />
    </Box>
  )
}

export default SmartBevAdmin