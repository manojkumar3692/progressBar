import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import RaisedButton from 'material-ui/RaisedButton';
import LinearProgress from 'material-ui/LinearProgress';
import './App.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import APIService from './AppService';
import ClevertapReact from 'clevertap-react';


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {};
        this.state.serverData = [];
        this.state.barsData = [];
        this.state.buttonData = [];
        this.state.limitMessage = '';
        this.state.warning = false;
        this.state.maxLimit = 100;
    }


    selectedID = 'progress0';
    initialWidth = 0;
    componentWillMount() {
    	console.log(this.initialWidth);
    	this._apiDetails();
    }



    _apiDetails() {
    	APIService.getAPIDetails()
		    .then((response) => {
		    	this.setState({serverData:response,barsData:response.bars,buttonData:response.buttons,maxLimit:response.limit})
		    })
		    .catch((error) => {
		    	console.log('Err',error)
		    })
    }

	selectProgress() {
    	var e = document.getElementById('dropDownValue');
    	var sltValue = e.options[e.selectedIndex].value;
    	let parentWidth = document.getElementById(sltValue).parentNode.parentElement.clientWidth;
    	this.selectedID = sltValue;
    	this.initialWidth = (document.getElementById(sltValue).offsetWidth / parentWidth) * 100;
    	this.initialWidth = parseInt(this.initialWidth);
    }



	change(value) {
    	if(this.initialWidth > this.state.maxLimit) {
		    let increaseProgress = document.getElementById(this.selectedID);
		    increaseProgress.style.width = 100 + "%";
		    this.initialWidth = 100;
		    this.setState({limitMessage:'You have reached maximum limit of' + ' ' + this.state.maxLimit,warning:true})
	    } else if (this.initialWidth < 0 ) {
		    let increaseProgress = document.getElementById(this.selectedID);
		    increaseProgress.style.width = 0 + "%";
		    this.initialWidth = 0;
		    this.setState({limitMessage:'You have reached minimum limit of 0%'});
	    }else {
		    this.initialWidth = this.initialWidth + (value);
		    let increaseProgress = document.getElementById(this.selectedID);
		    increaseProgress.style.width = this.initialWidth + "%";
		    console.log(this.initialWidth);
		    this.setState({limitMessage:'',warning:false})
	    }
	}



   render() {

	  return (
      <div className="App" style={{width:'70%',margin:'0 auto',paddingTop:'2rem',overflow:'hidden'}}>

	      {
	      	this.state.barsData.map((value,index) => {
	      		return (
			        <div  key={index} style={{height:'50px',width:'100%',border:'1px solid #f9f9f9',marginBottom:'2rem'}}>
				        <div id={'progress'+index} style={{width:value}} className="progressContainer">
					        <h1 style={{lineHeight:'50px',textAlign:'center'}}>{'progress'+index}</h1>
				        </div>
			        </div>

		        )
	        })
	      }


		     <select id="dropDownValue" onChange={this.selectProgress.bind(this)}>
			     {
			     	this.state.barsData.map((value,index) => {
			     		return (
					        <option key={index} value={'progress'+index}>{'progress'+index}</option>
				        )
			        })
			     }

	     </select>
	      {
	      	this.state.buttonData.map((value,index) => {
	      		return (
			        <button type="button" key={index} value={value}  onClick={this.change.bind(this,value)}>{value}</button>
		        )
	        })
	      }

	      <h1>{this.state.limitMessage}</h1>

	      <label>Progress Value</label>
	      <h1>{this.initialWidth}</h1>

      </div>
    );
  }
}

export default App;
