import React, { Component } from 'react';
import './App.css';
import {Grid, Col, Row, PageHeader} from 'react-bootstrap'
import MapContainer from './MapContainer'
import Filter from './Filter';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.handlePlaces = this.handlePlaces.bind(this);
    this.handleAnimation = this.handleAnimation.bind(this);
    this.handleInfoWindow = this.handleInfoWindow.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  state = {
    listPlaces: [],         // list of default places fetched from Google API
    filteredPlaces: [],     // list of filtered chosen places 
    clickedMarker: {},      // marker that is clicked to receive bouncing animation
    infoMarker: {},         // marker that is designated to render a InfoWindow
    showInfoWindow: false,  //flag to control InfoWindow flux
    activeMarker: {},       //active marker object 
    selectedPlace: {},      //selected place object
    requestError: false,    //error handler
    fourSquareItem: [],
    fourSquareError: false
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

  // handle the components that are clicked for bouncing animation
  handleAnimation = (clickedPlaceId) => {
    this.setState({ clickedMarker: clickedPlaceId })
  }

  // handle the components that are clicked for bouncing animation
  handleInfoWindow = (marker) => {
    
    console.log('should store marker on app state')
    console.log(marker)
    
    if (marker) this.setState({ infoMarker: marker })
  }

  handleError = (error, flag) => {
    //handle error type and error flag. The flag is set to TRUE for any error and FALSE otherwise
    console.log(error);
    this.setState({ requestError: flag });

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
                handlePlaces={this.handlePlaces.bind(this)}
                handleInfoWindow={this.handleInfoWindow.bind(this)}
                handleError={this.handleError.bind(this)}
                />
            </Col>
          </Row> 
        </Grid>
      </div>
    );
  }
}

export default App;
