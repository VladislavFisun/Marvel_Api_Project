import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundery from "../../errorBoundery/ErrorBoundery";

import decoration from '../../resources/img/vision.png';

class App extends Component{
    state={
     index:null
    }
    getIndex=(id)=>{
        this.setState({index:id})
    }
 render(){
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList getIndex={this.getIndex}/>
                   <ErrorBoundery> 
                    <CharInfo index={this.state.index}/>
                    </ErrorBoundery>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )
 }
}

export default App;