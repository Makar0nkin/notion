import React, {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {useUserContext} from "../components/userContext"

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const userContext = useUserContext()

  const handleSetEmail = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const handleSetPassword = useCallback((e) => {
    setPassword(e.target.value)
  }, [])

  const handleLogin = useCallback(() => {
    fetch(`http://localhost:4000/users?email=${email}&password=${password}`)
      .then(r => r.json())
      .then((users) => {
        if (users.length === 1) {
          // console.log(users)
          userContext.setUser(users[0])
          // navigate('/')
        } else {
          alert("User is invalid!")
        }
      })
  }, [email, password, userContext])

  useEffect(() => {
    if (userContext.user?.email){
      navigate('/')
    }
  }, [navigate, userContext.user])

  return (
    <div className="flex flex-col items-center gap-1">
      <input
        placeholder="email"
        type="email"
        value={email}
        onChange={handleSetEmail}
        //pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handleSetPassword}
      />
      <button
        onClick={handleLogin}
      >
        Log in
      </button>
      <Link to='/register'>
        Don`t have an account?
      </Link>
    </div>
  );
};

export default Login;