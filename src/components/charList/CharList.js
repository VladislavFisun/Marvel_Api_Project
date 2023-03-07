import './charList.scss';
import { CSSTransition,TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import useMarvelService from '../services/MarvelService';
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import abyss from '../../resources/img/abyss.jpg';
import {useState,useEffect,useRef} from 'react'
import Spinner from '../spinner/spinner';


const CharList  =(props)=>{
    const[data,setData] = useState([])
    const [newItemLoading,setNewItemLoading] = useState(false);
    const[,offset,setOffset] = useState(210);
    const[charEnded,setCharEnded] = useState(false)
    
    const {error,loading,getAllCharacters,getCharacterByName} = useMarvelService()
    
    useEffect(()=>{
        getCharacterByName()
        .then(res=>console.log(res))
    },[])
    useEffect(()=>{
        updateAllCharacters()
    },[])
 
    const updateAllCharacters=(offset)=>{
        
        getAllCharacters(offset)
        .then(uploadAllCharecters)
    }
   const onCharListLoading=()=>{
      setNewItemLoading(true);
    }
    const uploadAllCharecters=(res)=>{
        let ended =false
    if(res.length<9){
       ended=true
    }
      setData(data=>[...data,...res])
      setOffset(offset=>offset+9);
      setNewItemLoading(false);
      setCharEnded(ended)

    }
    // onScrollUpload =(e)=>{
    //     if(e.target.scrollHeight===e.target.scrollTop+e.target.clientHeight){
    //       this.updateAllCharacters()
    //     }
    // }
    const refArr = useRef([])

    console.log(refArr)
  
    const refItemEffect=(id)=>{
        refArr.current.forEach(item=>item.classList.remove('char__item_selected'))
        refArr.current[id].classList.add('char__item_selected');
        
    }
   
     const newCharacter=(data)=>{
       const items = data.map((item,i)=>{
        let stylish=''
        item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'?stylish='contain':stylish='cover'
        let style={
            objectFit:stylish
        }
        if(item.name.length>28){

            item.name = item.name.slice(0,28)+'...'
        }
           return(
      <CSSTransition key={item.id} timeout={300} classNames='char'>
                <li className="char__item"
                ref={(el)=>refArr.current[i]=el}
                key={item.id}
                onClick={()=>{props.getIndex(item.id)
                          refItemEffect(i)}
                }
                >
                <img src={item.thumbnail} alt="abyss" style={style}/>
                <div className="char__name">{item.name}</div>
            </li>
      </CSSTransition>
           )
       })
       return(
   
<ul className="char__grid">
       <TransitionGroup component={null}>
       {items}  
       </TransitionGroup>
       </ul>
    
       )
     }
    

    return (
  
        <div  className="char__list">
            {loading?<Spinner/>:null}
               {newCharacter(data)}
            <button
            disabled={newItemLoading}
           style={{'display':charEnded?'none':'block'}}
            onClick={()=>{updateAllCharacters(offset)}}
            className="button button__main button__long">
                <div 
                className="inner">load more</div>
            </button>
     
        </div>
        
    )

}
CharList.propTypes={
    getIndex:PropTypes.func,
}
export default CharList;