import React from 'react'
import './Songs.css'

function Songs({songs}) {
  songs.forEach((each)=>{
    each.src = `https://open.spotify.com/embed/track/${each.id}?utm_source=generator`
  })
  return (
    <div>
        {songs?
        <div className='songs'>
          <div className='songs-list'>
          {
            songs.map((each)=>(
              <iframe
                src={each.src} className='song'
                frameBorder="0" allowfullscreen="" 
                allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" title='song '>
              </iframe>
            ))
          }
          </div>
        </div> : (<p className='songs-text'>Loading...</p>)
}
    </div>
  )
}

export default Songs