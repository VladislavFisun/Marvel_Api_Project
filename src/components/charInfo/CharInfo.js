import useMarvelService from '../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage.js/errorMessage';
import { useState,useEffect } from 'react';
import './charInfo.scss';



const CharInfo =(props)=> {
    const [char,setChar] = useState(null);

const {loading,error,getCharacter} = useMarvelService()



 useEffect(()=>{
    updateChar()
 },[props.index])

     const onCharLoaded =(char)=>{
        setChar(char)
     }

const updateChar=()=>{
   const {index} = props
   if(!index){
    return
   }
    getCharacter(index)
   .then(onCharLoaded)
   
}    
   

    const errorMessage= error? <ErrorMessage/>:null 
    const loadingMessage=loading? <Spinner/>:null 
    const charInfo = !(error||loading||!char )? <Block char={char}/>:null
    const skeleton = !(char||error||loading)?<Skeleton/>:null


    return (
        <div className="char__info">
           {charInfo}
           {errorMessage}
           {loadingMessage}
           {skeleton}
           
        </div>
    )
   
}
const Block=({char})=>{
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    let desc=''
    description?desc=description:desc="no description";
    let fitter='';
    thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'?fitter='contain':fitter='cover'
   let style={
    objectFit:fitter
   }
    return(
        <>
         <div className="char__basics">
                <img src={thumbnail} alt={name} style={style}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
               {desc}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length>0?null:'no comics'}
               {
               comics.map((item,i)=>{
                if(i>9){
                    return
                }
                return(

                 <li className="char__comics-item" key={i}>
                  {item.name}
             </li>
                )
               })}
            </ul>
        </>
    )
}
CharInfo.propTypes={
  index:PropTypes.number
}

export default CharInfo;