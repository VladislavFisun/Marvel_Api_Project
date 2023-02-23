import MarvelService from '../services/MarvelService';
import PropTypes from 'prop-types';
import Spinner from '../spinner/spinner';
import Skeleton from '../skeleton/Skeleton'
import ErrorMessage from '../errorMessage.js/errorMessage';
import { Component } from 'react';
import './charInfo.scss';
import thor from '../../resources/img/thor.jpeg';

class CharInfo extends Component {
state={
char: null,
loading:false,
error:false
}
marvelService = new MarvelService()

componentDidMount(){
    this.updateChar()
}
componentDidUpdate(prevProps){
    if(this.props.index!==prevProps.index){
        this.updateChar()
    }
}
componentDidCatch(err,info){
    console.log(err,info);
    this.setState({
        error:true
    })
}
onError=()=>{
    this.setState({
        loading:false,
        error:true
    })
     }
 
 
     onCharLoaded =(char)=>{
        this.setState({char:char,loading:false})
     }

updateChar=()=>{
   const {index} = this.props
   if(!index){
    return
   }
   this.onCharLoading()
   this.marvelService
   .getCharacter(index)
   .then(this.onCharLoaded)
   .catch(this.onError)
}
onCharLoading=()=>{
    this.setState({
        loading:true
    })
 }

    
   render(){
    const {char,loading,error} = this.state
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