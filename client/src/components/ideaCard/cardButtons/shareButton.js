import React, { Component } from 'react';
import './cardButtons.css';
import 'commonCss.css'
import Modal from 'react-modal';
import { FacebookShareButton, GooglePlusShareButton, WhatsappShareButton, EmailShareButton } from 'react-share';
import {
  FacebookIcon,
  WhatsappIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import store from 'store'
import { connect } from 'react-redux';

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

class ShareButton extends Component {
	constructor() {
		super();
		this.state = {
			showModal: false
		};

		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
	}

	shareButtonClick = (e) => {
		//open a dialog with all share options:
		// google, facebook, whatsapp, mail
		this.setState({ showModal: true });
	};

	handleOpenModal = () => {
		this.setState({ showModal: true });
	};

	handleCloseModal = () => {
		this.setState({ showModal: false });
  };
  
  createUrlShareUrlText = () => {
    let domainName = window.location.href;
    let ideaID = this.props.currentIdea._id

    let shareUrl = domainName + 'idea/' + ideaID
    return shareUrl
  }

	render() {
    var url = this.createUrlShareUrlText()

		return (
			<React.Fragment>
				<img src={require('images/share.png')} onClick={this.shareButtonClick} alt="share" id="shareButton" />

				<Modal isOpen={this.state.showModal} style={customStyles} contentLabel="Share">
					<div id="shareDialog">
						<div class="dialogHeader">
              Share
              <span onClick={this.handleCloseModal} id="shareCloseButton" class="hoverClickHand">x</span>
            </div> 
						<div id="shareDialogButtonsContainer">
            <span><FacebookShareButton url={url}> <FacebookIcon size={32} round={true} /> </FacebookShareButton> </span>
						<span><GooglePlusShareButton url={url}> <GooglePlusIcon size={32} round={true} /> </GooglePlusShareButton> </span>
							<WhatsappShareButton url={url}> <WhatsappIcon size={32} round={true} /> </WhatsappShareButton> 
							<EmailShareButton url={url}> <EmailIcon size={32} round={true} /> </EmailShareButton> 
						</div>
						{/* <button id="shareDialogClose" >
							
						</button> */}
					</div>
				</Modal>
			</React.Fragment>
		);
	}
}

function mapStateToProps(state) {
  return {
    currentIdeaIndex: state.searchPageReducer.currentIdeaIndex,
    currentIdea: state.searchPageReducer.currentIdea
  };
}

export default connect(mapStateToProps)(ShareButton);