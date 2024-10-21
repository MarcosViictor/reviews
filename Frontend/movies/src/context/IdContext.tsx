import  { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface IdContextType {
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  idGenre: number | null;
  setIdGenre: React.Dispatch<React.SetStateAction<number | null>>;
} 

export const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
    const [id, setId] = useState<number | null>(() => {
    const savedId = localStorage.getItem('id');
    return savedId ? JSON.parse(savedId) : null; // Verifica se há um valor salvo no LS
  });

  const [idGenre, setIdGenre] = useState<number | null>(() => {
    const savedIdGenre = localStorage.getItem('idGenre');
    return savedIdGenre ? JSON.parse(savedIdGenre) : null;
  });

  // Função para salvar os id no localStorage
  const idLocalStorage = () => {
    if (id !== null) {
      localStorage.setItem('id', JSON.stringify(id)); // Salva o id se não for nulo
    }
    if (idGenre !== null) {
      localStorage.setItem('idGenre', JSON.stringify(idGenre)); // Salva o idGenre se não for nulo
    }
  };

  useEffect(() => {
    idLocalStorage(); // Atualiza o localStorage sempre que id ou idGenre mudar
  }, [id, idGenre]);

  return (
    <IdContext.Provider value={{ id, setId, idGenre, setIdGenre }}>
      {children}
    </IdContext.Provider>
  );
};

export const useGetId = (): IdContextType => {
  const context = useContext(IdContext);

  if (!context) {
    throw new Error('useGetId must be used within a IdProvider');
  }

  return context;
};
