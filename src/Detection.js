import {useEffect, useRef,useState} from 'react';
import * as faceapi from "face-api.js";
import './Detection.css';
import Playlist from './Playlist';
import Navbar from './Navbar';


function Detection() {

    const [imageURL,setImageURL] = useState('');
    const [prediction,setPrediction] = useState('');

    //max confidence score among emotions
    const [maxVal,setMaxVal] = useState(0);

    const videoEle = useRef();
    const imageEle = useRef();
    const canvasEle = useRef();

    useEffect(()=>{
        startCamera();
        // once we get the video stream, load the face-api.js models
        videoEle && loadModels();
    },[imageURL])

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
            faceDetection();
           })
   };

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
     .then((currentStream) => {
          videoEle.current.srcObject = currentStream;
      }).catch((err) => {
         console.error(err)
         });
    }


    const takeSelfie = () => {
        // get the exact size of the video element.
        const width = videoEle.current.videoWidth;
        const height = videoEle.current.videoHeight;

        // get the context object of hidden canvas
        const ctx = canvasEle.current.getContext('2d');

        // set the canvas to the same dimensions as the video.
        canvasEle.current.width = width;
        canvasEle.current.height = height;

        // draw the current frame from the video on the canvas.
        ctx.drawImage(videoEle.current, 0, 0, width, height);

        // get the image dataURL from the canvas.
        const imageDataURL = canvasEle.current.toDataURL('image/png');

        stopCam();

        setImageURL(imageDataURL);
    }

    const stopCam = () => {
        const stream = videoEle.current.srcObject;
        
        const tracks = stream.getTracks();
        tracks.forEach(track => {
          track.stop();
        });
    }

    const backToCam = () => {
        setImageURL('');
        startCamera();
        setPrediction('');
        setMaxVal(0);
    };

    const faceDetection = async () => {
        const img = document.getElementById('myImg')

        // we send the id of img element as input and use face api to detect a face and emotions
        const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
                                 .withFaceLandmarks().withFaceExpressions();

        // response contains a confidence score mapped to each emotion
        // emotions include happy, sad, fearful, surprised, angry, neutral and disgusted
        var emotionsObj = detections[0].expressions;

        if (prediction==='' && maxVal===0){
            var currPrediction = "";
            var currVal = 0;

            for (var emotion in emotionsObj){

                if (emotionsObj[emotion] > currVal){
                    currPrediction = emotion;
                    currVal = emotionsObj[emotion];
                }
            }

            // making more sensitive towards sad emotion
            if(currPrediction==="neutral" && emotionsObj["sad"]>0.0009){
                currPrediction="sad";
                currVal=emotionsObj["sad"];
            }

            setPrediction(currPrediction);
            setMaxVal(currVal);
        }

        

    }
    
    return (
        <div>
            <Navbar/>
            <div className='detection'>
                {imageURL  && 
                <div>
                    <h1 className='detection-text'>You seem
                        {prediction&&
                        <span id="myPrediction" className='detection-text-prediction'> {prediction}.
                        </span>}
                        {!prediction&&
                        <span className='detection-text-prediction'> . . .</span>}
                    </h1>
                    {prediction && 
                    <div className='detection-button-container'>
                        <button onClick={backToCam} className="detection-button">
                            Back To Camera
                        </button>
                    </div>
                    }
                    <Playlist prediction={prediction} maxVal={maxVal}/>
                </div>
                }
    
                {!imageURL && 
                <div className="detection-camera">
                    <video width="100%" height="100%" className="detection-video-player" 
                    autoPlay={true} ref={videoEle}></video>
                    <button className="detection-capture-btn" onClick={takeSelfie}>
                        <i class="fa fa-camera" aria-hidden="true"></i>
                    </button>
                    <canvas className='detection-canvas' ref={canvasEle}></canvas>
                </div>
                }

                {imageURL  && !prediction && 
                    <div className="detection-preview">
                        <img id="myImg" className="detection-preview-image" src={imageURL} 
                        ref={imageEle} alt="your selfie" />
                    </div>
                }
            </div>
        </div>
    )
}

export default Detection;