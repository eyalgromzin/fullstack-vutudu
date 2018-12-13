export const removeIdeaFromArray = (ideasArr, ideaID) => {
    const arrayWithoutIdea = ideasArr.filter(
        ele => ele._id != ideaID
    );

    return arrayWithoutIdea;
}