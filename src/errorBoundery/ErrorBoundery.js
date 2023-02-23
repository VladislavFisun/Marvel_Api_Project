import CharInfo from "../components/charInfo/CharInfo";
import { Component } from "react";

class ErrorBoundery extends Component{
    state={
        error:false
    }
    componentDidCatch(error,errorinfo){
        console.log(error,errorinfo)
        this.setState({
            error:true
        })
    }
    render(){
        if(this.state.error){
            return <h2>Fatal_Error</h2>
        }
        return this.props.children
    }
}
export default ErrorBoundery;