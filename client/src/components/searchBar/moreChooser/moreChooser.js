import React, { Component } from 'react'
import './moreChooser.css'
import '../searchBarCommonStyles.css'

export default class MoreChooser extends Component {
  constructor(){
    super();

    this.state = {
      place: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({place: event.target.value});
  }

  render() {
    return (
      <div class="searchBarChooserContainer" > 
        <div class="searchBarChooserData">
          <div>
            <input type="text" id="moreChooser" placeholder="#MoreInfo" onChange={this.handleChange} />
          </div>
        </div>
      </div>
    )
  }
}
