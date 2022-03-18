// import React,{useEffect} from 'react';
// import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
// import priceData from '../stockchardata/dummyData.JSON'
// import moment from 'moment'
// // import { useSelector,useDispatch} from 'react-redux';
// //import { getStockChartData} from '../Redux/action/stockListAction';
// //import { useParams } from 'react-router-dom'




// function ChartContainer(props) {
   
//     //let { id } = useParams();
//   //  const dispatch = useDispatch();
//     // useEffect(()=>{
//     //     const timer = setTimeout(() => {
//     //         dispatch(getStockChartData(id));
//     //       }, 60000);
//     // });
//     // const stockChartData=useSelector(state=>state.stockChartData);
//     // console.log(stockChartData);
 
   
//     return (
        
//         <div>
//             sgjkbxv  
//         </div>
//     )
// }
// export default ChartContainer;

import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from '../stockchardata/btcdata.json'
import moment from 'moment'

export default class ChartContainer extends Component {
  render() {
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {
      
      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value) 
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"

          },
          align: 'left'
        },
      },
        
      ],
      tooltip: {
        shared: true,
        formatter: function () {
          return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
        }
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,

        }
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `sample stock price`
      },
      chart: {
        height: 600,
      },
  
      credits: {
        enabled: false
      },
  
      legend: {
        enabled: true
      },
      xAxis: {
        type: 'date',
      },
      rangeSelector: {
        buttons: [{
          type: 'day',
          count: 1,
          text: '1d',
        }, {
          type: 'day',
          count: 7,
          text: '7d'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        },
          {
          type: 'all',
          text: 'All'
        }],
        selected: 4
      },
      series: [{
        name: 'Price',
        type: 'spline',
  
        data: priceData,
        tooltip: {
          valueDecimals: 2
        },
  
      }
      ]
    };
    return (
      <div>
         <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
  }
}
