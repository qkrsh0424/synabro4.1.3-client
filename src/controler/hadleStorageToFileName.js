export default function(string){
    const splitString = string.split('/');
    const getFileName = splitString[splitString.length-1];
    return getFileName;
}