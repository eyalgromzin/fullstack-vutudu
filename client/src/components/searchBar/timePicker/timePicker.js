import React, { Component } from 'react';
import './timePicker.css';
import '../searchBarCommonStyles.css';
import { search } from '../searchBarCommon';
import store from 'store';
import 'commonCss.css';
import { connect } from 'react-redux';

export default class TimePicker extends Component {
	constructor(props) {
		super(props);

		var time = this.props.time === undefined ? 10 : this.props.time;

		this.state = {
			time: Number(time)
		};
	}

	//not working
	// shouldComponentUpdate(){
	// 	var time = this.props.time === undefined ? 10 : this.props.time;

	// 	this.state = {
	// 		time: Number(time)
	// 	};
	// }

	//not working
	// componentDidUpdate(){
	// 	var time = this.props.time === undefined ? 10 : this.props.time;

	// 	this.state = {
	// 		time: Number(time)
	// 	};
	// }

	getSnapshotBeforeUpdate(prevProps, prevState){
		var time = this.props.time === undefined ? 10 : this.props.time;
		if(this.state.time != time){
			this.setState({ time: Number(time) });
		}

		return null
	}

	componentDidUpdate(){

	}

  onChangeEvent = (e) => {
    this.setState({time: e.target.value})
    this.props.onChangeEvent(e.target.value)
  }

	render() {
		//not working
		// var time = this.props.time === undefined ? 10 : this.props.time;

		// this.state = {
		// 	time: Number(time)
		// };

		return (
			<React.Fragment>
				<div id="timePickerField" className="inlineBlock">
					<div className="fieldHeader">Time</div>
					<select
						id="timeChooser"
						value={this.state.time}
						onChange={this.onChangeEvent}
						onKeyDown={this.placeFieldKeyUp}
						className={this.props.cssClass}
					>
						<option value="5" className="timeChooserOption">
							5 min
						</option>
						<option value="10" className="timeChooserOption">
							10 min
						</option>
						<option value="15" className="timeChooserOption">
							15 min
						</option>
						<option value="30" className="timeChooserOption">
							30 min
						</option>
						<option value="60" className="timeChooserOption">
							{' '}
							1 hour
						</option>
						<option value="6000" className="timeChooserOption">
							1 hour+
						</option>
					</select>
					<div className="invisible">error</div>
				</div>
			</React.Fragment>
		);
	}
}
