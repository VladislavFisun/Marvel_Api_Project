import './charList.scss';
import PropTypes from 'prop-types';
import MarvelService from '../services/MarvelService';
import abyss from '../../resources/img/abyss.jpg';
import {Component} from 'react'

class CharList extends Component {
    constructor(props){
      super(props)
      
    }
    state={
        data:[],
        newItemLoading:false,
        offset:1541,
        charEnded:false
    }
    allCharacters = new MarvelService()
    
    componentDidMount(){
      this.updateAllCharacters()
    }
    updateAllCharacters=(offset)=>{
        this.onCharListLoading()
        this.allCharacters
        .getAllCharacters(offset)
        .then(this.uploadAllCharecters)
    }
    onCharListLoading=()=>{
        this.setState({
            newItemLoading:true
        })
    }
    uploadAllCharecters=(res)=>{
        let ended =false
    if(res.length<9){
       ended=true
    }
    this.setState(({data,offset})=>({
        data:[...data,...res],
        offset: offset+9,
        newItemLoading:false,
        charEnded:ended,
        
      }))
    }
    // onScrollUpload =(e)=>{
    //     if(e.target.scrollHeight===e.target.scrollTop+e.target.clientHeight){
    //       this.updateAllCharacters()
    //     }
    // }
   
     newCharacter=(data)=>{
       const items = data.map(item=>{
        let stylish=''
        item.thumbnail==='http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'?stylish='contain':stylish='cover'
        let style={
            objectFit:stylish
        }
        if(item.name.length>28){

            item.name = item.name.slice(0,28)+'...'
        }
           return(
            <li className="char__item"
            key={item.id}
            onClick={()=>this.props.getIndex(item.id)}
            >
            <img src={item.thumbnail} alt="abyss" style={style}/>
            <div className="char__name">{item.name}</div>
        </li>
           )
       })
       return(
        <ul className="char__grid">
        {items}  
       </ul>
       )
     }
    
render(){
    const{data,offset,newItemLoading,charEnded}=this.state
 
 

    return (
        <div  className="char__list">
               {this.newCharacter(data)}
            <button
            disabled={newItemLoading}
           style={{'display':charEnded?'none':'block'}}
            onClick={()=>{this.updateAllCharacters(offset)}}
            className="button button__main button__long">
                <div 
                className="inner">load more</div>
            </button>
        </div>
    )
}
}
CharList.propTypes={
    getIndex:PropTypes.func,
}
export default CharList;