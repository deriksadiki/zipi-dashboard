import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import Drivers from '../../components/Drivers'

export default class Accepted extends React.Component{
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
        tempArr.push(this.Drivers.state.accepted[0].date.split(' ')[0])
        for (var x = 0; x < this.Drivers.state.accepted.length; x++){
          let counter = true
            for (var i = 0; i < tempArr.length; i++){
              if (this.Drivers.state.accepted[x].date != undefined){
                  if (this.Drivers.state.accepted[x].date.split(' ')[0] === tempArr[i]){
                    counter = false
                }
              }
            }

            if (counter){
              if (this.Drivers.state.accepted[x].date != undefined){
                tempArr.push(this.Drivers.state.accepted[x].date.split(' ')[0])
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
              labels.push(drivers[i])
              for (var x = 0; x < this.Drivers.state.accepted.length; x++){
                if (this.Drivers.state.accepted[x] != undefined){
                  if (drivers[i] === this.Drivers.state.accepted[x].date.split(' ')[0]){
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
                  backgroundColor: [
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderColor: [
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 99, 132, 1)'
              ],
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
                    <Bar data={this.state.data} legend={false} />
                </div>
        )
    }
}