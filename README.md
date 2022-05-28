## tune.[with]in

This project was created during the Microsoft Engage mentorship program 2022.


## Development

1. `git clone https://github.com/lvi131/tune.within.git`

2. `cd tune.within`

3. `npm install --force`

4. `npm start`

App will be visible at [http://localhost:3000/](http://localhost:3000/)

> In the project folder go to src/spotify.js and change the redirectUri to [http://localhost:3000/listen](http://localhost:3000/listen)

> Please ensure in step 3 to run `npm install --force` and not `npm install`.

> If you would like to test the app, please add your spotify linked email-address [here.](https://docs.google.com/spreadsheets/d/1py6JW9Tmtov35yLkqK0p_KZfhdi_0vRVjlzw2W3z6a0/edit?usp=sharing)



## Problem Statement

Demonstrate the application of face recognition technology.


## Project

A browser based web application as a relaxing tool cum productivity hack revolving around music and emotion detection. Try it [here](https://tune-within.web.app/)


## Brief Overview

- In the listen option, a user logs in with Spotify and clicks a picture. The emotion is detected and songs are recommended based on the emotion and Spotify listening patterns.

- In the focus option, a user has options to choose from nature themed audio-video relaxing effects and also a guided box-breathing feature.


## Technologies Used

- ReactJS

- [face-api.js](https://justadudewhohacks.github.io/face-api.js/docs/index.html) for facial recognition and emotion detection

- [Spotify API](https://developer.spotify.com/documentation/web-api/) for providing personalized song recommendations

- Firebase for hosting


## Future Scope

- Improve the UI.

- Add a journal writing feature to vent out emotions secured using faceID. 

- Use additional parameters such as heart rate, text analysis, audio analysis, breathing to enhance mood detection.

- Provide options to users to like songs and then factor this into the recommendations.


