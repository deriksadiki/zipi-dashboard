import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import Drivers from '../../components/Drivers'

export default class Onroute extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            data:[],
            driversArr: [],
            total : "0",
        }
    }

    componentDidMount(){
        this.getDrivers()
    }

    getDrivers(){
        if (this.Drivers.state.loading == false){
          this.setState({
          driversArr : this.Drivers.state.accepted,
        })
        if (this.Drivers.state.accepted.length > 0){
        let tempArr =  new Array();
        let first = this.Drivers.state.accepted[0].suburb
        tempArr.push(first.toLowerCase())
        for (var x = 0; x < this.Drivers.state.accepted.length; x++){
          let counter = true
            for (var i = 0; i < tempArr.length; i++){
              if (this.Drivers.state.accepted[x].suburb != undefined){
              let sub = this.Drivers.state.accepted[x].suburb
              if (sub.toLowerCase() === tempArr[i]){
                 counter = false
              }
             }
            }

            if (counter){
              if (this.Drivers.state.accepted[x].suburb != undefined){
                let word = this.Drivers.state.accepted[x].suburb
                  tempArr.push(word.toLowerCase())
              }
            }
        }
        this.countDrivers(tempArr)
      }
        setTimeout(() => {
          this.getDrivers();
        }, 60000);
        }else{
          setTimeout(() => {
            this.getDrivers();
          }, 1000);
        }
      }

      countDrivers(drivers){
        var tempArr =  new Array()
        var labels =  new Array()
          for (var i = 0; i < drivers.length; i++){
              var total = 0;
             let str=drivers[i];
              let init_cap=str[0].toUpperCase() + str.substring(1,str.length).toLowerCase();
              labels.push(init_cap)
              for (var x = 0; x < this.Drivers.state.accepted.length; x++){
                if (this.Drivers.state.accepted[x].suburb != undefined){
                let tmp = this.Drivers.state.accepted[x].suburb
                  if (drivers[i] === tmp.toLowerCase()){
                    total++;
                  }
                }
              }
              tempArr.push(total)
          }
          this.setState({
            data:{
                labels: labels,
                datasets: [{
                  backgroundColor: 'rgba(54, 162, 235, 1)',
                  borderColor:   'rgba(54, 162, 235, 1)',
                    data: tempArr,
                }],
                options: { 
                    scales: {
                        yAxes: [{
                            stacked: true
                        }]
                    }
                }
            }
          })
      }

    render(){
        return(
                <div>
                    <div style={{display:'none'}}>
                        <Drivers ref={ref=>{this.Drivers = ref}} />
                    </div>
                    <Line data={this.state.data} legend={false} />
                </div>
        )
    }
}