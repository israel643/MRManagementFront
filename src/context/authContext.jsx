//PRUEBA CON ENFOQUE EN JWT

// import React, { createContext, useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { fetchUserPermissions } from "../services/apiService";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [permissions, setPermissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const {userName} = useParams();
//   console.log(userName);

//   useEffect(() => {
    
//     const token = localStorage.getItem("authToken");

//     fetchUserPermissions(userName)
//     .then((data) => {
//       console.log(data);
//       setPermissions(data);
//     })
//     .catch((error) => console.error("error en solicitud " + error))
//     .finally(() => setLoading(false));

//     // if (token) {
//     //   fetchUserPermissions(token)
//     //     .then((data) => {
//     //       setPermissions(data);
//     //     })
//     //     .catch((error) => console.error(error))
//     //     .finally(() => setLoading(false));
//     // } else {
//     //   setLoading(false);
//     // }
//   }, [userName]);
  
//   return (
//     <AuthContext.Provider value={{ permissions, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


//PARA PRUEBAS EN URL

import React, { createContext, useState, useEffect } from "react";
import { fetchUserPermissions } from "../services/apiService";

// function useQuery() {
//   return new URLSearchParams(window.location.search);
// }

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  //const query = useQuery();
  const username = "Carlos Zepeda";//query.get('username');

  const pathnames = window.location.pathname.split('/');
  const pathUsername = pathnames[pathnames.length - 1];

  useEffect(() => {
    const userToFetch = username || pathUsername;

    if (userToFetch) {
      fetchUserPermissions(userToFetch)
        .then((data) => {
          setPermissions(data);
        })
        .catch((error) => console.error("Error en solicitud: ", error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [username, pathUsername]);
  
  return (
    <AuthContext.Provider value={{ permissions, loading }}>
      {children}
    </AuthContext.Provider>
  );
};