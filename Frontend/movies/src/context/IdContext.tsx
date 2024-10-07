import  { createContext, useState, ReactNode, useContext, useEffect } from 'react';

interface IdContextType {
  id: number | null;
  setId: React.Dispatch<React.SetStateAction<number | null>>;
} 

export const IdContext = createContext<IdContextType | undefined>(undefined);

export const IdProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<number | null>(null);

  const idLocalStorage = () => {
    if (id !== null) {
      localStorage.setItem('id', JSON.stringify(id)); // Convertendo id para string
    }
  };

  useEffect(() => {
    idLocalStorage()
  }, [id])

  return (
    <IdContext.Provider value={{ id, setId  }}>
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