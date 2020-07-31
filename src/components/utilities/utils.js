import axios from "axios";

//my_app_key: for challenge purpose i share to you my app key (but remember to use your themoviedb app key please :P )
//in the future i just simple "re generate" mine.
var my_app_key = "d6fb7c511a1a779f096cb96b3fd49f75";

/*
WARNING: the page themoviedb is ready to pass page number (pagination ready)
BUT, in this challenge is not mandatory to develop pagination, so its important to see this point.
In a real movie app, pagination is a must have (because themoviedb by default work with page numbers).
*/

function getMovieDiscoverEndPoint(page){
    return 'https://api.themoviedb.org/3/discover/movie?api_key=' + my_app_key + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + page; 
}
function getMovieSearchEndPoint(pquery){
    return 'https://api.themoviedb.org/3/search/movie?api_key=' + my_app_key  + '&language=en-US&query=' + pquery + '&page=1&include_adult=false';
}
const getMovies = async (page) => {
    let url = getMovieDiscoverEndPoint(page);        
    return await axios.get(url);
}
const getSearchMovies = async (pquery) => {
    let url = getMovieSearchEndPoint(pquery);        
    return await axios.get(url);
}
//Return the param x with trim regex applied.
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}

//getMovieDiscoverEndPoint is exported por testing purpose only.
export { 
    getMovieDiscoverEndPoint,getMovies,getSearchMovies,myTrim
}