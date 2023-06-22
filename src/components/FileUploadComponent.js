import React, { useState } from 'react'
import {  Grid, Box, Typography,Button } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';




const FileUploadComponent = ({ onUpload }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (event) => {
    const fileList = event.target.files
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0]
      setFile(selectedFile)
      onUpload(selectedFile)
    }
  }
  const savePhoto = () => {

  }
  return (
    <Box sx={{ width:"100%", display:"flex",gap:"20px", alignItems:"center", justifyContent:"space-between", background:"#fff",borderRadius:"20px", padding:"30px 50px"}}>
        <Grid container direction="column" alignItems="center" sx={{ position:"relative", maxWidth:"100%"}}>
         <label htmlFor="image-upload">
            <input
            accept="image/*"
            id="image-upload"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            />
            { !file && <Box>
            <Box sx={{ padding:"10px", borderRadius:"50px", cursor:"pointer", background:"#E4E6EB", width:"fit-content", margin:"0 auto 10px"}}>
                <img src="/assets/profil.png" alt="image svg" />
            </Box>
                <Typography>Ajouter une photo</Typography> 
                <Typography sx={{ color:"#757575", fontSize:"0.8rem"}}>1000 px par 1000 px </Typography>
            </Box>}
            {file && <Box sx={{ position:"absolute",top:"20px", right:"20px", background:"#fff", borderRadius:"50%", cursor:"pointer" }}>
                <CachedIcon />
            </Box>}
        </label>
      {file && (
        <Grid item>
            <Box>
            <Box sx={{ maxWidth:"100%"}} >
                <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                style={{ width:"100%", maxHeight:"200px"}}
            />
            
            </Box>
            
            </Box>
        </Grid>
      )}
      
    </Grid>
    <Button variant='contained' background="primary" sx={{height:50,minWidth:"200px"}} onClick={() => {
                      savePhoto()
                    }}>Save changes</Button>
    </Box>
  )
}

export default FileUploadComponent
