import React, { useEffect } from 'react';
import {Route,Routes} from 'react-router-dom'
import './App.css';
import Home from './Home';
import { getTokenFromUrl } from './spotify';
import SpotifyWebApi from "spotify-web-api-js";
import Detection from './Detection';
import SpotifyWebApiNode from 'spotify-web-api-node';
import { useDataLayerValue } from './DataLayer';
import Relax from './Relax';


// creating instances
const spotify = new SpotifyWebApi();

//this is a wrapper around the spotify api
const spotifyNode = new SpotifyWebApiNode();

function App() {

  const [{token},dispatch] = useDataLayerValue();

  useEffect(() => {

    // getting access token and authenticating the user
    const hash = getTokenFromUrl();
    window.location.hash = "";
    const _token = hash.access_token;

    if(_token) {

      dispatch({
        type:'SET_TOKEN',
        token:_token,
      })

      spotify.setAccessToken(_token);
      spotifyNode.setAccessToken(_token);

      spotify.getMe().then(user=>{
        dispatch({
          type:'SET_USER',
          user:user
        })
      })

      // get user's top 10 artists -> get each artist's top songs and store this for emotion analysis
      // this flow ensures a mix of known and unknown songs by artists that the user likes
      spotifyNode.getMyTopArtists({limit:10})
      .then(function(data){
        dispatch({
          type:'SET_PLAYLIST',
          playlist:[]
        })
          let temp = [];
          data.body.items.forEach(function(artist){
            spotifyNode.getArtistTopTracks(artist.id,'IN')
            .then(function(d){
                return (d.body.tracks);
              })
              .then(function(songs){
                songs.forEach(function(eachSong){
                  temp.push(eachSong);
                })
              })
          })
          return temp;
      })
      .then(function(data){
        dispatch({
          type:'SET_PLAYLIST',
          playlist:data
        })
      })
    }
  },[]);

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/focus' element={<Relax/>} />
        <Route path='/listen' element={token?<Detection/>:<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
