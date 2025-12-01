import { useState, useCallback } from 'react';

export default function useBairroService() {

  const bairros = useCallback(async (formData) => {

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/bairros`,
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

  return { bairros };
}
