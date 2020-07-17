import React, { Component }  from 'react';
import FirebaseImage from 'components/firebaseImage'
// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs

// import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/storage";

var firebase = require("firebase/app");

// Add the Firebase products that you want to use
// require("firebase/auth");
// require("firebase/firestore");
      
// databaseURL: '<your-database-url>',
var firebaseConfig = {
  apiKey: 'AIzaSyAw3EdNp0ZsUm4v6LDnaVNUXMm0VDxypAk',
  authDomain: 'https://vutudu-1535457518831.firebaseapp.com',
  projectId: 'vutudu-1535457518831',
  storageBucket: 'gs://vutudu-1535457518831.appspot.com'
};

firebase.initializeApp(firebaseConfig);

firebase.auth().signInAnonymously().catch(function(error) {
  console.error(error.message);
});

export var storageRef = firebase.storage().ref()

export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele._id != ideaID
    );

    return arrayWithoutIdea;
}


export const loggedInWith = { loggedInWith: "None" }

export const  getBase64 = (file, callBack) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callBack(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const createUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
     return v.toString(16);
  });
}

export const uploadBase64ImageToStorage = (base64Image, cloudPath, callBack) => {  
  if(base64Image === undefined){
    return
  }
  var imageRef = storageRef.child(cloudPath);
  imageRef.putString(base64Image, 'data_url', {contentType:'image/jpg'}).then(function(snapshot) {
    callBack()
  });
}

export const moveUnlikedIdeasToBack = (ideas, userID) => {
  if(ideas === undefined || ideas.length == 0 || userID === undefined || userID == ""){
    return ideas
  }

  let dislikedIdeas = []
  let regularIdeas = []
  ideas.forEach(function(idea) {
    if(idea.disliked.includes(userID)){
      dislikedIdeas.push(idea)
    }else{
      regularIdeas.push(idea)
    }
  });

  regularIdeas.push(...dislikedIdeas)

  return regularIdeas
}

// export const findIdeaIndex = (idea, ideas) => {
//   let index = ideas.findIndex(ideaI => idea._id == ideaI._id)
//   return index < 0? 0 : index
// }

export const getTagsFromContent = (inputText) => {  //http://geekcoder.org/js-extract-hashsubjects-from-text/
  var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
  var matches = [];
  var match;

  while ((match = regex.exec(inputText))) {
      matches.push(match[1]);
  }

  return matches;
}

export const findPreviousSeparatorIndex = (text, startIndex, separators) => {
  var i = startIndex
  var foundIndex = 0
  separators = [' ', '\n', ',']
  
  for(i = startIndex; i >= 0; i--){
    separators.forEach(function(separator) {
      if (text[i] == separator){
        foundIndex = i
        i = -1
      }
    });
  }
  return foundIndex
}

const convertLine = (line, endSeparator) => {
  // doesnt help
  // if (endSeparator == '\n'){
  //   endSeparator = '<br />'
  // }
  if(line.includes('https://www.youtube.com/watch?v=')){
    var videoID = line.split("https://www.youtube.com/watch?v=")[1]

    var convertedYoutubeLink = '<div class="youtubeLink"><object width="400" height="315" data="https://www.youtube.com/embed/' + videoID + '" /></div>'

    return convertedYoutubeLink + endSeparator
  }
  else if(line.endsWith(".jpg") || line.endsWith(".png") || line.endsWith(".gif") || line.endsWith(".jpeg")){
    //e.g. https://kidshealth.org/EN/images/illustrations/ASDestab_433x259_enIL.png
    var convertedYoutubeLink = '<div class="contentImageLink"><a target="_blank" href="' + line + '"><img src="' + line + '" height="315" /></a></div>'
    return convertedYoutubeLink + endSeparator
  }
  else{
    return line + endSeparator
  }
}

export const convertLinksToContent = (text) => {
    if (typeof(text) == 'undefined'){
        return ""
    }
    var convertedText = []
    // var words = text.split(/[\s,\n]+/);
    var endOfText = text.length
    var i = 0
    var symbol = ''
    var separators = [' ', '\n', ',']

    for (i = 0; i <= endOfText; i++){
      symbol = ''

      //check ???
      separators.forEach(function(separator, index) {
        if (text[i] == separator){
          symbol = separator;
        }
        else if(i == endOfText){
          symbol = ' '
        }
      });

      if (symbol == ''){
        continue;
      }

      var previousSeparatorIndex = 0
      if (i == endOfText){
        previousSeparatorIndex = findPreviousSeparatorIndex(text, i - 1, separators)
      }else{
        previousSeparatorIndex = findPreviousSeparatorIndex(text, i - 1, separators)
      }

      if (previousSeparatorIndex != 0){
        previousSeparatorIndex += 1
      }

      var line = text.substring(previousSeparatorIndex, i);
      var convertedLine = convertLine(line, symbol)
      
      convertedText.push(convertedLine)
    }

    var output = convertedText.join("")
    return output
}

export const convertJsonContentToJsx = (ideaContentJson, callBack) => {
  if(ideaContentJson === undefined) {
    return <div></div>
  }
  
  var contentJsx
  
  var ideaContentItemsList = JSON.parse(ideaContentJson);
  ideaContentItemsList.forEach(contentItem => {
    if(contentItem.first == "TEXT"){
      contentJsx = <div>{contentItem.third}</div>
    }else if(contentItem.first == "LINK"){
      contentJsx = <div class='centerHorizontally'><a href={contentItem.fourth}>{contentItem.third}</a></div>
    }
    else if(contentItem.first == "IMAGE"){
      contentJsx = <div><FirebaseImage firebasePath={contentItem.third} imageClassName="contentImage" /></div>
    }else if(contentItem.first == "YOUTUBE"){
      contentJsx = 
        <div class='centerHorizontally'>  
          <iframe width='420' height='315' src={contentItem.third} />
        </div>
      }
    // else if(contentItem.first == "IMAGE_URL"){
    //   htmlContent += "<div class='centerHorizontally'><img src='" + contentItem.third + "'</div>"
    // }else if(contentItem.first == "LINKED_IMAGE"){
    //   htmlContent += "<div class='centerHorizontally'><a href='" + contentItem.fourth + "'><img src=" + require("images/logo.png") + "' /></a></div>"
    // }else if(contentItem.first == "LOCATION"){
    //   htmlContent += "<div class='centerHorizontally'>" + 
    //     "LOCATION!!!" +
    //   "</div>"
    // }
  })

  return contentJsx  
}

export const getImageLinkFromIdeaContent = (ideaContent) => {
  let imageCloudLink = ""
  let ideaContentItemsList = JSON.parse(ideaContent);
  ideaContentItemsList.forEach(contentItem => {
    if(contentItem.first == "IMAGE"){
      imageCloudLink = contentItem.third
    }
  })

  return imageCloudLink
}

export const text = () => {

}



export const getImageUrlFromFirebaseImagePath = async (cloudImagePath, callBack) => {
  var imageref = storageRef.child(cloudImagePath);
  await imageref.getDownloadURL().then(function(url) {
    callBack(url)
  })
}


export const uuidv4 = () => {
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}

// export const convertJsonContentToHtml = (ideaContentJson, callBack) => {
//   if(ideaContentJson === undefined) {
//     return <div></div>
//   }
  
//   var htmlContent = ""
  
//   var ideaContentItemsList = JSON.parse(ideaContentJson);
//   ideaContentItemsList.forEach(contentItem => {
//     if(contentItem.first == "TEXT"){
//       htmlContent = "<div>" + contentItem.third + "</div>"
//     }else if(contentItem.first == "LINK"){
//       htmlContent = "<div class='centerHorizontally'><a href={contentItem.fourth}>" + contentItem.third + "</a></div>"
//     }
//     else if(contentItem.first == "IMAGE"){
//       htmlContent = "<div><FirebaseImage firebasePath={contentItem.third} /></div>"
//     }
//     // else if(contentItem.first == "IMAGE_URL"){
//     //   htmlContent += "<div class='centerHorizontally'><img src='" + contentItem.third + "'</div>"
//     // }else if(contentItem.first == "LINKED_IMAGE"){
//     //   htmlContent += "<div class='centerHorizontally'><a href='" + contentItem.fourth + "'><img src=" + require("images/logo.png") + "' /></a></div>"
//     // }else if(contentItem.first == "YOUTUBE"){
//     //   htmlContent += "<div class='centerHorizontally'>" + 
//     //     "<iframe width='420' height='315' src='" + contentItem.third + "' />" +
//     //   "</div>"
//     // }else if(contentItem.first == "LOCATION"){
//     //   htmlContent += "<div class='centerHorizontally'>" + 
//     //     "LOCATION!!!" +
//     //   "</div>"
//     // }
//   })
// 
//   return htmlContent  
// }