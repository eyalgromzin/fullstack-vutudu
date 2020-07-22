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

		var time = this.props.time === undefined ? 0 : this.props.time;

		this.state = {
			time: Number(time)
		};
	}

	// getSnapshotBeforeUpdate(prevProps, prevState){
		// var time = this.props.time === undefined ? 10 : this.props.time;
		// if(this.state.time != time){
		// 	this.setState({ time: Number(time) });
		// }

		// return null
	// }

	componentDidUpdate(){

	}

	clear = () => {
		this.setState({time: 0})
	}

	onChangeEvent = (e) => {
		this.setState({time: e.target.value})
		this.props.onChangeEvent(e.target.value)
	}

	render() {
		return (
			<React.Fragment>
				<div id="timePickerField" className={this.props.cssClass} >
					{/* <div className={this.props.headerCssClass}>Time</div> */}
					<select
						id="timePicker"
						value={this.state.time}
						onChange={this.onChangeEvent}
					>
						<option value="0" className="timeChooserOption">Time</option>
						<option value="5" className="timeChooserOption">5 min</option>
						<option value="10" className="timeChooserOption">10 min</option>
						<option value="15" className="timeChooserOption">15 min</option>
						<option value="30" className="timeChooserOption">30 min</option>
						<option value="60" className="timeChooserOption">1 hour</option>
						<option value="180" className="timeChooserOption">3 hours</option>
						<option value="300" className="timeChooserOption">half day (5h)</option>
						<option value="480" className="timeChooserOption">full day+ (8h+)</option>
					</select>
					<div className="invisible">error</div>
				</div>
			</React.Fragment>
		);
	}
}
