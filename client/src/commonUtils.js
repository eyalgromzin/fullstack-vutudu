export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele._id != ideaID
    );

    return arrayWithoutIdea;
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