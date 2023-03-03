import './comicsList.scss';
import useMarvelService from '../services/MarvelService';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useActionData } from 'react-router-dom';


const ComicsList = () => {
    
    const[data,setData] = useState([])
    const[offset,setOffset] = useState(210)
    const{error,loading,getAllComics} = useMarvelService()

    useEffect(()=>{
        setInterval(getComicsByClick(),60000)
    },[])
    // useEffect(()=>{
    //     setInterval(window.addEventListener('scroll',()=>{
    //         if((window.innerHeight + window.scrollY) === document.body.offsetHeight){
    //             getComicsByClick(offset)
    //         }
    //     }),100)
    
    // },[offset])

    const getComicsByClick=(offset)=>{
        getAllComics(offset)
        .then(uploadComics)
    }
    
    const uploadComics=(res)=>{
    setOffset(offset=>offset+8)
      setData(data=>[...data,...res])
    }
  

 const getNewComics =(item)=>{
  
   const items= item.map((item,i)=>{
    if(!item.title){
        item.title='нет ифнормации'
    }
    if(!item.price){
        item.price='нет в наличии'
    }
        return(
            <li className="comics__item"
            key={item.id}
            >
            <NavLink end to={`/comics/${item.id}`} target="_self">
                <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                <div className="comics__item-name">{item.title}</div>
                <div className="comics__item-price">{item.price}</div>
            </NavLink>
        </li>
        )
    })
    return items
 }
 const comicsArr = getNewComics(data)
    return (
        <div className="comics__list">
            <ul className="comics__grid">
             {comicsArr}
            </ul>
            <button onClick={getComicsByClick} className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;