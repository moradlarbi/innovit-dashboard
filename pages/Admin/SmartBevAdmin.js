import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from 'sweetalert2'
import DataGridVendingAdmin from '../../src/components/DataGrids/DataGridVendingAdmin'
import Layout from '../../src/components/Layout'

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
    title: "List of vending machines",
    description: "View and edit your vending machines",
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
      field: 'identifiant',
      headerName: 'Identifiant',
      type: 'string',
      editable: false,
      add: true,
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
      edit: false,
      valueGetter: (params) => {
        return `PACK ${params.row.id}`
      }
    },
    {
      field: "localisation",
      headerName: "Région",
      type:"string",
      add: true,
      edit: false,
      valueGetter: (params) => {
        return ` ${params.row.pack?.localisation}`
      }
    },
    {
      field: 'client',
      headerName: 'Client',
      type: 'select',
      editable: false,
      add: false,
      edit: true,
      valueGetter: (params) => {
        return `${params.row.entreprise?.nom}`
      }
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
    axios.post('http://localhost:5000/distributeurs/add', {
      capaciteGoblet : parseInt(values.capaciteGoblet),
      capaciteSucre : parseInt(values.capaciteSucre),
      capaciteSpoon : parseInt(values.capaciteSpoon),
      identifiant: values.identifiant,
      pack : {
        idEntre: values.client,
        codeverou: "",
        localisation: values.localisation,
        state: 1
      }
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
        }).catch((e) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: `${values.name} n'a pas été ajouté`,
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
        axios.delete(`http://localhost:5000/distributeurs/delete/${id}`)
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
    console.log(values)
    console.log(idClient)
    axios.patch(`http://localhost:5000/distributeurs/edit/${values.id}`, {
      ...values, pack: {
        ...values.pack, idEntre: idClient,localisation: values.localisation
      }
    }).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Les informations ont bien été mis a jour`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            valide1 = false
           } 
        }).catch((e) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `Les informations n'ont pas été mis a jour`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        
        
  }

  return (
    <Layout>
    <Box sx={{ marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridVendingAdmin 
      columns={columns}
      fetchUrl="http://localhost:5000/distributeurs"
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

export default SmartBevAdmin