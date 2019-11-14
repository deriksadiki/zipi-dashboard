import React, {Component} from 'react';
import graph from './images/newLine.png'
import line from './images/line.jpg'
import storm from './images/storm.jpg'
import area_graph from './images/area_graph.png'
import pie from './images/pie.jpg';
import lastLine from './images/lastLine.png'
import './App.css';
import firebase from './firebaseConfig'
import Users from './components/Users'
import Drivers from './components/Drivers'
import Deliveries from './components/Deliveries'
import HelpModal from './components/HelpModal'
import DriverDetails from './components/NewDriverDetails'

class  App  extends Component {
  constructor(props){
    super()
    this.state = {
      active: true,
      stats: false,
      drivers: false,
      bikes: false,
      trucks:false,
      bakkies: false,
      settings:false,
      help: false,
      pendingDrivers: true,
      pending: [],
      accepted: [],
      driversArr: [],
      driverKeys: [],
      usersKeys: [],
      usersArr: [],
      DriversTot: 0,
      DeliveriesTot: 0,
      name: '',
      bikeDrives: [],
      bakkieDrivers: [],
      truckDrivers: [],
      activeDriver: null,
      images: ["data:image/jpeg;base64,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",
    "data:image/jpeg;base64,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",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDeJmOOTS640mHRyFyn5PsC_U7BmEF2dPa4ErYW4fGEYOZZmM&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoS7Zm13DwLQ4TE6bjU7LpYvhvBZ7SeeC0DL5R-Bga1Fz7qy89&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7wzJQTXkzIjOdHb7_Cgn12mKAitNxoJopr9kogLfMee1PSlHy&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuIsXN-9HdkKLlsWfBl_sPXQ5n_YH60KRUYutMX2JcTskzSPQo&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvbkfKalfIAmNW60tl44I0Ib0aH3PcDL6CldjS7zN65RVNvz9G&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSp3rzw-mo-oJ8cJmvDFjE7edXU6Gsnq-uD1BD5GGhTPkx4-Ut1&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7K5Bhno9WGlNO308BoQQBBiG0oxCRfJ7fl6pF6ZQ-6XEYHo6-og&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1gQC7lTaUSb786hphFXKvfg3PNSUs5CfxIG7BFnLH9mhvxjAR&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-a_p1NOm7qQnc-CT4S_DiVWPWPwoINFDfXQmXBuCGkT_0oVcjDA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLq1pBFbxp4hhSC7ByYTGMxugyh02uX5oxurZDg0_KhMHAu9S4QA&s",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsaQFSntj1O-gF9oRMN5ALg3Wzc4lj5F9crQXeGTSc4FbS_urDMg&s"],
      months : ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"],
      menu: false,
      selectedImage: null,
      height : props.height,
      testNum : 0,
    };
  }

  componentDidMount(){
    if (window.innerWidth > 800){
      this.setState({menu:true})
     }
    this.getAppUsers()
    this. getDrivers()
    this.getDeliveries()
    // this.refreshAll();
  }
  acceptDriver = () =>{
    let tempArr =  new Array();
    let tempArr2 =  new Array();
    tempArr =  this.state.months;
    tempArr.splice(this.state.activeDriver,1)
    tempArr2 = this.state.images;
    tempArr2.splice(this.state.activeDriver,1)
    this.setState({
      months: tempArr,
      acceptDriver:null,
      images: tempArr2
    })
    this.hideHelp();
  }
  getDrivers(){
    if (this.Drivers.state.loading == false){
      this.setState({DriversTot: this.Drivers.state.driverKeys.length, 
      pending: this.Drivers.state.pending,
      bikeDrives: this.Drivers.state.bikes,
      truckDrivers: this.Drivers.state.trucks,
      bakkieDrivers: this.Drivers.state.bakkies
    })
    }else{
      setTimeout(() => {
        this.getDrivers();
      }, 1000);
    }
  }

  getAppUsers(){
   if (this.Users.state.loading == false){
    this.setState({
      testNum: this.Users.state.usersKeys.length
    })
   }else{
     setTimeout(() => {
      this.getAppUsers()
     }, 1000);
   }
  }

getDeliveries(){
  if (this.Deliveries.state.loading == false){
    this.setState({
      DeliveriesTot: this.Deliveries.state.DeliveriesKeys
    })
  }else{
    setTimeout(() => {
      this.getDeliveries()
    }, 1000);
  }
}
showSettings = () =>{
  this.shownav()
  this.setState({active:"App-active",pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:true,bakkies: false})
}
showPending = () =>{
  this.shownav()
  this.setState({active:"App-active", stats: false,drivers:false,bikes: false,trucks:false,settings:false,bakkies: false,pendingDrivers: true})

}
  showStats = () =>{
    this.shownav()
    this.setState({active:"App-active", stats: true,drivers:false,bikes: false,trucks:false,settings:false,bakkies: false,pendingDrivers: false})
  } 

  showDrivers = () =>{
    this.shownav()
    this.setState({active:"App-active",pendingDrivers: false, drivers: true, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
  }

  showBikes = () =>{
    this.shownav()
    this.setState({active:"App-active",pendingDrivers: false, drivers: false, stats:false,bikes: true,trucks:false,settings:false,bakkies: false})
  }

  showBakies = () =>{
    this.shownav()
    this.setState({active:"App-active",pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: true})
  }

  showTrucks = () =>{
    this.shownav()
    this.setState({active:"App-active", pendingDrivers: false,drivers: false, stats:false,bikes: false,trucks:true,settings:false,bakkies: false})
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

  refreshAll (){
    setTimeout(() => {
      this.getDeliveries();
      this.getAppUsers();
      this.getDrivers();
      this.refreshAll()
    }, 10000);
  }
  showHelpModal = () =>{
    this.HelpModal.showHelp()
  }
  openInfo  = (object, num, data) =>{
    this.DriverDetails.openMoreInfo(object, num, data)
  }
  openHelp = (object, num, data) =>{
    this.DriverDetails.openHelp(object, num, data)
  }
render(){
  const pending = this.state.pending.map((data, index) =>
  <div>
      <div className="card2" key={data} onClick={ () => this.openHelp(this.state.images[index], index, data)}>
          <img className="images" src={this.state.images[index]} />
          <div className="App-cont">
          <p className="App-Details">{data.firstName} {data.surname}<br></br>
            <span>ID/Passport: {data.idNo}</span><br></br>
            <span>Mode: {data.mode}</span>
          </p>
          </div>
    </div>
  </div>
)
  const driversList =  this.state.months.map((data, index) =>
  <div>
      <div className="card2" key={data} onClick={ () => this.openHelp(this.state.images[index])}>
          <img className="images" src={this.state.images[index]} />
          <div className="App-cont">
          <p className="App-Details">Name: joaquin phoenix <br></br>
            <span>Deliveries: {index}</span><br></br>
            <span>Mode: Bakkie</span>
          </p>
          </div>
    </div>
  </div>
)
  const bikeDrives = this.state.bikeDrives.map((data,index) =>
  <div>
  <div className="card2" key={data} onClick={ () => this.openInfo(this.state.images[index], index, data)}>
      <img className="images" src={this.state.images[index]} />
      <div className="App-cont">
      <p className="App-Details">Name: {data.firstName} {data.surname}<br></br>
        <span>Deliveries: {index}</span><br></br>
        <span>Mode: {data.mode}</span>
      </p>
      </div>
</div>
</div>
)

const bakkieDrivers =  this.state.bakkieDrivers.map((data,index) =>
<div>
  <div className="card2" onClick={()=>{this.openInfo(this.state.images[index], index, data)}}>
    <img className="images" src={this.state.images[index]} />
    <div className="App-cont">
      <p className="App-Details">Name: {data.firstName} {data.surname}<br></br>
          <span>Deliveries: {index}</span><br></br>
          <span>Mode:  {data.mode}</span>
      </p>
    </div>
  </div>
</div>
)
const truckDrivers =  this.state.truckDrivers.map((data,index) =>
<div>
  <div className="card2" onClick={()=>{this.openInfo(this.state.images[index], index, data)}}>
    <img className="images" src={this.state.images[index]} />
    <div className="App-cont">
      <p className="App-Details">Name: {data.firstName} {data.surname}<br></br>
        <span>Deliveries: {index}</span><br></br>
        <span>Mode: {data.mode}</span>
      </p>
    </div>
  </div>
</div>
)
  return (
    <div className="App">
      <body >
      <div className="overlay" onClick={this.shownav}></div>
      <div className={this.state.menu ? "App-header" : "Transition"}>
        <div className={this.state.menu ? "App-icons" : "App-hide"}>
           <p className={this.state.drivers ? "App-active" : null} onClick={this.showDrivers}><a class="fa fa-bar-chart"></a></p>
           <p className={this.state.pendingDrivers ? "App-active" : null}  onClick={this.showPending}><a class="	fa fa-user-plus" ></a></p>
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
              <li onClick={this.showHelpModal}>Help</li>
           </ul>
        </div>
        <div className="App-container">
          <div className={this.state.stats ? "App-show" : "App-hide"} >
          <h4>Drivers</h4>
          <div class="cards" >
            {driversList}
            </div>
          </div>

          <div className={this.state.drivers ? "App-show" : "App-hide"}>
            <h4>Summary</h4>
            <div class="cards">
                <div className="card"><span class="iconColors"><a class="fa fa-user"></a> App users</span> <span style={{float:"right"}}>{this.state.testNum}</span><br></br>
               <div className="App-image"><Users ref={ref=>{ this.Users = ref}}/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-group"></a> Drivers</span> <span style={{float:"right"}}>{this.state.DriversTot}</span><br></br>
                <div className="App-align"><Drivers ref={ref=>{this.Drivers = ref}} /></div> 
                </div>
                <div class="card"><span class="iconColors"><a class="fa fa-line-chart"></a> Deliveries</span> <span style={{float:"right"}}>{this.state.DeliveriesTot}</span><br></br>
                <div className="App-align2"><Deliveries ref={ref=>{this.Deliveries = ref}} /></div> 
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
          <div className={this.state.pendingDrivers ? "App-show" : "App-hide"}>
            <h4>New Drivers</h4>
            <div class="cards" >
            {pending}
            <HelpModal ref={ref=> {this.HelpModal = ref}}/>
            </div>
          </div>

          <div className={this.state.bikes ? "App-show" : "App-hide"}>
          <h4>Bikes</h4>
          <div class="cards" >
          {bikeDrives}
          </div>
          </div>

          <div className={this.state.bakkies ? "App-show" : "App-hide"}>
            <h4>Bakkies</h4>
            <div class="cards">
              {bakkieDrivers}
            </div>
          </div>

          <div className={this.state.trucks ? "App-show" : "App-hide"}>
            <h4>Trucks</h4>
            <div className="cards">
              {truckDrivers}
            </div>
          </div>

          <div className={this.state.settings ? "App-show" : "App-hide"}>
          <h4>settings</h4>
          </div>
          <DriverDetails ref={ref=>{this.DriverDetails = ref}} />
        </div>
      </body>
   </div>
  );
  }
}

export default App;
