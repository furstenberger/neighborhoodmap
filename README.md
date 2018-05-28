# My Neighborhood Map

## Developed as a final project for Udacity's Front End Web Development Nanodegree

## Installing

* Clone this repository in any folder ex:`/myprojects/mapsApp/`
* `cd /myprojects/mapsApp/`
* run `npm install` to install all dependencies
* run `npm start` to start react development server. App should load immediately 

## Usage

* The Google Maps API will load within a fixed given lat lng
* The site will render markers in a 1000 meter radius, querying for `restaurants`
* A filter list will show when places are returned from API query
* You can filter by predefined categories
* A InfoWindow will show on a marker when clicked. The marker clicked will query Foursquare API to fetch additional place information

## Dependencies
This project was developed using `React` scaffolded from [`create-react-app`](https://github.com/facebook/create-react-app). Dependencies as follows:

* [React Bootstrap](https://react-bootstrap.github.io/)
* [React Google Maps API](https://github.com/fullstackreact/google-maps-react)
* [React Foursquare API Wrapper](https://www.npmjs.com/package/react-foursquare)
* [React PropTypes](https://www.npmjs.com/package/prop-types)