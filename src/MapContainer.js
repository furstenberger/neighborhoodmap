import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Col, Row, Image, Alert } from 'react-bootstrap'
import Foursquare from './Foursquare';

var foursquare = require('react-foursquare')({
    clientID: 'QXDO02YNT0LWO0D4APKE0MGEQ3HCFATJHB3NENJ244AEXFUE',
    clientSecret: 'AGS3PQD3DVH212IVD4T3X3OH1ZHJSMK015BVUPRYJJTLX0KW'
}); 


let initialCenter = { lat: -23.646156, lng: - 46.669538}
let queryRadius = '1000';
let queryType = 'restaurant'

export class MapContainer extends Component {

    //propTypes to control what is coming
    static propTypes = {
        listPlaces: PropTypes.array.isRequired,
        handlePlaces: PropTypes.func.isRequired,
        clickedPlaceId: PropTypes.string.isRequired
    };
    
    state = {
        showInfoWindow: false,  //flag to control InfoWindow flux
        activeMarker: {},       //active marker object 
        selectedPlace: {},      //selected place object
        requestError: false,    //error handler
        fourSquareItem: []

    }

    //handle places method to update parent state
    handlePlaces = (results, isFiltered, isFirst) => {
        this.props.handlePlaces(results, isFiltered, isFirst);
    }
    
    //this method is responsible to fetch all places from google API. Markers will be rendered afterwards.
    getPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        
        var request = {
            location: initialCenter,
            radius: queryRadius,
            type: [queryType]
        };
        
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                // pass full list of places with FALSE flag for filteredPlaces
                // the app will deal with filtered states based on this inital state results and other filters applied
                // this way this service will only run once, saving API data consumption
                this.setState({ requestError: false })
                return this.handlePlaces(results, false, true);
            } else {
                this.setState({ requestError: true})
                return [];
            }
        });

    }

    //clean InfoWindow in case user clicks outside map
    onMapClicked = (props) => {
        if (this.state.showInfoWindow) {
            this.setState({
                showInfoWindow: false,
                activeMarker: null
            })
        }
    };

    //show InfoWindow when user clicks on Marker
    onMarkerClick = (props, marker, evt) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showInfoWindow: true
        });

        // When a marker is clicked, call the function to fetch foursquare data
        this.updateFoursquareQuery(marker.name);

    }

    updateFoursquareQuery = (query) => {

        //this.setState({fourSquareQuery: query})
        // set params to execute Foursquare place query
        const params = {
            "ll": `${initialCenter.lat},${initialCenter.lng}`,
            "radius": queryRadius,
            "query": query,
            "limit": 1
        }

        // once the request return a value, pass to state its response and render the window with
        // the response for info rendering
        foursquare.venues.getVenues(params)
            .then(res => {
                this.setState({ fourSquareItem: res.response.venues });
            })
            .catch((err) => { alert("Unable to fetch information from Foursquare. Try again in a few minutes.") });

    }
    
    render() {

        const style = {
            height: '100%'
        }

        return (
            <Map google={this.props.google} 
                onReady={this.getPlaces}
                onClick={this.onMapClicked}
                style={style}
                initialCenter={initialCenter}
                zoom={15}
                >
                {this.state.requestStatus && (
                    <Alert bsStyle="warning">
                        <strong>Oh Snap!</strong> Something went wrong with your marker request. Plase reload page!
                    </Alert>
                )}
                {this.props.listPlaces.map( (place) => (
                    <Marker
                        key={place.id}
                        onClick={this.onMarkerClick}
                        name={place.name}
                        position={place.geometry.location}
                        animation={place.id === this.props.clickedPlaceId ? this.props.google.maps.Animation.BOUNCE : null}
                        icon={{
                            url: "marker.svg",
                            anchor: new this.props.google.maps.Point(16, 16),
                            scaledSize: new this.props.google.maps.Size(32, 32)
                        }} />        
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showInfoWindow}
                    >
                    <Grid fluid>
                        <Row>
                            {this.props.listPlaces
                                .filter( (place) => {
                                    return place.name === this.state.selectedPlace.name;
                                })
                                .map( (place) => {
                                    return (
                                        <div key={place.id}>
                                            <Col xs={4} sm={4} md={4} lg={4}>
                                                <Image src={place.icon} rounded responsive />
                                            </Col>
                                            <Col xs={8} sm={8} md={8} lg={8}>
                                                <h5>{place.name}</h5>
                                                <p>Rating: {place.rating}</p>
                                                <Foursquare placeInfo={this.state.fourSquareItem}/>
                                            </Col>
                                        </div>
                                    )
                                })
                            } 
                        </Row>
                    </Grid>
                </InfoWindow>   
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA3_oZSDUdY8Vv0JEZd3tK4stb3QGpq-7Q')
})(MapContainer)