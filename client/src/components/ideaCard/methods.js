export const getTagsFromText = (text) => {
    var regex = "(^|\s)(#[a-z\d-]+)";
    var tags = text.match(regex);
    return tags;
}