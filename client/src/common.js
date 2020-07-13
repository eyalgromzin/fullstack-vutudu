
export const loggedInWith = { loggedInWith: "None" }

export const getBase64 = (file, callBack) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        callBack(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}