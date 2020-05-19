import React,{Component} from 'react';
import { Doughnut, Line, Bar, Bubble,Pie} from 'react-chartjs-2';
import firebase from '../firebaseConfig';

export default class Deliveries extends React.Component{
    constructor(props){
        super();
        this.state = {
            data: [],
            deliveries: [],
            loading:true,
            DeliveriesKeys: 0,
            months : ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"]
        }
    }

    componentDidMount(){
        this.getDeliveries(); 
    }

  getDeliveries(){
    firebase.database().ref('completedDeliveries/').on('value', deliveries =>{
      if (deliveries.val() != null || deliveries.val() != undefined){
        var details = deliveries.val();
        var keys = Object.keys(details);
        var tempKeys = 0
        var tempArr =  new Array();
        let allDeliveries =  new Array();
        for (var x = 0; x < keys.length; x++){
          firebase.database().ref('completedDeliveries/' + keys[x]).on('value', data =>{
            var innerData =  data.val();
            var innerKeys = Object.keys(innerData)
            tempKeys += innerKeys.length;
            for (var  i = 0; i < innerKeys.length; i++){
                allDeliveries.push(innerData[innerKeys[i]].deliveryDetails)
                tempArr.push(innerData[innerKeys[i]].completionDetails)
            }
          })
        }
        this.sortDeliveries(tempArr)
        this.setState({
         deliveries: allDeliveries,
         DeliveriesKeys: tempKeys,
         loading: false
       })
      }
    })
  }

  sortDeliveries(Deliveries){
      var tempArr =  new Array();
      for (var x = 0; x < this.state.months.length; x++){
          var total = 0;
          for (var i = 0; i < Deliveries.length; i++){
              if (this.state.months[x] == Deliveries[i].split(' ')[0]){
                  total++
              }
          }
          tempArr.push(total);
      }
      this.setState({
        data:{
            labels: this.state.months,
            datasets: [{
                backgroundColor: 'rgb(230, 211, 106)',
                borderColor: 'rgb(230, 211, 106)',
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
            <Line data={this.state.data} />
        )
    }
}