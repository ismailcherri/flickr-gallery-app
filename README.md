# Flickr Gallery

An app based on reactjs which fetches the latest photos from Flickr API.

## Requirements
1. Node v12+
2. NPM v6+ or Yarn v1+
3. Flickr API key, you can get it from [here](https://www.flickr.com/services/api/misc.api_keys.html)

## Setup

1. Clone this repository
2. copy `.env.example` to `.env`
3. replace `REACT_APP_API_KEY` value with your own Flickr API key
4. run `yarn` or `npm install`


### Running the app

run `yarn start` or `npm start`

### Building the app

run `yarn run build` or `npm run build`

### Testing the app

run `yarn test` or `npm run test` to run the interactive test runner powered by Jest

### Additional Information

This app is built using React and Typescript (for better typing).  
It implements store functionality without the use of Redux or Redux toolkit 
with the possibility to dispatch actions from child components.
Also, the store can be selected from any child component using `AppContext`.  
Styling is done using `CSSModule` to enable CSS scoping.
