import React, { Component } from 'react'

class ideaCardWithoutIndicators extends Component {
  render() {
    return (
      <div>
        <div id="ideaCard"> 
            <div id="ideaData">
                
            </div>
            <div className="ideaTitle"> 
              {this.props.title}
            </div>
            <div id="ideaContentText"> 
              {this.props.content}
            </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  
    return {
      title: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].title,
      content: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].content,
      place: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].place,
      minTIme: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].minTIme,
      maxTime: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].maxTime,
      minNumOfPeople: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].minNumOfPeople,
      maxNumOfPeople: state.searchPageReducer.ideas[state.searchPageReducer.currentIdeaIndex].maxNumOfPeople
    };
  }
  
  export default connect(mapStateToProps)(ideaCardWithoutIndicators);