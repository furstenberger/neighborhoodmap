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
  }

  state = {
    listPlaces: [],     // list of default places fetched from Google API
    filteredPlaces: [], // list of filtered chosen places 
    clickedMarker: ""   // marker that is clicked to receive bouncing animation
  }
  
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
    console.log("handle animation")
    console.log(clickedPlaceId)
    this.setState({ clickedMarker: clickedPlaceId })
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
                handlePlaces={this.handlePlaces.bind(this)}
                clickedPlaceId={this.state.clickedMarker}/>
            </Col>
          </Row> 
        </Grid>
      </div>
    );
  }
}

export default App;
