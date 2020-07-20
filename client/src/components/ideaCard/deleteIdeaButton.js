import React, { Component } from 'react';
import { deleteIdea } from 'actions/ideaActions';
import { showIdeaInUserCreated, showUserEmptyIdeasPage } from 'components/uiActions/userPageActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './editIdeaCard.css';
import {toastr} from 'react-redux-toastr'
import Modal from 'react-modal';
import 'cssAnimations.css'

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

class DeleteIdeaButton extends Component {
	constructor(props){
		super(props)

		this.state = {
			showUserEmptyIdeasPage: false,
		  }
	}

	deleteIdea = () => {
		this.setState({showModal: false})
		this.props.deleteIdea(this.props.loggedInUserID, this.props.idea._id, this.ideaDeleted);
	};

	ideaDeleted = () => {
		toastr.success('Deleted!!', 'Idea Deleted!')
		this.props.onIdeaDeleted()
	}

	render() {
		return (
			<React.Fragment>
				<Modal isOpen={this.state.showModal} style={customStyles} contentLabel="Delete?">
					<div>
						<div className="modalDialogHeader">delete?</div>
						<div className="modalDialogButton" onClick={() => this.setState({showModal: false})}>
							Cancel
						</div>
						<div className="modalDialogButton" onClick={() => this.deleteIdea()}>
							Delete
						</div>
					</div>
				</Modal>
				<img
					src={require('images/garbage.png')}
					className="userPageIdeaButton tilt"
					id="deleteIdeaButton"
					onClick={() => this.setState({showModal: true})}
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
