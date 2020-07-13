export const getTagsFromText = (text) => {
    var regex = "(^|\s)(#[a-z\d-]+)";
    var subjects = text.match(regex);
    return subjects;
}