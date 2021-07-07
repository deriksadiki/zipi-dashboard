import React,{Component} from 'react'
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import Drivers from '../../components/Drivers'

export default class Offline extends React.Component{
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
          driversArr : this.Drivers.state.offline,
        })
        if (this.Drivers.state.offline.length > 0){
        let tempArr =  new Array();
        let first = this.Drivers.state.offline[0].availability
        try {
          tempArr.push(first.toLowerCase())
        } catch (error) {
          console.warn(first);
        }

        for (var x = 0; x < this.Drivers.state.offline.length; x++){
          let counter = true
            for (var i = 0; i < tempArr.length; i++){
              if (this.Drivers.state.offline[x].availability != undefined){
              let sub = this.Drivers.state.offline[x].availability
              try {
                if (sub.toLowerCase() === tempArr[i]){
                  counter = false
               }
              } catch (error) {
                console.warn(sub);
              }

             }
            }

            if (counter){
              if (this.Drivers.state.offline[x].availability != undefined){
                let word = this.Drivers.state.offline[x].availability
                try {
                  tempArr.push(word.toLowerCase())
                } catch (error) {
                  console.warn(word);
                }
 
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
             try {
              let init_cap=str[0].toUpperCase() + str.substring(1,str.length).toLowerCase();
              
              labels.push(init_cap)
             } catch (error) {
               console.warn(error);
             }

              for (var x = 0; x < this.Drivers.state.offline.length; x++){
                if (this.Drivers.state.offline[x].availability != undefined){
                let tmp = this.Drivers.state.offline[x].availability
                try {
                  if (drivers[i] === tmp.toLowerCase()){
                    total++;
                  }
                } catch (error) {
                  console.warn(tmp);
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