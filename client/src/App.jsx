// import { startRegistration, startAuthentication } from "@simplewebauthn/browser";

import Home from "./components/UI/home";
import Container from "./containers/Container"
// import axios from "axios"
function App() {


  // const registerAuthn = async () => {
  //   const options = 
  //   await axios.get("/register-challenge", { credentials: "include" }).then(r => r.data)
 
  //   const attResp = await startRegistration(options);

  //   try {
  //       await axios.post("/register-response", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(attResp),
  //     // body: attResp,
      
  //   });
  //   alert("Đăng ký vân tay thành công!");
  //   } catch (error) {
  //       console.log("error register-res",error.message);
  //       alert("Đăng ký vân tay O thành công!")
  //   }
  
  // };

  // const loginAuthn = async () => {
  //   const options = await axios.get("/login-challenge", { credentials: "include" }).then(r => r.json());
  //   const asseResp = await startAuthentication(options);
  //   const result = await axios.post("/login-response", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     credentials: "include",
  //     body: JSON.stringify(asseResp),
  //   }).then(r => r.json());
  //   alert(result.verified ? "Đăng nhập thành công!" : "Đăng nhập thất bại");
  // };

  return (
    <div className="mx-auto text-center mt-28 text-gray-600">
          <Container children={<Home/>}/>
    </div>
  );
}

export default App;
