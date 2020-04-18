export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele._id != ideaID
    );

    return arrayWithoutIdea;
}

export const getTagsFromContent = (inputText) => {  //http://geekcoder.org/js-extract-hashtags-from-text/
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

export const convertLinksToThumbNails = (text) => {
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

//ideas - ideas array 
export const convertIdeasContentJsonToNormal = (ideas) => {
  var convertedIdeas = []

  ideas.forEach(idea => {
    try{                    
      var ideaContentJson = idea.content

      var contentHtml = convertJsonContentToHtml(ideaContentJson)

      if(contentHtml !== undefined){
        idea.content = contentHtml
      }

    }catch(e){
      console.log("failed to parse item json: " + e)
    }
  })

  return ideas
}

export const convertJsonContentToHtml = (ideaContentJson) => {
  var ideaContentItemsList = JSON.parse(ideaContentJson);
  var htmlContent = ""

  ideaContentItemsList.forEach(contentItem => {
    if(contentItem.first == "TEXT"){
      htmlContent += "<div>" + contentItem.third + "</div>"
    }else if(contentItem.first == "LINK"){
      htmlContent += "<div class='centerHorizontally'><a href='" + contentItem.fourth + "'>" + contentItem.third + "</a></div>"
    }
    else if(contentItem.first == "IMAGE"){
      htmlContent += "<div class='centerHorizontally'>image content</div>"
    }
    else if(contentItem.first == "IMAGE_URL"){
      htmlContent += "<div class='centerHorizontally'><img src='" + contentItem.third + "'</div>"
    }else if(contentItem.first == "LINKED_IMAGE"){
      htmlContent += "<div class='centerHorizontally'><a href='" + contentItem.fourth + "'><img src=" + require("images/logo.png") + "' /></a></div>"
    }else if(contentItem.first == "YOUTUBE"){
      htmlContent += "<div class='centerHorizontally'>" + 
        "<iframe width='420' height='315' src='" + contentItem.third + "' />" +
      "</div>"
    }else if(contentItem.first == "LOCATION"){
      htmlContent += "<div class='centerHorizontally'>" + 
        "LOCATION!!!" +
      "</div>"
    }
    
    htmlContent += ""
  })

  return htmlContent  
}