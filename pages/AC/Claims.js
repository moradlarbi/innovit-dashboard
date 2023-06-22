import {useState} from 'react'
import axios from 'axios'
import { Visibility, Reply } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import {Box} from '@mui/material';
import Swal from "sweetalert2"
import DataGridClaims from '../../src/components/DataGrids/DataGridClaims'
import Layout from '../../src/components/Layout'
const Claims = () => {
  const [refresh, setrefresh] = useState(false)
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [item, setItem] = useState({});
  
  const propsDialog = {
    openUpdate: open,
    setOpenUpdate: setOpen,
    openReply: open2,
    setOpenReply: setOpen2,
    item: item,
    setItem: setItem,
  }
  const info = {
    title: "List claims",
    description: "View and replay to the claims",
    DialogTitle: 'View the claim',
    DialogUpdate: "Reply to the claim",
  }
  const propsInfo = {
    add: true,
    delete: true,
    edit: true
  }
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'date',
        headerName: 'Claim Date',
        type: 'string',
        editable: false,
        add: true,
        edit: true,
        width: 150,
      },
    {
      field: 'Email',
      headerName: 'Customer',
      type: 'string',
      editable: false,
      add: true,
      edit: true,
      width: 150,
    },
    {
        field: 'message',
        headerName: 'Claim object',
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
        <Visibility />
      </div>
      <div style={{"cursor":"pointer"}} onClick={() => {
        setItem(params.row)
        setOpen2(true);
      }}>
        <Reply />
      </div>
      </Box>)
          
      }
    }
  ];
  const reply = (values,idClaim) => {
    console.log(values)
    axios.post('', values).then((res) => {
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
  
  const updateOne = (values) => {
    axios.post(`https://innovit-2cs-project.onrender.com/dashboard/send-email`, values).then((res) => {
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: `Votre réponse a bien été envoyée`,
              showConfirmButton: false,
              timer: 1500,
            });
            setrefresh(!refresh)
          }
           else {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: `Une erreure est survenue lors de l'envoie`,
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
            title: `Une erreure est survenue lors de l'envoie`,
            showConfirmButton: false,
            timer: 1500,
          });
        })
  }
  return (
    <Layout>
    <Box sx={{ marginRight:"15px", padding: "15px 10px", borderRadius:"15px"}}>
      <DataGridClaims 
      columns={columns}
      fetchUrl="https://innovit-2cs-project.onrender.com/dashboard/claims/3"
      addFunction={reply}
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

export default Claims