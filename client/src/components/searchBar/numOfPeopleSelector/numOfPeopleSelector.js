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
              <option value="2000" class="timeChooserOption">couple</option>
              <option value="3" class="timeChooserOption">3</option>
              <option value="4" class="timeChooserOption">4</option>
              <option value="5" class="timeChooserOption">5</option>
              <option value="6" class="timeChooserOption">6</option>
              <option value="7" class="timeChooserOption">7</option>
              <option value="8000" class="timeChooserOption">7+</option>
            </select>
        </div>
      </div>
    )
  }
}
