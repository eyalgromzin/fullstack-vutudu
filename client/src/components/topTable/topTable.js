import React, { Component } from 'react'
import ReactList from 'react-list';
import { bindActionCreators } from 'redux';
import './topTable.css'
import store from 'store'
import { connect } from 'react-redux';
import IdeaCard from 'components/ideaCard/ideaCard'
import 'components/ideasList.css';
import { getImageLinkFromIdeaContent } from 'commonUtils'  
import {
  SET_CURRENT_IDEA,
  SET_SEARCH_IDEAS,
  SET_TOP_TABLE_IS_IDEA_CLICKED,
  SET_IS_MAIN_LOADING
} from 'reducers/types';
import FirebaseImage from 'components/firebaseImage'
import IdeasList from 'components/ideasList'
import { updateTopIdeas } from 'actions/ideaActions';

//on click, open the idea in the middle like in search
//remove table on search
class topTable extends Component {
  constructor(props) {
    super(props)

    this.state = {      
      selectedLikedIndex: 0,      
      selectedLikedRatioIndex: 0,      
      selectedNewestIndex: 0,
      ideas: [],
      ideaCardRef: undefined     //React.createRef()
    }
  }

  componentWillMount(){
    //get top table results
    if(this.props.topLikedIdeas === undefined || this.props.topLikedIdeas.length == 0){
      this.props.dispatch({type: SET_IS_MAIN_LOADING, payload: true})
      console.log("getting top ideas")
      this.props.updateTopIdeas();
    }
  }

  showIdea = (idea) => {
    this.props.dispatch({type: SET_TOP_TABLE_IS_IDEA_CLICKED, payload: true})

    //update current idea in search page reducer
    this.props.dispatch({ type: SET_CURRENT_IDEA, payload: idea })    
  }

  //happens on like click
  // ideaUpdated = (idea) => {
    //  let ideas = [...this.props.topNewestIdeas,...this.props.topLikedPercentageIdeas, ...this.props.topLikedIdeas]
  //   let ideaIndex = ideas.indexOf(ideaI => ideaI.id == idea.id)
  //   ideas[ideaIndex] = idea
  //   this.setState({ideas: ideas})
  // }

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

  onLikedIdeaClicked = (idea) => {
    let selectedIndex = -1
    for (let i = 0; i < this.props.topLikedIdeas.length; i++){
      if(this.props.topLikedIdeas[i]._id == idea._id){
        selectedIndex = i;
      }
    }

    this.setState({ selectedLikedIndex: selectedIndex })
    this.setState({ selectedLikedRatioIndex: -1 })
    this.setState({ selectedNewestIndex: -1 })
    this.setState({ totalIdeaIndex: selectedIndex })
    this.setState({ ideas: this.props.topLikedIdeas })

    if(this.state.ideaCardRef !== undefined){
      this.state.ideaCardRef.setIdeaIndex(selectedIndex)
    }

    this.showIdea(idea)
  }

  onLikedRatioIdeaClicked = (idea) => {
    let selectedIndex = -1
    for (let i = 0; i < this.props.topLikedPercentageIdeas.length; i++){
      if(this.props.topLikedPercentageIdeas[i]._id == idea._id){
        selectedIndex = i;
      }
    }

    if(this.state.ideaCardRef !== undefined){
      this.state.ideaCardRef.setIdeaIndex(selectedIndex + 5)
    }

    this.setState({ selectedLikedIndex: -1 })
    this.setState({ selectedLikedRatioIndex: selectedIndex })
    this.setState({ selectedNewestIndex: -1 })
    this.setState({ ideas: this.props.topLikedPercentageIdeas })

    this.showIdea(idea)
  }

  onNewestIdeaClicked = (idea) => {
    let selectedIndex = -1
    for (let i = 0; i < this.props.topNewestIdeas.length; i++){
      if(this.props.topNewestIdeas[i]._id == idea._id){
        selectedIndex = i;
      }
    }

    if(this.state.ideaCardRef !== undefined){
      this.state.ideaCardRef.setIdeaIndex(selectedIndex + 10)
    }

    this.setState({ selectedLikedIndex: -1 })
    this.setState({ selectedLikedRatioIndex: -1 })
    this.setState({ selectedNewestIndex: selectedIndex })
    this.setState({ ideas: this.props.topNewestIdeas })

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
              <div className="topTableHeader">Liked</div>                
                <IdeasList ideas={this.props.topLikedIdeas}  
                  imageClassName="topTableItemImage" 
                  titleClassName="topTableListItemTitle" 
                  isToShowImage={true}  
                  listItemClassName="topTableListItem"                                 
                  onClick={(idea) => this.onLikedIdeaClicked(idea)}  />
            </div>
            <div id="topPopularTable" className="topTableColumn">
              <div className="topTableHeader">Popular</div>
                <IdeasList ideas={this.props.topLikedPercentageIdeas} imageClassName="topTableItemImage"
                  titleClassName="topTableListItemTitle" isToShowImage={true}  listItemClassName="topTableListItem"                    
                  onClick={(idea) => this.onLikedRatioIdeaClicked(idea)} 
                   />
            </div>
            <div id="topNewestTable" className="topTableColumn">
              <div className="topTableHeader">Newest</div>
                <IdeasList ideas={this.props.topNewestIdeas} imageClassName="topTableItemImage"
                  titleClassName="topTableListItemTitle"  isToShowImage={true} listItemClassName="topTableListItem"                          
                  onClick={(idea) => this.onNewestIdeaClicked(idea)} />
            </div>
          </div>
        </div>
      </React.Fragment>
  }

  // onSelectedIdeaChange = (newIdea, newIndex) => {
  //   this.setState({idea: newIdea})
  //   this.setState({selectedIndex: newIndex})
  // }

  onSelectedIndexChange = (index) => {
    // this.setState({})
    if(index >= 0 && index <= 4){
      this.setState({selectedLikedIndex: index})
    }else if(index >= 7 && index <= 11){
      this.setState({selectedLikedRatioIndex: index - 5})
    }else if(index >= 13 && index <= 17){
      this.setState({selectedNewestIndex: index - 10})
    }
  }

  createSelectedTopTable = () => {
    let type = "simple"

    return <React.Fragment>
      <div id="topTableClicked">
        <div id="topTableListsClicked">
          <IdeasList ideas={this.state.ideas}  imageClassName="topTableItemImage" 
                  titleClassName="topTableListItemTitle" isToShowImage={false}  listItemClassName="topTableListItem"               
                  selectedListItemClassName="topTableSelectedTitleClassName" selectedIndex={this.state.selectedLikedIndex}
                  onClick={(idea) => this.onLikedIdeaClicked(idea)} />          
        </div>
        <div id="topTableIdea">
          <IdeaCard ideas={this.state.ideas} 
              enabled={true} 
              wrappedComponentRef={ref => {
                if(this.state.ideaCardRef === undefined)
                  this.setState({ideaCardRef: ref})
              }}
              ideaIndex={this.state.totalIdeaIndex}
              showNextPreviousButtons={true} 
              onSelectedIndexChange={this.onSelectedIndexChange}
              cardLeftArrowContainerClassName="topTableCardLeftArrowContainer" 
              cardRightArrowContainerClassName="topTableCardRightArrowContainer"/>
        </div>
      </div>
    </React.Fragment>
  }

  // shouldComponentUpdate(nextProps, nextState){
  //   if(nextProps !== undefined &&  nextProps != this.props){
  //     if(nextProps.topNewestIdeas !== undefined && nextProps.topLikedPercentageIdeas !== undefined && 
  //           nextProps.topLikedIdeas !== undefined){
  //       // let ideas = [...nextProps.topNewestIdeas,...nextProps.topLikedPercentageIdeas, ...nextProps.topLikedIdeas]
  //       // this.setState({ ideas: ideas })
  //     }
  //     return true
  //   }
    
  //   if(nextState != this.state){
  //     return true
  //   }
  // }

  render() {
    var selectedTopTable = this.createSelectedTopTable()
    var unselectedTopTable = this.createUnselectedTopTable()

    if(this.props.wasIdeaClicked){
      return selectedTopTable
    }else{
      return unselectedTopTable 
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateTopIdeas: bindActionCreators (updateTopIdeas, dispatch),
    dispatch,
  }
}

function mapStateToProps(state) {
  return {
    topLikedIdeas: state.topTableReducer.topLikedIdeas,
    topLikedPercentageIdeas: state.topTableReducer.topLikedPercansubjecteIdeas,
    topNewestIdeas: state.topTableReducer.topNewestIdeas,
    wasIdeaClicked: state.topTableReducer.wasIdeaClicked,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(topTable); 
