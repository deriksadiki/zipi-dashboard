import React from 'react';

export default class SendMsg extends React.Component{

    constructor(){
        super()
        this.state = {
            showModal : false, 
            subject : '',
            message : ''
        }
    }

    sendMessage = () =>{
        var url = `https://us-central1-zipi-app.cloudfunctions.net/messageDrivers?subject=${this.state.subject}&msg=${this.state.message}`;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.setRequestHeader('orin', 'zipi.co.za');
        xhr.onreadystatechange = () => {
                alert('sent')
        }
        xhr.send();
    }

    show  = () =>{
        this.setState({
            showModal : true
        })
    }


    hide = () =>{
        this.setState({
            showModal : false
        })
    }

    render(){
        return(
            <div className={this.state.showModal ? "App-modal" : "App-hide"}>
            <div className="App-modal-content2"> 
            <span className="App-close" onClick={this.hide}>&times;</span><br></br>
            <div style={{textAlign:'center'}}>
                <br></br>
                <input  className="inputStyle" value={this.state.subject} onChange={(text)=>{this.setState({subject: text.target.value})}} type="text" placeholder="Subject" /><br></br><br></br>
                <input  className="inputStyle" value={this.state.message} onChange={(text)=>{this.setState({message: text.target.value})}} type="text" placeholder="Message" /><br></br><br></br>
                <button className="App-button" onClick={this.sendMessage} >Send Message</button>
            </div>
          </div>
        </div> 
        )
    }
}