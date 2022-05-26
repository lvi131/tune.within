export const authEndPoint = "https://accounts.spotify.com/authorize";

// if running locally use this and comment the other one
// const redirectUri = "http://localhost:3000/listen";
const redirectUri = "https://tune-within.web.app/listen";

// client id given by spotify for developers after registering the app
const clientId = "b306a4a3cc5f4d31ad9aa24f13e4d4e5";

// scopes => what user permissions this app needs from spotify
const scopes = ["user-read-currently-playing", "user-top-read","user-library-read"];

// we send the user first to spotify for auth and then redirect to /listen back in our app
export const loginUrl = `${authEndPoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

export const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&').reduce((initial,item) => {
        let parts = item.split('=');
        initial[parts[0]] = decodeURIComponent(parts[1]);
        return initial;
    },{});
}
