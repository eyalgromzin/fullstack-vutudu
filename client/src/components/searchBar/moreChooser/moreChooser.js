import React, { Component } from 'react'
import './moreChooser.css'
import 'commonCss.css'

import '../searchBarCommonStyles.css'
import { connect } from 'react-redux';

class MoreChooser extends Component {
  constructor(props){
    super(props)

    this.state = {
      isValid: true
    }
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="inlineBlock">
          <input type="text" id="moreChooser" className={this.props.cssClass} 
          placeholder="#MoreInfo" onChange={this.props.onChangeEvent} value={this.props.more} />
          <div className="invisible">error</div>
        </div>
      </React.Fragment>
    )
  }
}

export default connect()(MoreChooser);
