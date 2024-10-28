import { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface IdContextType {
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
  idGenre: number | null;
  setIdGenre: React.Dispatch<React.SetStateAction<number | null>>;
  idComment: number | null;
  setIdComment: React.Dispatch<React.SetStateAction<number | null>>;
} 

export const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<number | null>(() => {
    const savedId = localStorage.getItem('id');
    return savedId && savedId !== "undefined" ? JSON.parse(savedId) : null;
  });

  const [idGenre, setIdGenre] = useState<number | null>(() => {
    const savedIdGenre = localStorage.getItem('idGenre');
    return savedIdGenre && savedIdGenre !== "undefined" ? JSON.parse(savedIdGenre) : null;
  });

  const [idComment, setIdComment] = useState<number | null>(() => {
    const savedIdComment = localStorage.getItem('idComment');
    return savedIdComment && savedIdComment !== "undefined" ? JSON.parse(savedIdComment) : null;
  });

  // Função para salvar os IDs no localStorage
  const idLocalStorage = () => {
    if (id !== null) {
      localStorage.setItem('id', JSON.stringify(id));
    }
    if (idGenre !== null) {
      localStorage.setItem('idGenre', JSON.stringify(idGenre)); 
    }
    if (idComment !== null) {
      localStorage.setItem('idComment', JSON.stringify(idComment));
    }
  };

  useEffect(() => {
    idLocalStorage();
  }, [id, idGenre, idComment]);

  return (
    <IdContext.Provider value={{ id, setId, idGenre, setIdGenre, idComment, setIdComment }}>
      {children}
    </IdContext.Provider>
  );
};

export const useGetId = (): IdContextType => {
  const context = useContext(IdContext);

  if (!context) {
    throw new Error('useGetId must be used within an IdProvider');
  }

  return context;
};
