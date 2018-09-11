import React, { Component } from 'react'
import './numOfPeopleSelector.css'
import '../searchBarCommonStyles.css'

export default class NumOfPeopleSelector extends Component {
  constructor(){
    super();
  }

  change(){
        
  }

  render() {
    return (
       
      <div class="searchBarChooserContainer" > 
        <div class="searchBarChooserData">
          <img src={require("images/people.png")} class="searchBarIcon " />
            <select id="numOfPeopleChooser" class="" >
              <option value="1" class="timeChooserOption">1</option>
              <option value="2" class="timeChooserOption" selected="selected">2</option>
              <option value="2c" class="timeChooserOption">couple</option>
              <option value="3-6" class="timeChooserOption">3-6</option>
              <option value="7+" class="timeChooserOption">7+</option>
            </select>
        </div>
      </div>
    )
  }
}
