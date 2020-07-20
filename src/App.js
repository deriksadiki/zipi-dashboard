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

//Install ExportToCSV package before running. I didn't update Package.json
import {ExportToCsv} from 'export-to-csv'

//stats
import Accepted from './stats/drivers/Accepted'
import Pending from './stats/drivers/Pending'
import Area from './stats/drivers/Area'
import Transport from './stats/clients/Transport'
import All from './stats/deliveries/All'
import  DeliveryAreas from './stats/deliveries/DeliveryAreas'
import Distance from './stats/deliveries/Distance'
import ClientByDates from './stats/clients/ClientByDates'



class App extends Component {
  constructor(props){
    super()
    this.state = {
      active: false,
      stats: false,
      drivers: true,
      bikes: false,
      trucks:false,
      bakkies: false,
      settings:false,
      help: false,
      pendingDrivers: false,
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
      menu: false,
      selectedImage: null,
      height : props.height,
      testNum : 0,
      DeliveriesStats: false,
      clientStats: false,
      driver_data: []
    };
  }

  componentDidMount(){
    this.getDriverDataFromFirebase();
    if (window.innerWidth > 800){
      this.setState({menu:true})
     }
    this.getAppUsers()
    this. getDrivers()
    this.getDeliveries()
    this.refreshAll();
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
      bakkieDrivers: this.Drivers.state.bakkies,
      driversArr : this.Drivers.state.accepted 
    })
    setTimeout(() => {
      this.getDrivers();
    }, 100);
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
      DeliveriesTot: this.Deliveries.state.deliveries.length
    })
  }else{
    setTimeout(() => {
      this.getDeliveries()
    }, 1000);
  }
}
showSettings = () =>{
  this.shownav()
  this.setState({active:"App-active", clientStats: false,DeliveriesStats: false, driverStats: false,pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:true,bakkies: false})
}
showDriverStats = () =>{
  this.shownav()
  this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: true, pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
}
showDeliveryStats = () =>{
  this.shownav()
  this.setState({active:"App-active",clientStats: false,DeliveriesStats: true,driverStats: false, pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
}
showClientStats = () =>{
  this.shownav()
  this.setState({active:"App-active",clientStats: true,DeliveriesStats: false,driverStats: false, pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
}
showPending = () =>{
  this.shownav()
  this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false, stats: false,drivers:false,bikes: false,trucks:false,settings:false,bakkies: false,pendingDrivers: true})

}
  showStats = () =>{
    this.shownav()
    this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false, stats: true,drivers:false,bikes: false,trucks:false,settings:false,bakkies: false,pendingDrivers: false})
  } 

  showDrivers = () =>{
    this.shownav()
    this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false,pendingDrivers: false, drivers: true, stats:false,bikes: false,trucks:false,settings:false,bakkies: false})
  }

  showBikes = () =>{
    this.shownav()
    this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false,pendingDrivers: false, drivers: false, stats:false,bikes: true,trucks:false,settings:false,bakkies: false})
  }

  showBakies = () =>{
    this.shownav()
    this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false,pendingDrivers: false, drivers: false, stats:false,bikes: false,trucks:false,settings:false,bakkies: true})
  }

  showTrucks = () =>{
    this.shownav()
    this.setState({active:"App-active",clientStats: false,DeliveriesStats: false,driverStats: false, pendingDrivers: false,drivers: false, stats:false,bikes: false,trucks:true,settings:false,bakkies: false})
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
  openInfo  = ( num, data) =>{
    this.DriverDetails.openMoreInfo(num, data)
  }
  openHelp = (num, data) =>{
    this.DriverDetails.openHelp(num, data)
  }

  getDriverDataFromFirebase(){
    var driver_data = new Array();
    firebase.database().ref('drivers').on('value', data => {
      var data = data.val();
      var key;
      for(key in data){
        driver_data.push(data[key]);
      }
      this.setState({driver_data: driver_data});
    });
  }

  exportDrivers(){
    var data = this.state.driver_data;
    this.makeExcel(data);
  }

  makeExcel(data){
    console.log(data);
    const options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'CSV',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: false,
      headers: ['Licence', 'Date Reg', 'Email Address', 'Licence Date', 'Surname', 'ID / Passport', 'Licence', 'Name', 'Month', 'Cell No', 'Date', 'Status', 'Surname']
    };
   

  const csvExporter = new ExportToCsv(options);
   
  csvExporter.generateCsv(data);
  }
render(){

  const pending = this.state.pending.map((data, index) =>
  <div>
      <div className="card2" key={data.key} onClick={ () => this.openHelp( index, data)}>
          <img className="images" src="data:image/png;base64,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"/>
          <div className="App-cont">
          <p className="App-Details">{data.firstName} {data.surname}<br></br>
            <span>ID/Passport: {data.idNo}</span><br></br>
            <span>Mode: {data.mode}</span>
          </p>
          </div>
    </div>
  </div>
)
  const driversList =  this.state.driversArr.map((data, index) =>
  <div>
      <div className="card2" key={data.key} onClick={ () => this.openInfo(index, data)}>
      <img className="images2" src={data.img} />
          <div className="App-cont">
          <p className="App-Details">Name: {data.firstName} {data.surname}<br></br>
            <span>Deliveries: {data.totalTrips}</span><br></br>
            <span>Mode: {data.mode}</span>
          </p>
          </div>
    </div>
  </div>
)
  const bikeDrives = this.state.bikeDrives.map((data,index) =>
  <div>
  <div className="card2" key={data.key} onClick={ () => this.openInfo( index, data)}>
      <img className="images" src="data:image/png;base64,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" />
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
  <div className="card2" onClick={()=>{this.openInfo( index, data)}}>
    <img className="images" src="data:image/png;base64,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" />
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
  <div className="card2" onClick={()=>{this.openInfo( index, data)}}>
    <img className="images" src="data:image/png;base64,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"/>
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
           <p className={this.state.settings ? "App-active" : null} onClick={this.showSettings}><a class="fa fa-folder-open-o" ></a></p>
        </div>
      </div>
        <div className="App-body">
        <span className="menu" onClick={this.shownav}>&#9776;</span>
           <ul className="App-menu">
              <li onClick={()=>{this.exportDrivers()}}>Export to CSV</li>
              <li>Users</li>
              <li>Settings</li>
              <li>Logout</li>

              <li onClick={this.showHelpModal}>Help</li>
           </ul>
        </div>
        <div className="App-container">
          <div className={this.state.stats ? "App-show" : "App-hide"} >
          <h4>Drivers</h4>
          <div class="cards">
            {driversList}
            </div>
          </div>

          <div className={this.state.drivers ? "App-show" : "App-hide"}>
            <h4>Summary</h4>
            <div class="cards">
                <div className="card"><span class="iconColors"><a class="fa fa-user"></a> App users</span> <span style={{float:"right"}}>{this.state.testNum}</span><br></br>
               <div className="App-image" onClick={this.showClientStats}><Users ref={ref=>{ this.Users = ref}}/></div> 
                </div>
                <div className="card"><span class="iconColors"><a class="fa fa-group"></a> Drivers</span> <span style={{float:"right"}}>{this.state.DriversTot}</span><br></br>
                <div className="App-align" onClick={this.showDriverStats}><Drivers ref={ref=>{this.Drivers = ref}} /></div> 
                </div>
                <div class="card"><span class="iconColors"><a class="fa fa-line-chart"></a> Deliveries</span> <span style={{float:"right"}}>{this.state.DeliveriesTot}</span><br></br>
                <div className="App-align2" onClick={this.showDeliveryStats}><Deliveries ref={ref=>{this.Deliveries = ref}} /></div> 
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
          <h4>Reports</h4>
          </div>
          <DriverDetails ref={ref=>{this.DriverDetails = ref}} />

          <div  className={this.state.driverStats ? "App-show" : "App-hide"}>
          <h4>Drivers Stats</h4>
          <div class="cards">
            <div className="card"><span class="iconColors"><a class="fa fa-star"></a>  Accepted</span> <span style={{float:"right"}}>{this.state.driversArr.length}</span><br></br>
                  <div className="App-align" ><Accepted ref={ref=>{this.Accepted = ref}}/></div> 
                  </div>

                  <div className="card"><span class="iconColors"><a class="fa fa-star-half-o"></a>  Pending</span> <span style={{float:"right"}}>{this.state.pending.length}</span><br></br>
                  <div className="App-align" ><Pending /></div> 
                  </div>

                  <div className="card"><span class="iconColors"><a class="fa fa-location-arrow"></a>  Location</span> <span style={{float:"right"}}>{this.state.driversArr.length}</span><br></br>
                  <div className="App-align" ><Area /></div> 
                  </div>
            </div>
          </div>

          <div className={this.state.DeliveriesStats ? "App-show" : "App-hide"}>
          <h4>Deliveries Stats</h4>
          <div class="cards">
            <div className="card"><span class="iconColors"><a class="	fa fa-exchange"></a>  All</span> <span style={{float:"right"}}>{this.state.DeliveriesTot}</span><br></br>
                  <div className="App-align" ><All ref={ref=>{this.All = ref}}/></div> 
                  </div>

                  <div className="card"><span class="iconColors"><a class="fa fa-map-marker"></a>  Top Areas</span> <span style={{float:"right"}}></span><br></br>
                  <div className="App-align" ><DeliveryAreas /></div> 
                  </div>

                  <div className="card"><span class="iconColors"><a class="fa fa-history"></a>  Distances</span> <span style={{float:"right"}}></span><br></br>
                  <div className="App-align" ><Distance /></div> 
                  </div>
            </div>
          </div>


          <div className={this.state.clientStats ? "App-show" : "App-hide"}>
          <h4>Client Stats</h4>
          <div class="cards">
            <div className="card"><span class="iconColors"><a class="	fa fa-plane"></a>  Transportation</span> <span style={{float:"right"}}></span><br></br>
                  <div className="App-align" ><Transport /></div> 
                  </div>
                  <div className="card"><span class="iconColors"><a class="	fa fa-id-badge"></a>  Resgistrations</span> <span style={{float:"right"}}>{this.state.testNum}</span><br></br>
                  <div className="App-align" ><ClientByDates /></div> 
                  </div>
            </div>
          </div>
        </div>
      </body>
   </div>
  );
  }
}

export default App;
