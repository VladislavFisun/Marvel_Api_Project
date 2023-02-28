import {useState,useEffect,useRef} from 'react'
import './randomChar.scss';
import Spinner from '../spinner/spinner';
import useMarvelService from '../services/MarvelService';
import mjolnir from '../../resources/img/mjolnir.png';
import ErrorMessage from '../errorMessage.js/errorMessage';

const RandomChar =(props)=> {
  const[char,setChar] = useState({})
  
   
    const  {error,loading,getCharacter} = useMarvelService();
     const onCharLoaded =(char)=>{
        setChar(char)
       
    
     }
     useEffect(()=>{
        updateChar()
     },[])
   
    
     const updateChar =()=>{
        
        const id = Math.floor(Math.random()*(1011400-1011000)+1011000)
        getCharacter(id)
       .then(onCharLoaded)
      
       
     }
   
    

    
  const spinner = loading?<Spinner/>:null;
  const errorMessage = error?<ErrorMessage/>:null;
  const activeBlock = !(loading||error)?<View char={char}/>:null


//   
    return (
        <div className="randomchar">
          {spinner}
          {errorMessage}
          {activeBlock}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={updateChar} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )

}

const View =({char})=>{
    const{name,description,thumbnail,homePage,wiki} = char
    let desc='';

 
    if(description){
      desc= description.slice(0,210)+'...'
    }
    
    else{
      desc = 'description not found';
    }
    let fitter='';
    thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'?fitter='contain':fitter='cover'
   let style={
    objectFit:fitter
   }

    return(
      <div>
         <div className="randomchar__block">
                <img src={thumbnail} style={style} alt="Random character" className="randomchar__img"/>
                <div className="randomchar__info">
                    <p className="randomchar__name">{name}</p>
                    <p className="randomchar__descr">
                       {desc}
                    </p>
                    <div className="randomchar__btns">
                        <a  href={homePage} className="button button__main" >
                            <div className="inner">homePage</div>
                        </a>
                        <a href={wiki} className="button button__secondary" >
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default RandomChar;