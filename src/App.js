import React, {Component} from 'react';
import graph from './images/newLine.png'
import line from './images/line.jpg'
import loader from './images/loader.jpg'
import area_graph from './images/area_graph.png'
import pie from './images/pie.jpg';
import lastLine from './images/lastLine.png'
import './App.css';
import firebase from './firebaseConfig'

class  App  extends Component {
  constructor(props){
    super()
    this.state = {
      active: true,
      stats: false,
      drivers: true,
      bikes: false,
      trucks:false,
      bakkies: false,
      settings:false,
      help: false,
      driversArr: [],
      driverKeys: [],
      usersKeys: [],
      usersArr: [],
      DeliveriesArr: [],
      DeliveriesKeys: 0,
      menu: false,
      height : props.height
    };
  }

  componentDidMount(){
    if (window.innerWidth > 800){
      this.setState({menu:true})
    }
    this.getDrivers();
    this.getDeliveries();
    this.getAppUsers();
  }

  getDrivers(){
    firebase.database().ref('drivers/').on('value', drivers =>{
      if (drivers.val() != null || drivers.val() != undefined){
        var details = drivers.val();
        var keys =  Object.keys(details);
        this.setState({
          driverKeys: keys,
          driversArr: details
        })
      }
    })
  }

  getAppUsers(){
    firebase.database().ref('users/').on('value', users =>{
      if (users.val() != null || users.val() != undefined){
      var details =  users.val();
      var keys = Object.keys(details);
      this.setState({
        usersKeys: keys,
        usersArr: details,
        })
      }
    })
  }

  getDeliveries(){
    firebase.database().ref('completedDeliveries/').on('value', deliveries =>{
      if (deliveries.val() != null || deliveries.val() != undefined){
        var details = deliveries.val();
        var keys = Object.keys(details);
        var tempKeys = 0
        for (var x = 0; x < keys.length; x++){
          firebase.database().ref('completedDeliveries/' + keys[x]).on('value', data =>{
            var innerData =  data.val();
            var innerKeys = Object.keys(innerData)
            tempKeys += innerKeys.length;
          })
        }
       this.setState({
         DeliveriesKeys: tempKeys
       })
      }
    })
  }

  showStats = () =>{
    this.shownav()
    this.setState({active:"App-active", stats: true,drivers:false,bikes: false,trucks:false,settings:false,bakkies: false})
  } 

  showDrivers = () =>{
    this.shownav()
    this.setState({active:"App-active", drivers: true, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
  }

  showBikes = () =>{
    this.shownav()
    this.setState({active:"App-active", drivers: false, stats:false,bikes: true,trucks:false,settings:false,bakkies: false})
  }

  showBakies = () =>{
    this.shownav()
    this.setState({active:"App-active", drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: true})
  }

  showTrucks = () =>{
    this.shownav()
    this.setState({active:"App-active", drivers: false, stats:false,bikes: false,trucks:true,settings:false,bakkies: false})
  }

  showSettings = () =>{
    this.shownav()
    this.setState({active:"App-active", drivers: false, stats:false,bikes: false,trucks:false,settings:true,bakkies: false})
  }
  openHelp = () =>{
    this.setState({help:true})
  }
  hideHelp = () =>{
    this.setState({help:false})
  }
  shownav = () =>{
    if (window.innerWidth <= 800){
      if (this.state.menu){
        this.setState({menu:false})
      }else{
        this.setState({menu:true})
      }
    }
  }
  render(){
  return (
    <div className="App">
      <body >
      <div className="overlay" onClick={this.shownav}></div>
      <div className={this.state.menu ? "App-header" : "Transition"}>
        <div className={this.state.menu ? "App-icons" : "App-hide"}>
           <p className={this.state.drivers ? "App-active" : null} onClick={this.showDrivers}><a class="fa fa-bar-chart"></a></p>
           <p className={this.state.stats ? "App-active" : null}  onClick={this.showStats}><a class="	fa fa-address-card-o" ></a></p>
           <p className={this.state.bikes ? "App-active" : null}  onClick={this.showBikes} ><a class="fa fa-motorcycle"></a></p>
           <p className={this.state.bakkies ? "App-active" : null} onClick={this.showBakies}><a class="fa fa-automobile"></a></p>
           <p className={this.state.trucks ? "App-active" : null} onClick={this.showTrucks}><a class="fa fa-truck" ></a></p>
           <p className={this.state.settings ? "App-active" : null} onClick={this.showSettings}><a class="fa fa-cogs" ></a></p>
        </div>
      </div>
        <div className="App-body">
        <span className="menu" onClick={this.shownav}>&#9776;</span>
           <ul className="App-menu">
              <li>Users</li>
              <li>Settings</li>
              <li>Logout</li>
              <li onClick={this.openHelp}>Help</li>
           </ul>
        </div>
        <div className="App-container">
          <div className={this.state.stats ? "App-show" : "App-hide"} >
            <h4>Drivers</h4>
          </div>

          <div className={this.state.drivers ? "App-show" : "App-hide"}>
            <h4>Summary</h4>
            <div class="cards">
                <div className="card"><span class="iconColors"><a class="fa fa-user"></a> App users</span> <span style={{float:"right"}}>{this.state.usersKeys.length}</span><br></br>
               <div className="App-image"><img src={graph} className="App-image2"/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-group"></a> Drivers</span> <span style={{float:"right"}}>{this.state.driverKeys.length}</span><br></br>
                <div className="App-align"><img src={line} className="App-image2"/></div> 
                </div>
                <div class="card"><span class="iconColors"><a class="fa fa-line-chart"></a> Deliveries</span> <span style={{float:"right"}}>{this.state.DeliveriesKeys}</span><br></br>
                <div className="App-align2"><img src={loader} className="App-image2"/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-motorcycle"></a> Bikes</span> <span style={{float:"right"}}>30</span><br></br>
                <div className="App-align"><img src={area_graph} className="App-image2"/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-automobile"></a> Bakkies</span> <span style={{float:"right"}}>10</span><br></br>
                <div className="App-align2"><img src={pie} className="App-image2"/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-truck"></a> Trucks</span> <span style={{float:"right"}}>74</span><br></br>
                <div className="App-align2"><img src={lastLine} className="App-image2"/></div> 
                </div>
            </div>
          </div>

          <div className={this.state.bikes ? "App-show" : "App-hide"}>
          <h4>Bikes</h4>
          </div>

          <div className={this.state.bakkies ? "App-show" : "App-hide"}>
            <h4>bakkies</h4>
          </div>

          <div className={this.state.trucks ? "App-show" : "App-hide"}>
            <h4>trucks</h4>
          </div>

          <div className={this.state.settings ? "App-show" : "App-hide"}>
          <h4>settings</h4>
          </div>
        </div>

        <div className={this.state.help ? "App-modal" : "App-hide"}>
          <div className="App-modal-content">
          <span className="App-close" onClick={this.hideHelp}>&times;</span><br></br>
            <p>If you need any help, please contact Derik or James</p>
          </div>
        </div>
      </body>
   </div>
  );
  }
}

export default App;