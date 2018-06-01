import React, { Component } from 'react';
import './App.css';
import {Grid, Col, Row, PageHeader} from 'react-bootstrap'
import MapContainer from './MapContainer'
import Filter from './Filter';

var foursquare = require('react-foursquare')({
  clientID: 'QXDO02YNT0LWO0D4APKE0MGEQ3HCFATJHB3NENJ244AEXFUE',
  clientSecret: 'AGS3PQD3DVH212IVD4T3X3OH1ZHJSMK015BVUPRYJJTLX0KW'
});

let initialCenter = { lat: -23.646156, lng: - 46.669538 }
let queryRadius = '1000';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
    this.handleInfoWindow = this.handleInfoWindow.bind(this);
    this.handleFoursquareQuery = this.handleFoursquareQuery.bind(this);
    this.handleError = this.handleError.bind(this);
    this.updateMarkerList = this.updateMarkerList.bind(this);
    this.markerList = [] // this is an marker object array that allows object manipulation from parent components for the react-google-maps library
  }

  state = {
    listPlaces: [],         // list of default places fetched from Google API
    filteredPlaces: [],     // list of filtered chosen places 
    clickedMarker: {},      // marker that is clicked to receive bouncing animation
    infoMarker: {},         // marker that is designated to render a InfoWindow
    showInfoWindow: false,  // flag to control InfoWindow flux
    activeMarker: {},       // active marker object 
    selectedPlace: {},      // selected place object
    requestError: false,    // error handler
    fourSquareItem: [],     // Foursquare item fetched from the API
    fourSquareError: false  // Error flag to handle error messages from the API
  }

  // All state handlers are controlled by the App component, who will call setState accordingly.
  // Once setState finish its job, it will trigger all child components rendering, without crashing due to
  // assynchronous setStates requests.
  
  handlePlaces = (places, isFiltered, isFirstList) => {
    
    //places: array with places' markers fetched from google API
    //isFitlered: boolean with filter status. If list is filtered, then TRUE. FALSE otherwise
    //isFirstList: boolean to identify if places array is the first fetch from maps API. TRUE if the list is first fetch. FALSE otherwise

    if (isFirstList && !isFiltered) {
      //Set the first list places array with all markers fetched from maps API. 
      this.setState({ listPlaces: places,
                      filteredPlaces: places        
      })
    }

    // If this is not the first list, then render a filtered list. In case reset filters dropdown is clicked
    // then reset state to original total list places
    if (isFiltered) {
      this.setState({ filteredPlaces: places })
    } else {
      this.setState({ filteredPlaces: this.state.listPlaces })
    }
  }

  // handle the components that are clicked for bouncing animation and infowindow
  handleAnimation = (clickedPlaceId) => {

    let marker = this.markerList.find(marker => {
      return marker.props.id === clickedPlaceId.id
    });

    
    // If marker is found in the marker list, it means that an item in the list was clicked and it has a corresponding marker on the map
    // therefore, call handle info window method. Otherwise, just toggle animation
    if (marker) {
      this.handleInfoWindow(marker.props, marker.marker, marker.evt, true)
      this.setState({ 
        clickedMarker: clickedPlaceId})
    } else {
      this.setState({ clickedMarker: clickedPlaceId })
    }
  }

  // handle the components that are clicked for bouncing animation
  // props:       if a marker was clicked, it will receive its props. If map was clicked, it will also receive props
  // marker:      if a marker was clicked, it will receive the clicked marker object
  // evt:         if a marker was clickedevent identifier object
  // isDisplayed: if map is clicked, this is flag will disable InfoWindow display (all other objects receive null values)
  handleInfoWindow = (props, marker, evt, isDisplayed) => {
    
    // If the Infowindow is set to show in the map, it will call the Foursquare API to fetch data or handle errors
    // When the values are returned, it will call setState to update all state variables at once and render the component
    if (isDisplayed) {

      let [fourSquareItem, fourSquareError] = this.handleFoursquareQuery(marker.name);

      this.setState({
        selectedPlace: props,
        infoMarker: marker,
        showInfoWindow: isDisplayed,
        fourSquareItem: fourSquareItem,
        fourSquareError: fourSquareError
      });

    } else {    
        this.setState({
          selectedPlace: props,
          infoMarker: marker,
          showInfoWindow: isDisplayed
        });
    }
  }

  handleFoursquareQuery = (query) => {

    let fourSquareItem, fourSquareError;
    
    // set params to execute Foursquare place query
    const params = {
      "ll": `${initialCenter.lat},${initialCenter.lng}`,
      "radius": queryRadius,
      "query": query,
      "limit": 1
    }

    // once the request return a value, pass to state its response and render the window with
    // the response for info rendering. Update error flag to pass an Error Props to Foursquare
    // component to render an error message
    // When daily quota exceeded, the server returns a 429 error code, which is treated accordingly
    foursquare.venues.getVenues(params)
      .then(res => {
        console.log(res.response.venues)
        if (res.meta.code === 429) {
          fourSquareItem = [];
          fourSquareError = true;
        } else {
          fourSquareItem = res.response.venues;
          fourSquareError = false;
        }
      })
      .catch((err) => {
        console.log("catch error")
        fourSquareItem = [];
        fourSquareError = true;
      });

    return [fourSquareItem, fourSquareError];

  }

  handleError = (error, flag) => {
    //handle error type and error flag. The flag is set to TRUE for any error and FALSE otherwise
    this.setState({ requestError: flag });
  }

  updateMarkerList(markers) {
    this.markerList = markers;
  }
  
  render() {

    return (
      <div>
        <PageHeader className="text-center">Neighborhood Map App</PageHeader>
        <Grid fluid>
          <Row className="show-grid">      
            <Col xs={4} sm={3} md={3} lg={3} className="fill">
              <Filter 
                listPlaces={this.state.filteredPlaces} 
                handlePlaces={this.handlePlaces.bind(this)}
                handleAnimation={this.handleAnimation.bind(this)}/>
            </Col>
            <Col xs={8} sm={9} md={9} lg={9} className="fill">
              <MapContainer 
                listPlaces={this.state.filteredPlaces}
                clickedPlace={this.state.clickedMarker}
                requestStatus={this.state.requestError}
                infoMarker={this.state.infoMarker}
                showInfoWindow={this.state.showInfoWindow}
                selectedPlace={this.state.selectedPlace}
                fourSquareItem={this.state.fourSquareItem}
                fourSquareError={this.state.fourSquareError}
                handlePlaces={this.handlePlaces.bind(this)}
                handleInfoWindow={this.handleInfoWindow.bind(this)}
                handleFoursquareQuery={this.handleFoursquareQuery.bind(this)}
                handleError={this.handleError.bind(this)}
                updateMarkerList={this.updateMarkerList.bind(this)}
                />
            </Col>
          </Row> 
        </Grid>
      </div>
    );
  }
}

export default App;
