import React, { Component } from 'react'
import ReactList from 'react-list';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import 'components/ideasList/ideasList.css';
import { 
  SET_CURRENT_IDEA,
  SET_SEARCH_IDEAS
} from 'reducers/types';

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
    let ideas = [...this.props.topNewestIdeas,...this.props.topLikedPercansubjecteIdeas, ...this.props.topLikedIdeas]
    let ideaIndex = ideas.indexOf(ideaI => ideaI.id == idea.id)
    ideas[ideaIndex] = idea
    this.setState({ideas: ideas})
  }

  renderCombinedItems = (index, key) => {  //key is running number
    let title = ""
    if(index >= 1 && index <= 5){
      title = this.props.topNewestIdeas[index - 1].title
    }else if(index >= 7 && index <= 11){
      title = this.props.topLikedPercansubjecteIdeas[index - 7].title
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
      this.showIdea(this.props.topNewestIdeas[index - 1], this.props.topNewestIdeas)
    }else if(index >= 7 && index <= 11){
      this.showIdea(this.props.topLikedPercansubjecteIdeas[index - 7], this.props.topNewestIdeas)
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
    return <div onClick={ () => { this.showIdea(this.props.topLikedPercansubjecteIdeas[index], this.props.topLikedPercansubjecteIdeas) } } 
    key={Math.random()}
    className="listRow">   
      { this.props.topLikedPercansubjecteIdeas[index].title }
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
                  length={this.props == null || this.props.topLikedPercansubjecteIdeas == null? 0 : this.props.topLikedPercansubjecteIdeas.length }
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
      if(nextProps.topNewestIdeas !== undefined && nextProps.topLikedPercansubjecteIdeas !== undefined && 
            nextProps.topLikedIdeas !== undefined){
        let ideas = [...nextProps.topNewestIdeas,...nextProps.topLikedPercansubjecteIdeas, ...nextProps.topLikedIdeas]
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
    topLikedPercansubjecteIdeas: state.topTableReducer.topLikedPercansubjecteIdeas,
    topNewestIdeas: state.topTableReducer.topNewestIdeas,
  };
}

export default connect(mapStateToProps)(topTable); 
