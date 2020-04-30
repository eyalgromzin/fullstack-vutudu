import React, { Component } from 'react';
import { deleteIdea } from 'actions/ideaActions';
import { showIdeaInUserCreated, showUserEmptyIdeasPage } from 'components/uiActions/userPageActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './editIdeaCard.css';
import {toastr} from 'react-redux-toastr'
import 'cssAnimations.css'

class DeleteIdeaButton extends Component {
	deleteIdea = () => {
		this.props.deleteIdea(this.props.loggedInUserID, this.props.idea._id, this.ideaDeleted);
	};

	deleteAndShowNextIdea = () => {
		this.deleteIdea();
	}

	ideaDeleted = () => {
		toastr.success('Success', 'Idea Deleted!')
	}

	render() {
		return (
			<React.Fragment>
				<img
					src={require('images/garbage.png')}
					className="userPageIdeaButton tilt"
					id="deleteIdeaButton"
					onClick={() => this.deleteAndShowNextIdea()}
					/>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
	return {
		currentPreviewedIdeaType: state.userPageReducer.selectedDropDownType,
		isIdeaEdited: state.userPageReducer.isIdeaEdited,
		loggedInUserID: state.userPageReducer.loggedInUserID,
		userCreatedIdeas: state.userPageReducer.createdIdeas
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		deleteIdea: bindActionCreators(deleteIdea, dispatch),
		showIdeaInUserCreated: bindActionCreators(showIdeaInUserCreated, dispatch),
		dispatch
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteIdeaButton); //mapDispatchToProps
