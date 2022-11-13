import {Navigate} from 'react-router-dom'
import {useUserContext} from "./userContext";

const ProtectedRoute = ({children}) => {
  const {user} = useUserContext()
  if (!user.email){
    return <Navigate to="/login"/>
  }
  return children
};

export default ProtectedRoute;