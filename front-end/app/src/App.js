import logo from './logo.svg';
import './App.css';
import NoticiasService from './services/NoticiasService';
import React from 'react';
import { useState, useEffect } from 'react';
import SearchInput from './components/SearchInput';
import NoticiaItem from './components/NoticiaItem';
function App() {
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultados, setResultados] = useState(0);

  useEffect(() => {
    async function loadNoticias() {
      setLoading(true);
      const noticias = await NoticiasService.getAll();
      console.log(noticias);
      setNoticias(noticias);
      setLoading(false);
      setResultados(noticias.length);
    }
    loadNoticias();
  }, []);

  const noticiasList = noticias.map(noticia => (
    <NoticiaItem noticia={noticia} />
  ));

  const callbackSearch = async (promiseNoticias) => {
      setLoading(true);
      await promiseNoticias.then(newNoticias => {
        let tempNoticias = [...noticias, ...newNoticias];
        setNoticias(tempNoticias);
        console.log(tempNoticias.length);
        setResultados(tempNoticias.length);
      });
      setLoading(false);
  };
  const searchInput = (<SearchInput classSearch="noticia-item" callbackSearch={callbackSearch} />);



  return (
    <div>
     
      <div className='center'>
        {searchInput}
      </div>
      <div id='loading' className={loading ? '' : 'hide'}>Extraindo mais informações...</div>
      <div >
        <div className='resultados'> Total de Resultados: {resultados}</div>
        {noticiasList}
      </div>
      
    </div>);
}

export default App;
