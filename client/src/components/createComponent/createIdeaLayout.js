import { connect } from 'react-redux';
import React, { Component, createRef } from 'react'

import CreateIdeaButton from '../ideaCard/createIdeaButton'
import 'commonCss.css'
import 'components/layout.css'
import EditableIdeaAndButton from './editableIdeaAndButton';

export default class createIdeaLayout extends Component {
  render() {
    return (
      <React.Fragment>     
        <div id="createMainLayout">
          <EditableIdeaAndButton />
        </div> 
      </React.Fragment>
    )
  }
}



