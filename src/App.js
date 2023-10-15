import React, { useState } from 'react';
import './index.scss';
import TagsList from "./TagsList";

function Collection({ name, images }) {
  return (
    <div className="collection">
      <img className="collection__big" src={images[0]} alt="Item" />
      <div className="collection__bottom">
        <img className="collection__mini" src={images[1]} alt="Item" />
        <img className="collection__mini" src={images[2]} alt="Item" />
        <img className="collection__mini" src={images[3]} alt="Item" />
      </div>
      <h4>{name}</h4>
    </div>
  );
}



function App() {
  const [photosColection, setPhotosColection] = useState([]);
  const [tagsColection, setTagsColection] = useState([]);
  const [activeTag, setActiveTag] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");


//Сделать обнуление страницы при выборе другого тега.
  React.useEffect(() => {
    fetch(`https://652278fbf43b1793841488d0.mockapi.io/photos-colecton?page=${page}&limit=12${activeTag === 0 ? "" : `&category=${activeTag}`}`)
      .then(res => res.json())
      .then(json => setPhotosColection(json))
      .catch(err => alert("Ошибка в получении данных с сервера"));
  }, [page, activeTag])

  React.useEffect(() => {
    fetch("https://652278fbf43b1793841488d0.mockapi.io/tegs")
      .then(res => res.json())
      .then(json => setTagsColection(json))
      .catch(err => alert("Ошибка в получении данных с сервера"));
  }, [])



  const searchedPhotos = React.useMemo(() => {
    return searchValue === "" ?
    photosColection
    :
    [...photosColection].filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
  }, [searchValue, photosColection])


  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <TagsList tagsList={tagsColection} activeTag={activeTag} setActiveTag={setActiveTag}/>
        <input className="search-input" placeholder="Поиск по названию" value={searchValue} onChange={(event) => setSearchValue(event.currentTarget.value)}/>
      </div>
      {photosColection.length === 0 ? 
      <h2>Идёт загрузка...</h2>
      :
      <div className="content">
        {searchedPhotos.map((item, index) => (
          <Collection key={index} name={item.name} images={item.photos}/>
        ))}
        
      </div>
      }
      <ul className="pagination">
        <li onClick={() => page > 1 ? setPage(page - 1) : 0}>{"<"}</li>
        {photosColection.length === 0 ? 
        ""
        :
        <li onClick={() => setPage(page + 1)}>{">"}</li>
          }
        
      </ul>
    </div>
  );
}

export default App;
