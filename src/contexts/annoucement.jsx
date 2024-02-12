import React, { createContext, useEffect, useState } from 'react';
import { Axios } from 'utils/axios';
const annoucementContext = createContext();
export default function AnnoucementContextProvider({ children }) {
  const [posts, setPosts] = useState();
  useEffect(() => {
    Axios.get('/announcement/admin')
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return <annoucementContext.Provider value={{posts,setPosts}}>{children}</annoucementContext.Provider>;
}
export {annoucementContext}