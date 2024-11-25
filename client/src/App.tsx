import { RouterProvider } from 'react-router-dom'
import router from './routes'
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';

function App() {
  const [token, setToken] = useState<string>();
  useEffect(() => {
    const currentToken = Cookies.get("auth");
    if (currentToken)
      setToken(currentToken);
  }, []);
  console.log(token);
  return (
    <RouterProvider router={router} />
  )
}

export default App
