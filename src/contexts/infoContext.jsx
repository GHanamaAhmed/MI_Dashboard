import { Axios } from '../utils/axios';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
const infoContext = React.createContext();
export default function InfoContextProvider({ children }) {
  const [info, setInfo] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [auth, setAuth] = React.useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    Axios.get('/admin')
      .then((res) => {
        setAuth(true);
        setInfo(res.data);
      })
      .catch((err) => {
        setAuth(false);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    if (!loading) {
      if (!RegExp('/auth*').test(pathname)) {
        if (!auth) {
          window.location.href = '/auth/login';
        }
      }
    }
  }, [pathname, loading, auth]);
  return <infoContext.Provider value={{ info, loading, auth }}>{children}</infoContext.Provider>;
}
export { infoContext };
