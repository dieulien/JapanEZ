export const USER_INPUT = "USER_INPUT";

const method = "tuanHeroku";

var REGISTER_URL = "https://localhost:3000/register";
var SIGNIN_URL = "https://localhost:3000/signin";
var PROFILE_URL = "https://localhost:3000/profile/";

switch(method){
    case "local":
        break;
    case "tuanHeroku":
        REGISTER_URL = "https://shrouded-harbor-11572.herokuapp.com/register";
        SIGNIN_URL = "https://shrouded-harbor-11572.herokuapp.com/signin";
        PROFILE_URL = "https://shrouded-harbor-11572.herokuapp.com/profile/";
        break;
}

 export {REGISTER_URL, SIGNIN_URL, PROFILE_URL};