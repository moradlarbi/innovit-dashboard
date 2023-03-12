import Sidebar from "./Sidebar";
import Header from "./Header"
import { useContext, useEffect, useState } from "react";
import AppContext from "../../lib/AppContext";
import { useRouter } from "next/router";
// import AppContext from "../lib/AppContext";
import Loading from "./Loading";
export default function Layout({ children }) {
  const value = useContext(AppContext);
  const [loading, setloading] = useState(false);
  let { setUser } = value;
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
    <div className="flex flex-col" style={{ minHeight: "100vh" }}>
      <Header className=" flex-1" />
      <div className="flex-auto flex w-full flex-col md:flex-row bg-dark gap-5 md:gap-20 py-8 md:py-16 px-4 md:px-12">
        <Sidebar />
        <main className="flex-auto">{children}</main>
      </div>
    </div>
  );
}
