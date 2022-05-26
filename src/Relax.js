import React,{useState} from 'react'
import dripping_water from './sounds/dripping_water.mp3' 
import rain from './sounds/rain.mp3' 
import river_stream from './sounds/river_stream.mp3' 
import thunder from './sounds/thunder.mp3' 
import waves from './sounds/waves.mp3' 
import wind from './sounds/wind.mp3' 
import './Relax.css'
import rain_video from './videos/rain.mp4'
import dripping_water_video from './videos/dripping_water.mp4' 
import river_stream_video from './videos/stream.mp4' 
import thunder_video from './videos/thunder.mp4' 
import waves_video from './videos/waves.mp4' 
import wind_video from './videos/wind.mp4'  
import Navbar from './Navbar'

function Relax() {

  const [audio,setAudio] = useState('');
  const [video,setVideo] = useState('');

  // to handle display of box breathing feature
  const [click,setClick] = useState(false);

  // to handle breathing
  const [start,setStart] = useState('');

  const showBoxBreathing = () => {
    setClick(!click);
    setVideo('');
    setAudio('')
  }

  const updateInstructions = () => {
    let btnEl = document.getElementById("btn");
    btnEl.textContent = "Breathe In";
    setTimeout(()=>{
      btnEl.textContent = "Hold";
      setTimeout(()=>{
        btnEl.textContent = "Breathe Out";
        setTimeout(()=>{
          btnEl.textContent = "Hold";
          setTimeout(()=>{
            btnEl.textContent = "Start";
            setStart(false);
          },4000)
        },4000)
      },4000)
    },4000);

  }

  const startBreathing = () => {
    let btnEl = document.getElementById("btn");
    if(btnEl.textContent==="Start"){
      updateInstructions();
      setStart(true);
      setTimeout(()=>{
        setStart(false);
      },8000)
      
    }
  }

  const showEffect = (audioEffect,videoEffect) => {
    if(video)
      setVideo('');
    else
      setVideo(videoEffect);
    if(audio)
      setAudio('');
    else
      setAudio(audioEffect);
    setClick(false);
  }

  return (
    <div>
      {!audio && !click &&
        <Navbar/>
      }
      {click &&
      <div className='relax-breathing'>
        <div className='relax-circle'>
          <div className='relax-circle-outline'></div>
          <div className={start ? 
            'relax-circle-progress relax-circle-grow' : 'relax-circle-progress'}>
          </div>
        </div>
        <div className='relax-breathing-card'>
          <button className='relax-start' onClick={startBreathing} id="btn">Start</button>
        </div>
      </div>
      }
      <div className='relax'>
        {!audio && !click &&
        <p className='relax-text'>Click the effects to turn them on and off!</p>
        } 
        <div className='relax-buttons'>
          <button onClick={() => showEffect(dripping_water,dripping_water_video)}>Dripping Water</button>
          <button onClick={() => showEffect(rain,rain_video)}>Rain</button>
          <button onClick={() => showEffect(river_stream,river_stream_video)}>River Stream</button>
          <button onClick={() => showEffect(thunder,thunder_video)}>Thunder</button>
          <button onClick={() => showEffect(waves,waves_video)}>Waves</button>
          <button onClick={() => showEffect(wind,wind_video)}>Wind</button>
          <button onClick={showBoxBreathing} className='relax-button'>Try Box Breathing</button>
        </div>
        {video && <video className='relax-video' loop autoPlay muted>
          <source src={video} type='video/mp4'/>
        </video>}
        {audio && <audio loop autoPlay>
          <source src={audio} />
        </audio>}
      </div>
    </div>
  )
}

export default Relax