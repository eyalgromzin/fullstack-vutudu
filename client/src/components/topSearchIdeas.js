import React, { Component } from 'react';
import { storageRef } from 'commonUtils'
import 'components/layout.css'
import ReactTooltip from "react-tooltip";


export default class TopSearchIdeas extends Component {
  constructor(props){
    super(props)

    this.state = {
      lang: "",
    }
  }

  render() {
    return (
      <div id="topSearchIdeas">
        <div id="leftSideaSearchIdeas">
          <div class="topSearchIdeasTitle">Top Places</div>
          <div>
            <div class="topSearchesItem">
              <div id="topSearchWorkItem" class="imageAndTextContainer">
                <img id="topSearchIdeasWork" className="topSearchIdeasImage" 
                  onClick={() => this.props.searchWord("work")}
                  src={require("images/work.jpg")} 
                  alt="Work" 
                  data-tip data-for='home'/>
                <div class="topImageText">Work</div>
              </div>
            </div>
            <div class="topSearchesItem">
              <div id="topSearchHomeItem" class="imageAndTextContainer">
                <img id="topSearchIdeasHome" className="topSearchIdeasImage" 
                  src={require("images/home.jpg")} 
                  onClick={() => this.props.searchWord("home")}
                  alt="Home" 
                  data-tip data-for='home'/>
                <div class="topImageText">Home</div>
              </div>
            </div>
            {/* <img id="topSearchIdeasWork" className="topSearchIdeasImage" src={require("images/work.jpg")} alt="Home" /> */}
          </div>
          <div>
          <div class="topSearchesItem">
              <div id="topSearchBarItem" class="imageAndTextContainer">
                <img id="topSearchIdeasBar" className="topSearchIdeasImage" 
                  src={require("images/bar.jpg")} 
                  onClick={() => this.props.searchWord("bar")}
                  alt="Bar" 
                  data-tip data-for='Bar'/>
                <div class="topImageText">Bar</div>
              </div>
            </div>
            <div class="topSearchesItem">
              <div id="topSearchBeachItem" class="imageAndTextContainer">
                <img id="topSearchIdeasHome" className="topSearchIdeasImage" 
                  src={require("images/beach.jpg")} 
                  alt="beach" 
                  onClick={() => this.props.searchWord("beach")}
                  data-tip data-for='beach'/>
                <div class="topImageText">Beach</div>
              </div>
            </div>
          </div>
        </div>
        <div id="rightSideaSearchIdeas">
          <div class="topSearchIdeasTitle">Top Subjects</div>
          <div>
            <div id="topSearchIdeasSport" 
              onClick={() => this.props.searchWord("sport")}
              className="topSearchIdeasSubject" >
              <div className="topSubjectText"> #Sport </div>
            </div>
            <div id="topSearchIdeasProductive" className="topSearchIdeasSubject" 
              onClick={() => this.props.searchWord("work")}>
              <div className="topSubjectText"> #Productive </div>
            </div>
          </div>
          <div>
            <div id="topSearchIdeasFun" className="topSearchIdeasSubject"
              onClick={() => this.props.searchWord("fun")}
              >
              <div className="topSubjectText">#Fun</div>
            </div>
            <div id="topSearchIdeasFood" className="topSearchIdeasSubject"
              onClick={() => this.props.searchWord("food")}>
              <div className="topSubjectText"> #Food </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  