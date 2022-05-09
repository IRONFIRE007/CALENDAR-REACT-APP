import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {

 const dispatch =   useDispatch();

const [ formLoginValues, handleLoginInputChange] = useForm( { lEmail : 'test1@gmail.com',lPassword : '123456'});

const [ formRegisterValues, handleRegisterInputChange] = useForm( {rName:'Luis Andres', rEmail : 'test5@gmail.com',rPassword1: '123456',rPassword2:'123456'});

const {lEmail,lPassword} = formLoginValues;

const {rName,rEmail,rPassword1,rPassword2} = formRegisterValues;

 const [form, setForm] = useState(false);

 const handleForm=()=> {
   setForm(!form)
 }


 const handleLogin = (e)=> {
    e.preventDefault();

     dispatch(startLogin(lEmail,lPassword));

 }

 const handleRegister = (e)=> {
   e.preventDefault();

   if(rPassword1 !== rPassword2){
     return Swal.fire('Error','password dont match','error')
   }
  console.log('!!!!!')
   dispatch(startRegister(rEmail,rPassword1,rName));
 }

  return (

    <div className={form ? "body active" :"body" }>
    <div className="conteiner">

    <div className="blueBg">
    <div className="box signin "id="c">
   <h2>Already Have an Account</h2>
   <button  onClick={handleForm} className="signinBtn">Sign in</button>
   </div>
   <div className="box signup">
    <h2>Don't Have an Account</h2>
    <button  onClick={handleForm} className="signupBtn">Sign up</button>
   </div>
  </div>





  <div className={form ? "formBx active" :"formBx" }> 
     <div className="form signinForm">
        <form onSubmit={handleLogin} >
             <h3>Sing In</h3>
               <input type="text" placeholder="Email" name="lEmail" value={lEmail} onChange={handleLoginInputChange}/>
               <input type="password" placeholder="Password" name="lPassword" value={lPassword} onChange={handleLoginInputChange}/>
               <input type="submit" value="login"/> 
        </form>
     </div>
     <div className="form signupForm">
        <form onSubmit={handleRegister} >
             <h3>Sing up</h3>
               <input type="text" placeholder="username"  name="rName" value={rName}  onChange={handleRegisterInputChange}/>
               <input type="email" placeholder="Email Address" name="rEmail" value={rEmail} onChange={handleRegisterInputChange}/> 
               <input type="password" placeholder="Password" name="rPassword1" value={rPassword1} onChange={handleRegisterInputChange}/>
               <input type="password" placeholder="Comfirm Password" name="rPassword2" value={rPassword2} onChange={handleRegisterInputChange}/>
               <input type="submit" value="Register"/>  
             
        </form>
     </div>
 </div>


















   </div>

</div>
  );
};
