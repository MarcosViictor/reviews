import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Movie } from '../Types/Movie';

interface SearchContextType {
    searchResult: Movie[];
    setSearchResult: React.Dispatch<React.SetStateAction<Movie[]>>
}

export const SearchContext = createContext<SearchContextType | null> (null);

export const SearchProvider = ({children} : {children : ReactNode }) => {
    const [searchResult, setSearchResult] = useState<Movie[]>([]);

    return (
        <SearchContext.Provider value={{searchResult, setSearchResult}}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(SearchContext);

    if(!context) {
        throw new Error ('useSearch deve ser usado com o SearchProvider');
    }

    return context;
}