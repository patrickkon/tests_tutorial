function capitalize(string){
    try{
    return string.charAt(0).toUpperCase() + string.slice(1);
    }
    catch(error)
    {
        console.log(error);
        return string;
    }
}

module.exports = {
    capitalize,

}