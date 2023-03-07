import './comicsList.scss';
import useMarvelService from '../services/MarvelService';
import { useState,useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useActionData } from 'react-router-dom';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage.js/errorMessage';



const ComicsList = () => {
    
    const[data,setData] = useState([])
    const[offset,setOffset] = useState(210)
    const [newItemLoading, setnewItemLoading] = useState(false)
    const{error,loading,getAllComics,clearError} = useMarvelService()

    useEffect(()=>{
        setInterval(getComicsByClick(offset,true),60000)
    },[])
    // useEffect(()=>{
    //     setInterval(window.addEventListener('scroll',()=>{
    //         if((window.innerHeight + window.scrollY) === document.body.offsetHeight){
    //             getComicsByClick(offset)
    //         }
    //     }),100)
    
    // },[offset])

    const getComicsByClick=(offset,initial)=>{
        clearError()
        initial?setnewItemLoading(false):setnewItemLoading(true)
        getAllComics(offset)
        .then(uploadComics)
    }
    
    const uploadComics=(res)=>{
    setOffset(offset=>offset+8)
      setData(data=>[...data,...res])
      setnewItemLoading(false)
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
 const loaded = loading&&!newItemLoading?<Spinner/>:null
 const errorMessage = error?<ErrorMessage/>:null
 const comicsArr = getNewComics(data)
 const content =<ComicsContent comicsArr={comicsArr} offset={offset} loading={loading} getComicsByClick={getComicsByClick}/>
    
 return (
 <>
 {loaded}
 {errorMessage}
 {content}
 </>
    )
}

const ComicsContent=({comicsArr,loading,getComicsByClick,offset})=>{
    return(
        <div className="comics__list">
        <ul className="comics__grid">
         {comicsArr}
        </ul>
        <button disabled={loading} onClick={()=>{getComicsByClick(offset)}} className="button button__main button__long">
            <div className="inner">load more</div>
        </button>
    </div>
    )
}

export default ComicsList;