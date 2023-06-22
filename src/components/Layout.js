import Sidebar from "./Sidebar";
import Header from "./Header"
import { useContext, useEffect, useState } from "react";
import AppContext from "../../lib/AppContext";
import { useRouter } from "next/router";
import {Box} from '@mui/material';

import Loading from "./Loading";
export default function Layout({ children }) {
  const [loading, setloading] = useState(false);
  const route = useRouter();
  useEffect(() => {
    // setloading(true);
    // axios
    //   .get("/api/auth/isAuthenticated", {
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     if (res.status === 200) {
    //       setUser(res.data.data[0]);
    //       console.log(res.data.data[0]);
    //       if (res.data.data.isAdmin) {
    //         route.push("/Admin");
    //       } else {
    //         setloading(false);
    //       }
    //     } else {
    //       route.push("/Login");
    //     }
    //   })
    //   .catch((err) => {
    //     route.push("/Login");
    //     console.log(err);
    //   });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    
    <div style={{ minHeight: "100vh",maxHeight:"100vh",overflow:"hidden",position:"relative" }}>
      
      <Box sx={{display:"flex", width:"100%", height:"100%"}}>
        <Sidebar />
        <Box sx={{flex:"auto", overflowY:"auto"}}>
          <Header className=" flex-1" />
          <main style={{flex:"auto", height:"100%"}}>{children}</main>
        </Box>
        
      </Box>
      
    </div>
  );
}
