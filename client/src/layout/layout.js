import React, { Component } from 'react'
import './layout.css'
import { connect } from 'react-redux';
import LoginScreen from '../components/loginScreen/loginScreen'
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import createLayout from '../components/createCopmonent/createLayout';
import searchLayout from '../components/searchLayout/searchLayout';
import userLayout from '../components/layouts/userLayout/userLayout';
import SideBar from 'components/sideBar'
import { getTopIdeas } from 'actions/ideaActions';


// export const showIdeaPage = 'SHOW_IDEAS';

class Layout extends Component {
  componentWillMount(){
    //get top table results
    this.props.getTopIdeas();
    //update top table
    
  }
  
  render() {
    return (
      <React.Fragment>
        <LoginScreen />
        <Router>
          <React.Fragment>
              <SideBar />
              <Redirect from="/" to="/search" />  {/* cause on startup , the url is /, and it shows nothing */}
              <Route path="/search" component={searchLayout} />
              <Route path="/create" component={createLayout} />
              <Route path="/user" component={userLayout} />
          </ React.Fragment>
        </Router>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTopIdeas: bindActionCreators (getTopIdeas, dispatch),
    dispatch,
  }
}
 
function mapStateToProps(state) {
  return {
    loggedIn: state.commonReducer.loggedIn,
    userID: state.userPageReducer.loggedInUserID,
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Layout);    