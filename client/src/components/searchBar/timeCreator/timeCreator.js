import React, { Component } from 'react';
import './timeCreator.css';
import '../searchBarCommonStyles.css';
import {
	EDITABLE_IDEA_SET_MIN_TIME,
	EDITABLE_IDEA_SET_MAX_TIME
} from 'reducers/types'
import { search } from '../searchBarCommon';
import store from 'store';
import 'commonCss.css';
import { connect } from 'react-redux';

export default class TimeCreator extends Component {
	constructor(props) {
		super(props);

		this.state = {
			minTime: 10,
			maxTime: 10,
			isValid: true
		};
	}

	clearSelection = () => {
		this.setState({
			minTime: 10,
			maxTime: 10
		})
	}

	onMinTimeChangeEvent = (e) => {
		let value = parseInt(e.target.value)
		store.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: value});
		this.setState({minTime: value})
	}
		
	onMaxTimeChangeEvent = (e) => {
		let value = parseInt(e.target.value)
		store.dispatch({type: EDITABLE_IDEA_SET_MAX_TIME, payload: value});
		this.setState({maxTime: value})
	}

	setMinTime = (time) => {
		this.setState({minTime: time})
		store.dispatch({type: EDITABLE_IDEA_SET_MIN_TIME, payload: time});
	}

	setMaxTime = (time) => {
		this.setState({maxTime: time})
		store.dispatch({type: EDITABLE_IDEA_SET_MAX_TIME, payload: time});
	}

	validate = () => {
		if(this.state.minTime > this.state.maxTime){
			this.setState({isValid: false})
			return false
		}

		this.setState({isValid: true})
		return true
	}

	clear = () => {
		this.setState({minTime: 10,
						maxTime: 10
					}) 
    }

	render() {
		return (
			<React.Fragment>
				<div id="timeCreatorField" className={this.props.fieldClass}>
					<div id="timeCreatorSelectors" >
						<select
						id="minTimeCreator"
						value={this.state.minTime}
						onChange={this.onMinTimeChangeEvent}
						className={this.state.isValid? this.props.selctorClass : this.props.selctorClass + " errorBackground"}
						>
							<option value="0" className="timeChooserOption">Min Time</option>
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
						className={this.state.isValid? this.props.selctorClass : this.props.selctorClass + " errorBackground"}
						>
							<option value="0" className="timeChooserOption">Max Time</option>
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
				</div>
			</React.Fragment>
		);
	}
}
