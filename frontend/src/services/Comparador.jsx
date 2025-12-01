import { useState, useCallback } from 'react';

export default function useComparadorService() {
  const [loading, setLoading] = useState(false);

  const comparar = useCallback(async (formData) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/comparar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.log("Novo resultado:", data.body);
        return data.body;
      } else {
        console.error("Erro na API:", data);
        return data;
      }

    } catch (error) {
      console.error("Erro de requisição:", error);
      return null;

    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, comparar };
}
