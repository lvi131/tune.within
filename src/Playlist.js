import React, { useState } from 'react'
import {useDataLayerValue} from './DataLayer'
import SpotifyWebApiNode from 'spotify-web-api-node';
import Songs from './Songs'
import './Playlist.css'

const spotifyNode = new SpotifyWebApiNode();


function Playlist({prediction,maxVal}) {

  // playlist => user's top artists' top tracks
  const [{playlist,token}] = useDataLayerValue();

  spotifyNode.setAccessToken(token);

  //songs => final recommendations
  const [songs,setSongs] = useState([]);

  // using spotify's audio features for the personalized tracks that we stored earlier, 
  // we get valence, danceability and energy for each track
  // then we map emotions to them according to valence-arousal plane
  // higher valence => more positive song, higher arousal => more energetic
  const moodify = () => {
    setSongs([]);

    playlist.forEach((each)=>{
      spotifyNode.getAudioFeaturesForTrack(each.id)
      .then(function(data){
        let song = data.body;

        if(prediction==="happy"){
          if(song.valence>=0.7 &&  (song.danceability>=0.5 || song.energy>=0.5))
            setSongs(oldArray=>[...oldArray,each]);
        }

        else if(prediction==="sad"){
          if(song.valence<=0.4 && song.energy<=0.5)
            setSongs(oldArray=>[...oldArray,each]);
        }

        else if(prediction==="neutral"){
          if(song.valence>=0.4 && song.energy<=0.8 && song.energy>=0.3)
            setSongs(oldArray=>[...oldArray,each]);
        }

        // for angry, fearful, surprised, disgusted suggest calm songs
        else{
          if(song.energy<=0.4 && song.valence>=0.3 && song.valence<=0.8)
            setSongs(oldArray=>[...oldArray,each]);
        }
      })
    })
  }

  return (
    <div>
      {prediction && !(songs.length) &&
        <div className='playlist'>
          <button className='playlist-button' onClick={moodify}>Emotify!</button>
        </div>}
      {songs &&
        <Songs songs={songs}/>}
    </div>
  )
}

export default Playlist