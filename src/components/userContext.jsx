import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';

const UserContext = createContext({
  user: {},
  setUser: () => {},
})

export const useUserContext = () => {
  return useContext(UserContext)
}

const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(() => {
    try{
      //console.log("email state:\t", user)
      return JSON.parse(
        localStorage.getItem("user")
      )
    }
    catch(e){
      //console.error(e)
      return ''
    }
  })

  const handleSetUser = useCallback((user) => {
    const userString= JSON.stringify(user)
    localStorage.setItem('user', userString)
    setUser(user)
    //console.log("handleSetUser:\t", user.email, email)
  }, [])

  const value = useMemo(
    () => ({user, setUser: handleSetUser}),
    [user, handleSetUser]
  )

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;