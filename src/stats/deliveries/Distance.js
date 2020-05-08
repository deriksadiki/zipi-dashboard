import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import Deliveries from '../../components/Deliveries'

export default class Distance extends React.Component{
    constructor (props){
        super(props)
        this.state = {
            data:[],
            driversArr: [],
            total : "0"
        }
    }

    componentDidMount(){
        this.getDrivers()
    }

    getDrivers(){
      if (this.Deliveries.state.loading == false){
        this.setState({
        driversArr : this.Deliveries.state.deliveries,
      })
      let tempArr =  new Array();
      tempArr.push(this.Deliveries.state.deliveries[0].date.split(' ')[0])
      for (var x = 0; x < this.Deliveries.state.deliveries.length; x++){
        let counter = true
          for (var i = 0; i < tempArr.length; i++){
            if (this.Deliveries.state.deliveries[x].date.split(' ')[0] === tempArr[i]){
               counter = false
            }
           
          }
          if (counter)
              tempArr.push(this.Deliveries.state.deliveries[x].date.split(' ')[0])
      }
      this.countDrivers(tempArr)
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
              for (var x = 0; x < this.Deliveries.state.deliveries.length; x++){
                  if (drivers[i] === this.Deliveries.state.deliveries[x].date.split(' ')[0]){
                    total = total + this.Deliveries.state.deliveries[x].tripDetails.distance
                  }
              }
              tempArr.push(total)
          }
          this.setState({
            data:{
                labels: labels,
                datasets: [{
                  backgroundColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 102, 255, 1)',
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
                        <Deliveries ref={ref=>{this.Deliveries = ref}} />
                    </div>
                    <Bar data={this.state.data} legend={false} />
                </div>
        )
    }
}