import React, { Component } from 'react'
import ReactList from 'react-list';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import 'components/ideasList/ideasList.css';
import { SET_CURRENT_IDEA } from '../../reducers/types';
import { findIdeaIndex } from 'commonUtils'

//on click, open the idea in the middle like in search
//remove table on search
class topTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ideas: [],
      isIdeaClicked: false,
      idea: {},
      selectedIndex: 0
    }
  }

  ideasCount = 5

  showIdea = (idea) => {
    let ideas = [...this.props.topNewestIdeas,...this.props.topPopularIdeas, ...this.props.topLikedIdeas]
    this.setState({ ideas: ideas })
    this.setState({ idea: idea })
    this.setState({ isIdeaClicked: true })

    let selectredIdeaIndex = findIdeaIndex(idea, ideas)
    this.setState({ selectedIndex: selectredIdeaIndex })
  }

  renderCombinedItems = (index, key) => {  //key is running number
    let title = ""
    if(index >= 1 && index <= 5){
      title = this.props.topNewestIdeas[index - 1].title
    }else if(index >= 7 && index <= 11){
      title = this.props.topPopularIdeas[index - 7].title
    }else if(index >= 13 && index <= 17){
      title = this.props.topLikedIdeas[index - 13].title
    }

    if(index == 0) return <div className="combinedListHeader">Newest</div>
    if(index == 6) return <div className="combinedListHeader">popular</div>
    if(index == 12) return <div className="combinedListHeader">Liked</div>

    let actualIndex = 0
    if(this.state.selectedIndex >= 0) actualIndex = this.state.selectedIndex + 1
    if(this.state.selectedIndex >= 5) actualIndex = this.state.selectedIndex + 2
    if(this.state.selectedIndex >= 10) actualIndex = this.state.selectedIndex + 3

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
      this.showIdea(this.props.topNewestIdeas[index - 1], this.props.topNewestIdeas)
    }else if(index >= 7 && index <= 11){
      this.showIdea(this.props.topPopularIdeas[index - 7], this.props.topNewestIdeas)
    }else if(index >= 13 && index <= 17){
      this.showIdea(this.props.topLikedIdeas[index - 13], this.props.topNewestIdeas)
    }
  }

  renderLikedItem = (index, key) => {  //key is running number
    return <div onClick={ () => { this.showIdea(this.props.topLikedIdeas[index], this.props.topLikedIdeas) } } 
    key={Math.random()}
    className="listRow">   
      {this.props.topLikedIdeas[index].title}
    </div>;
  }

  renderPopularItem = (index, key) => {  //key is running number
    return <div onClick={ () => { this.showIdea(this.props.topPopularIdeas[index], this.props.topPopularIdeas) } } 
    key={Math.random()}
    className="listRow">   
      { this.props.topPopularIdeas[index].title }
    </div>
  }

  renderNewItem = (index, key) => {  //key is running number
    return <div onClick={ () => { this.showIdea(this.props.topNewestIdeas[index], this.props.topNewestIdeas) } } 
    key={Math.random()}
    className="listRow">   
      {this.props.topNewestIdeas[index].title}
    </div>
  }

  createUnselectedTopTable = () => {
    return <React.Fragment>
        {/* <span >unselected </span> */}
        <div id="topTable">
          <div id="topTableHeader"> 
            Top 5 Ideas
          </div>
          <div id="topTableColumnContainer">
            <div id="topLikedTable">
              <span className="topTableHeader">Liked</span>
                <ReactList
                        itemRenderer={this.renderLikedItem}
                        length={this.props == null || this.props.topLikedIdeas == null? 0 : this.props.topLikedIdeas.length }
                        type='uniform'
                      />
            </div>
            <div id="topPopularTable">
              <span className="topTableHeader">Popular</span>
                <ReactList
                  itemRenderer={this.renderPopularItem}
                  length={this.props == null || this.props.topPopularIdeas == null? 0 : this.props.topPopularIdeas.length }
                  type='uniform'
                />
            </div>
            <div id="topNewestTable">
              <span className="topTableHeader">Newest</span>
                <ReactList
                  itemRenderer={this.renderNewItem}
                  length={this.props == null || this.props.topNewestIdeas == null? 0 : this.props.topNewestIdeas.length }
                  type='uniform' 
                />
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
          <IdeaCard idea={this.state.idea} ideas={this.state.ideas} 
              onSelectedIdeaChange={this.onSelectedIdeaChange} enabled={true} showNextPreviousButtons={true} 
              cardLeftArrowContainerClassName="topTableCardLeftArrowContainer" 
              cardRightArrowContainerClassName="topTableCardRightArrowContainer"/>
        </div>
      </div>
    </React.Fragment>
  }

  render() {
    var selectedTopTable = this.createSelectedTopTable()
    var unselectedTopTable = this.createUnselectedTopTable()

    if(this.state.isIdeaClicked){
      return selectedTopTable
    }else{
      return unselectedTopTable 
    }
  }
}

function mapStateToProps(state) {
  return {
    topLikedIdeas: state.topTableReducer.topLikedIdeas,
    topPopularIdeas: state.topTableReducer.topPopularIdeas,
    topNewestIdeas: state.topTableReducer.topNewestIdeas,
  };
}

export default connect(mapStateToProps)(topTable); 
