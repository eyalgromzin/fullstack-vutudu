import React, { Component } from 'react';
import './timeCreator.css';
import '../searchBarCommonStyles.css';
import { search } from '../searchBarCommon';
import store from 'store';
import 'commonCss.css';
import { connect } from 'react-redux';

export default class TimeCreator extends Component {
	constructor(props) {
		super(props);

		var minTime = this.props.minTime === undefined ? 10 : this.props.minTime;
		var maxTime = this.props.maxTime === undefined ? 10 : this.props.maxTime;

		this.state = {
			minTime: Number(minTime),
			maxTime: Number(maxTime)
		};
	}

	// getSnapshotBeforeUpdate(prevProps, prevState){
	// 	var time = this.props.time === undefined ? 10 : this.props.time;
	// 	if(this.state.time != time){
	// 		this.setState({ time: Number(time) });
	// 	}

	// 	return null
	// }

	onMinTimeChangeEvent = (e) => {
		this.setState({minTime: e.target.value})
		this.props.onMinTimeChangeEvent(e.target.value)
	}
	  
	onMaxTimeChangeEvent = (e) => {
		this.setState({maxTime: e.target.value})
		this.props.onMaxTimeChangeEvent(e.target.value)
	}

	render() {
		return (
			<React.Fragment>
				<div id="timeCreatorField" className={this.props.fieldClass}>
					<div className={this.props.headerCssClass}>Time</div>
					<div id="timeCreatorSelectors" >
						<select
						id="minTimeCreator"
						value={this.state.minTime}
						onChange={this.onMinTimeChangeEvent}
						className={this.props.selctorClass}
						>
							<option value="5" className="timeChooserOption">5 min</option>
							<option value="10" className="timeChooserOption">10 min</option>
							<option value="15" className="timeChooserOption">15 min</option>
							<option value="30" className="timeChooserOption">30 min</option>
							<option value="60" className="timeChooserOption">1 hour</option>
							<option value="180" className="timeChooserOption">3 hours</option>
							<option value="300" className="timeChooserOption">half day (5h)</option>
							<option value="480" className="timeChooserOption">full day+ (8h+)</option>
						</select>
						<span id="timeCreatorDivider">- </span>
						<select
						id="maxTimeCreator"
						value={this.state.maxTime}
						onChange={this.onMaxTimeChangeEvent}
						className={this.props.selctorClass}
						>
							<option value="5" className="timeChooserOption">5 min</option>
							<option value="10" className="timeChooserOption">10 min</option>
							<option value="15" className="timeChooserOption">15 min</option>
							<option value="30" className="timeChooserOption">30 min</option>
							<option value="60" className="timeChooserOption">1 hour</option>
							<option value="180" className="timeChooserOption">3 hours</option>
							<option value="300" className="timeChooserOption">half day (5h)</option>
							<option value="480" className="timeChooserOption">full day+ (8h+)</option>
						</select>
					</div>
					<div className="invisible">error</div>
				</div>
			</React.Fragment>
		);
	}
}
