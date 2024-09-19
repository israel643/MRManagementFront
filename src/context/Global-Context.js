import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [state, setState] = useState({
      user: null, // Ejemplo: puedes almacenar datos de usuario aquí
      theme: 'light', // Ejemplo: puedes manejar temas (light/dark)
    });
  
    // 3. Funciones para actualizar el estado
    const loginUser = (user) => {
      setState((prevState) => ({
        ...prevState,
        user: user,
      }));
    };
  
    const toggleTheme = () => {
      setState((prevState) => ({
        ...prevState,
        theme: prevState.theme === 'light' ? 'dark' : 'light',
      }));
    };
    
    return (
        <>
            <GlobalContext.Provider value={{ state, loginUser, toggleTheme }}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}