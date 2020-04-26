import React, { Component } from 'react'
import ReactList from 'react-list';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import { SET_CURRENT_IDEA } from '../../reducers/types';

//on click, open the idea in the middle like in search
//remove table on search
class topTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      ideas: [],
      isIdeaClicked: false,
      idea: {}
    }
  }

  ideasCount = 5

  showIdea = (idea, ideas) => {
    this.setState({ ideas: ideas })
    this.setState({ idea: idea })
    this.setState({ isIdeaClicked: true })
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

    if(index == 0) return <div className="combinedListHeader">liked</div>
    if(index == 6) return <div className="combinedListHeader">popular</div>
    if(index == 12) return <div className="combinedListHeader">newest</div>

    return <div onClick={ () => { this.showCombinedIdea(index) } }
              key={Math.random()}
              className="listRow" >  
              {title}
            </ div>
  }

  showCombinedIdea = (index) => {
    let showIdea = {}
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
          <IdeaCard idea={this.state.idea} ideas={this.state.ideas}  />
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
