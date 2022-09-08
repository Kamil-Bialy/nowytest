import { useContext } from 'react';
import { UserContext } from '../../store/user-context';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(UserContext);

  if (loggedIn) {
    return <Navigate to='/' replace />;
  }

  return children;
};

export default ProtectedRoute;
