export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele._id != ideaID
    );

    return arrayWithoutIdea;
}

export const convertLinksToThumbNails = (text) => {
    if (typeof(text) == 'undefined'){
        return ""
    }
    var convertedText = []
    var words = text.split(/[\s,\n]+/);
    words.forEach(function(element){
      if(element.includes('https://www.youtube.com/watch?v=')){
        var videoID = element.split("https://www.youtube.com/watch?v=")[1]

        var convertedYoutubeLink = '<div class="youtubeLink"><object width="400" height="315" data="https://www.youtube.com/embed/' + videoID + '" /></div>'

        convertedText += convertedYoutubeLink + ' '
      }
      else if(element.endsWith(".jpg") || element.endsWith(".png") || element.endsWith(".gif") || element.endsWith(".jpeg")){
        //e.g. https://kidshealth.org/EN/images/illustrations/ASDestab_433x259_enIL.png
        var imageEndingIndex = element.indexOf(".jpg")
        var convertedYoutubeLink = '<div class="contentImageLink"><a target="_blank" href="' + element + '"><img src="' + element + '" height="315" /></a></div>'
        convertedText += convertedYoutubeLink + ' '
      }
      else{
        convertedText += element + ' '
      }
    })

    return convertedText
}