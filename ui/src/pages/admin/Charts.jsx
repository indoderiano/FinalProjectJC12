import React, { Component } from 'react';
import CanvasJSReact from '../../assets/canvasjs.react';
import Axios from 'axios'
import {APIURL} from '../../supports/ApiUrl'
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Button,
    Message,
    Container,
    Input,
    TextArea,
    Checkbox,
    Icon,
    Divider,
    Modal,
    Dropdown,
    Tab,
    Menu,
    Label
} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {titleConstruct,isJson,getDate} from '../../supports/services'
import {ListByTransaction} from '../../supports/ListAssembler'
import {LoadCart,UpdateCheckout,CountTotalCharge,CountTotalPayment} from '../../redux/actions'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'


var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class PieChart extends Component {
    state = { 
        list:[]
     }

    componentDidMount=()=>{
        Axios.get(`${APIURL}/admin/sales/count`)
        .then((list)=>{
            console.log(list.data)
            var dataPoints=list.data.map((val,index)=>{
                return {
                    y: val.total,
                    label: val.merk_name
                }
            })
            this.setState({list:dataPoints})
            console.log(dataPoints)


        }).catch((err)=>{
            console.log(err)
        })
    }


	render() {
		const options = {
			exportEnabled: false,
			animationEnabled: true,
			title: {
				text: "Website Traffic Sources"
			},
			data: [{
				type: "pie",
				startAngle: 75,
				toolTipContent: "<b>{label}</b>: {y}%",
				showInLegend: "true",
				legendText: "{label}",
				indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: this.state.list
				// dataPoints: [
				// 	{ y: 18, label: "Direct" },
				// 	{ y: 49, label: "Organic Search" },
				// 	{ y: 9, label: "Paid Search" },
				// 	{ y: 5, label: "Referral" },
				// 	{ y: 19, label: "Social" }
				// ]
			}]
		}
		
		return (
		<div>
			<h1>React Pie Chart</h1>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

const MapstatetoProps=(state)=>{
    return {
        User: state.Auth,
        Cart: state.Cart,
        Payment: state.Payment
    }
}

export default connect(MapstatetoProps) (PieChart);