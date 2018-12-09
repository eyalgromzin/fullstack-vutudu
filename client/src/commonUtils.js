export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele.ideaID != ideaID
    );

    return arrayWithoutIdea;
}