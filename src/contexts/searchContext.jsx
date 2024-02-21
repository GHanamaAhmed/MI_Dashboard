import React, { createContext, useState } from 'react';
const searchContext = createContext();
export default function SearchContextProvider({ children }) {
  const [search, setSearch] = useState("");
  return <searchContext.Provider value={{ search, setSearch }}>{children}</searchContext.Provider>;
}
export { searchContext };
