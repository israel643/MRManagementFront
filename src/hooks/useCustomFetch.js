import { useState, useEffect } from "react";

export const useCustomFetch = (serviceFunction, args) => {
  const [data, setData] = useState(null); // Cambiar inicialización a `null` para evitar errores de mapeo
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar que serviceFunction y args no sean nulos o indefinidos
    if (!serviceFunction || !args) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const [result] = await serviceFunction(...args); // Ejecutar la función de servicio con los argumentos
        setData(result); // Guardar el resultado
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError(error.message || "Error desconocido");
      } finally {
        setLoading(false); // Asegurar que `loading` se actualice correctamente
      }
    };

    fetchData();
  }, [serviceFunction, JSON.stringify(args)]); // Memorizar `args` serializándolo como string

  return { data, loading, error }; // Devolver también `loading` y `error`
};

export default useCustomFetch;
