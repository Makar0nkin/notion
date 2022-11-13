import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useUserContext} from "../components/userContext";

const Register = () => {
  const navigate = useNavigate()
  const userContext = useUserContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')

  function handleRegister() {
    const createdUser = {
      createdAt: new Date().toISOString(),
      email: email.toString(),
      password: password.toString(),
    }
    if (password !== repeatPassword){
      alert("Password not the same!")
    }
    else{
      fetch("http://localhost:4000/users", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(createdUser),
      })
        .then(() => {
          userContext.setUser(createdUser)
          navigate("/")
        })
        .catch(() => {
          alert("Something goes wrong!")
        })
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  // useEffect(() => {
  //   console.log(email, password, repeatPassword)
  // }, [email, password, repeatPassword])

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value)
  }

  return (
    <div className="flex flex-col items-center">
      <input type="email" placeholder="email" onChange={handleEmail}/>
      <input type="password" placeholder="password" onChange={handlePassword}/>
      <input type="password" placeholder="repeat password" onChange={handleRepeatPassword}/>
      <button onClick={handleRegister}>
        register
      </button>
    </div>
  );
};

export default Register;