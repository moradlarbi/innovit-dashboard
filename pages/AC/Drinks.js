import {useState} from 'react'
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridDrinks from '../../src/components/DataGrids/DataGridDrinks'
import Layout from '../../src/components/Layout'
import { useCtxt } from '../../src/context/app.context'
const Drinks = () => {
  const {ctxt} = useCtxt()
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
    addText: 'Add a drink',
    addIcon: <AddIcon />,
    DialogTitle: 'Add a drink',
    title: "List drinks",
    description: "View and edit your drinks",
    DialogUpdate: "Edit a drink",
    DialogDescription: "The creation of a drink profil",
    DialogUpdateDescription: "Update of a drink profil"
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
      headerName: 'Drink',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      width: 150,
      valueGetter: (params) => {
        return `${params.row?.recette.name}`
      }
    },
    {
        field: 'price',
        headerName: 'Price',
        type: 'number',
        editable: false,
        add: true,
        edit: true,
        width: 150,
        valueGetter: (params) => {
          return `${params.row.price} DZD`
        }
      },
    {
        field: 'description',
        headerName: 'Description',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        width: 250,
        valueGetter: (params) => {
          return `${params.row.recette.description}`
        }
      },
    {
      field: 'image',
      headerName: 'Image',
      type: 'autre',
      editable: false,
      add: true,
      edit: true,
      hide: true,
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
        deleteOne(params.row.recette.id)
      }}>
        { info.deleteIcon ? info.deleteIcon : <DeleteIcon />  }
      </div>
      </Box>)
          
      }
    }
  ];
  const addOne = (values,file) => {
    console.log(values)
    let formData = new FormData()
    formData.append(
      "image", file,
    );
    formData.append("idCategRecette",parseInt(values.category))
    formData.append("name",values.name)
    formData.append("description", values.description)
    formData.append("price", values.price)
    formData.append("idEntreprise", ctxt.user?.idEntreprise)
    axios.post('http://localhost:5000/drinks/add', formData).then((res) => {
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${values.name} a bien été ajouté`,
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
        axios.delete(`http://localhost:5000/drinks/delete/${id}`)
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
    axios.patch(`http://localhost:5000/drinks/edit/${values.id}`, values).then((res) => {
          if (res.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${values.recette?.name} a bien été mis a jour dans le distributeur `,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `${values.recette?.name} n'a pas été mis a jour`,
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
            title: `${values.recette?.name} n'a pas été mis a jour`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
  }
  return (
    <Layout>
    <Box sx={{ marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridDrinks 
      columns={columns}
      fetchUrl={`http://localhost:5000/drinks/entreprises/${ctxt.user?.idEntreprise}`}
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

export default Drinks