import React, {Component} from 'react';
import '../App.css'

export default class HelpModal extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            showHelp: false,
        }
    }

    showHelp = () =>{
        this.setState({
            showHelp:true
        })
    }
    hideHelp = () =>{
        this.setState({
            showHelp:false
        })
    }

    render(){
        return(
            <div className={this.state.showHelp ? "Help-modal" : "App-hide"}>
                <div className="App-modal-content2">
                    <span className="App-close" onClick={this.hideHelp}>&times;</span><br></br>
                    <p>For any issues please contact Help Desk</p>
                </div>
            </div>
        )
    }
}