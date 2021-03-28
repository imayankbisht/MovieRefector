import React, { createContext, useState, useEffect } from 'react';
import { searchApi, searchByID } from '../api/searchApi';

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movieID, setMovieID] = useState('');
  const [movieResult, setMovieResult] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState({});
  const [searchMovie, setSearchMovie] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState(true);

  useEffect(() => {
    const onchangeItem = () => {
      const result = searchApi(searchTerm);
      result
        .then((res) => {
          if (res.data.Search === undefined) {
            setLoading(true);
          }
          setMovieResult(res.data.Search);
        })
        .catch((e) => console.log(e));
    };
    onchangeItem();
  }, [searchTerm]);

  const handleDetails = async (movieID) => {
    setMovieID(movieID);
    setShow(false);
    const result = await searchByID(movieID);
    console.log(result.data);
    setSelectedMovie(result.data);
  };

  // console.log(searchTerm);
  // console.log(movieResult);
  // console.log(searchMovie);
  console.log(mode);

  return (
    <GlobalContext.Provider
      value={{
        setSearchTerm,
        movieResult,
        searchMovie,
        setSearchMovie,
        searchTerm,
        handleDetails,
        selectedMovie,
        setLoading,
        loading,
        show,
        setShow,
        setMode,
        mode
      }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
