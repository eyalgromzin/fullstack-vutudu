import React, { Component } from 'react'
import ReactList from 'react-list';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import 'components/ideasList/ideasList.css';
import { getImageLinkFromIdeaContent } from 'commonUtils'  
import {
  SET_CURRENT_IDEA,
  SET_SEARCH_IDEAS
} from 'reducers/types';
import FirebaseImage from 'components/firebaseImage'
import IdeasList from 'components/ideasList'

//on click, open the idea in the middle like in search
//remove table on search
class topTable extends Component {
  constructor(props) {
    super(props)

    

    this.state = {      
      isIdeaClicked: false,
      selectedIndex: 0,      
    }
  }

  showIdea = (idea) => {
    this.setState({ isIdeaClicked: true })

    //update current idea in search page reducer
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea })    
    
    let selectredIdeaIndex = this.state.ideas.indexOf(ideaI => ideaI.id == idea.id)
    this.setState({ selectedIndex: selectredIdeaIndex })
  }

  //happens on like click
  ideaUpdated = (idea) => {
    let ideas = [...this.props.topNewestIdeas,...this.props.topLikedPercentageIdeas, ...this.props.topLikedIdeas]
    let ideaIndex = ideas.indexOf(ideaI => ideaI.id == idea.id)
    ideas[ideaIndex] = idea
    this.setState({ideas: ideas})
  }

  renderCombinedItems = (index, key) => {  //key is running number
    let title = ""
    if(index >= 1 && index <= 5){
      title = this.props.topNewestIdeas[index - 1].title
    }else if(index >= 7 && index <= 11){
      title = this.props.topLikedPercentageIdeas[index - 7].title
    }else if(index >= 13 && index <= 17){
      title = this.props.topLikedIdeas[index - 13].title
    }

    if(index == 0) return <div className="combinedListHeader" key="1">Newest</div>
    if(index == 6) return <div className="combinedListHeader" key="2">popular</div>
    if(index == 12) return <div className="combinedListHeader" key="3">Liked</div>

    let actualIndex = 0
    if(this.state.selectedIndex >= 0){
      actualIndex = this.state.selectedIndex + 1
    }
    if(this.state.selectedIndex >= 5){
      actualIndex = this.state.selectedIndex + 2
    } 
    if(this.state.selectedIndex >= 10){ 
      actualIndex = this.state.selectedIndex + 3
    }


    if(index == actualIndex){
      return <div onClick={ () => { this.showCombinedIdea(index) } }
                key={Math.random()}
                className="selectedListRow" >  
                {title}
              </ div>
    }else{
      return <div onClick={ () => { this.showCombinedIdea(index) } }
                key={Math.random()}
                className="listRow" >  
                {title}
              </ div>
    }
  }

  showCombinedIdea = (index) => {
    if(index >= 1 && index <= 5){
      this.showIdea(this.props.topNewestIdeas[index - 1])
    }else if(index >= 7 && index <= 11){
      this.showIdea(this.props.topLikedPercentageIdeas[index - 7])
    }else if(index >= 13 && index <= 17){
      this.showIdea(this.props.topLikedIdeas[index - 13])
    }
  }

  renderPopularItem = (index, key) => {  //key is running number
    return <div onClick={ () => { this.showIdea(this.props.topLikedPercentageIdeas[index]) } } 
    key={Math.random()}
    className="listRow">   
      <div class="topTableItemTitle">{ this.props.topLikedPercentageIdeas[index].title }</div>
    </div>
  }

  renderNewItem = (index, key) => {  //key is running number
    return <div onClick={ () => { this.showIdea(this.props.topNewestIdeas[index]) } } 
    key={Math.random()}
    className="listRow">   
      <div class="topTableItemTitle">{this.props.topNewestIdeas[index].title}</div>
    </div>
  }

  onIdeaClicked = (idea) => {
    this.showIdea(idea)
  }

  createUnselectedTopTable = () => {
    return <React.Fragment>
        {/* <span >unselected </span> */}
        <div id="topTable">
          <div id="topTableHeader"> 
            Top 5
          </div>
          <div id="topTableColumnContainer">
            <div id="topLikedTable" className="topTableColumn">
              <span className="topTableHeader">Liked</span>                
                <IdeasList ideas={this.props.topLikedIdeas} imageClassName="topTableItemImage"
                  titleClassName="topTableItemTitle"                   
                  onClick={(idea) => this.onIdeaClicked(idea)} />
            </div>
            <div id="topPopularTable" className="topTableColumn">
              <span className="topTableHeader">Popular</span>
                <IdeasList ideas={this.props.topLikedPercentageIdeas} imageClassName="topTableItemImage"
                  titleClassName="topTableItemTitle"                   
                  onClick={(idea) => this.onIdeaClicked(idea)} />
            </div>
            <div id="topNewestTable" className="topTableColumn">
              <span className="topTableHeader">Newest</span>
                <IdeasList ideas={this.props.topNewestIdeas} imageClassName="topTableItemImage"
                  titleClassName="topTableItemTitle"                   
                  onClick={(idea) => this.onIdeaClicked(idea)} />
            </div>
          </div>
        </div>
      </React.Fragment>
  }

  onSelectedIdeaChange = (newIdea, newIndex) => {
    this.setState({idea: newIdea})
    this.setState({selectedIndex: newIndex})
  }

  createSelectedTopTable = () => {
    let type = "simple"

    return <React.Fragment>
      <div id="topTableClicked">
        <div id="topTableListsClicked">
          <ReactList
            itemRenderer={this.renderCombinedItems}
            length={ this.props == null || this.props.topLikedIdeas == null? 0 : 18 }
            type='uniform' type={type}
          />
        </div>
        <div id="topTableIdea">
          <IdeaCard ideas={this.state.ideas} 
              onSelectedIdeaChange={this.onSelectedIdeaChange} enabled={true} showNextPreviousButtons={true} 
              cardLeftArrowContainerClassName="topTableCardLeftArrowContainer" 
              cardRightArrowContainerClassName="topTableCardRightArrowContainer"/>
        </div>
      </div>
    </React.Fragment>
  }

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps !== undefined &&  nextProps != this.props){
      if(nextProps.topNewestIdeas !== undefined && nextProps.topLikedPercentageIdeas !== undefined && 
            nextProps.topLikedIdeas !== undefined){
        let ideas = [...nextProps.topNewestIdeas,...nextProps.topLikedPercentageIdeas, ...nextProps.topLikedIdeas]
        this.setState({ ideas: ideas })
      }
      return true
    }
    
    if(nextState != this.state){
      return true
    }
  }

  render() {
    var selectedTopTable = this.createSelectedTopTable()
    var unselectedTopTable = this.createUnselectedTopTable()

    if(this.props.shouldBeClean){
      return unselectedTopTable 
    }else if(this.state.isIdeaClicked){
      return selectedTopTable
    }else{
      return unselectedTopTable 
    }
  }
}

function mapStateToProps(state) {
  return {
    topLikedIdeas: state.topTableReducer.topLikedIdeas,
    topLikedPercentageIdeas: state.topTableReducer.topLikedPercansubjecteIdeas,
    topNewestIdeas: state.topTableReducer.topNewestIdeas,
  };
}

export default connect(mapStateToProps)(topTable); 
