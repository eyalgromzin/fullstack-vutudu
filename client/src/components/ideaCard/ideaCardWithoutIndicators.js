import React, { Component } from 'react'

class ideaCardWithoutIndicators extends Component {
  render() {
    return (
      <div>
        <div id="ideaCard"> 
            <div id="ideaData">
                
            </div>
            <div class="ideaTitle"> 
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
      title: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].title,
      content: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].content,
      place: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].place,
      minTIme: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minTIme,
      maxTime: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxTime,
      minNumOfPeople: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].minNumOfPeople,
      maxNumOfPeople: state.ideasReducer.ideas[state.ideasReducer.currentIdeaIndex].maxNumOfPeople
    };
  }
  
  export default connect(mapStateToProps)(ideaCardWithoutIndicators);