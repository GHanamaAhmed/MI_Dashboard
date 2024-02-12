import { Axios } from '../utils/axios';
import React from 'react';
const specialityContext = React.createContext();
export default function SpecialityContextProvider({ children }) {
  const [specialitys, setSpeciality] = React.useState({ faculte: [], departements: [], speciality: [] });

  React.useEffect(() => {
    Axios.get('/speciality')
      .then((res) => {
        setSpeciality(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return <specialityContext.Provider value={specialitys}>{children}</specialityContext.Provider>;
}
export { specialityContext };
