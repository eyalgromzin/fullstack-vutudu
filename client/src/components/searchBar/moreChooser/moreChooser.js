import React, { Component } from 'react'
import './moreChooser.css'
import '../searchBarCommonStyles.css'

export default class MoreChooser extends Component {
  render() {
    return (
      <React.Fragment>
        <input type="text" id="moreChooser" className={this.props.cssClass} 
        placeholder="#MoreInfo" onChange={this.props.onChangeEvent} value={this.props.more} />
      </React.Fragment>
    )
  }
}
