import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Col, Row, Image, Alert } from 'react-bootstrap'
import Foursquare from './Foursquare';

let initialCenter = { lat: -23.646156, lng: - 46.669538 }
let queryRadius = '1000';
let queryType = 'restaurant'

export class MapContainer extends Component {

    //propTypes to control what is coming
    static propTypes = {
        listPlaces: PropTypes.array.isRequired,
        handlePlaces: PropTypes.func.isRequired,
        clickedPlace: PropTypes.object.isRequired
    };
    
    constructor() {
        super();
        this.markerList = [];
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
                this.props.handleError(status, true);
                return this.handlePlaces(results, false, true);
            } else {
                this.props.handleError(status, true);
                return [];
            }
        });

    }

    //clean InfoWindow in case user clicks outside map
    onMapClicked = (props) => {
        // call infowindow handler to disable views
        if (this.props.showInfoWindow) this.props.handleInfoWindow(props, null, null, false);
    };

    //show InfoWindow when user clicks on Marker
    onMarkerClick = (props, marker, evt) => {
        // call handler with all needed information to render InfoWindow
        this.props.handleInfoWindow(props, marker, evt, true);
    }

    // In order to not toggle infinite setState calls, the option was to set refs to all markers in the component and store
    // them in a list within the App component. As this will only render once when Mapcontainer mounts, all marker objects
    // are available for the parent component to perform any kind of manipulation. This is how the parent component can 
    // communicate with child elements to set different behaviors within the react-google-maps library
    componentDidMount() {
        
        this.props.updateMarkerList(this.markerList);

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
                {this.props.requestStatus && (
                    <Alert bsStyle="warning">
                        <strong>Oh Snap!</strong> Something went wrong with your marker request. Plase reload page!
                    </Alert>
                )}
                {this.props.listPlaces.map( (place, index) => (
                    <Marker
                        key={place.id}
                        id={place.id}
                        ref={(ref) => this.markerList[index] = ref}
                        onClick={this.onMarkerClick}
                        name={place.name}
                        position={place.geometry.location}
                        animation={place.id === this.props.clickedPlace.id ? this.props.google.maps.Animation.BOUNCE : null}
                        icon={{
                            url: "marker.svg",
                            anchor: new this.props.google.maps.Point(16, 16),
                            scaledSize: new this.props.google.maps.Size(32, 32)
                        }} />        
                ))}
                <InfoWindow
                    marker={this.props.infoMarker}
                    visible={this.props.showInfoWindow}
                    >
                    <Grid fluid>
                        <Row>
                            {this.props.listPlaces
                                .filter( (place) => {
                                    return place.name === this.props.selectedPlace.name;
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
                                                <Foursquare 
                                                    placeInfo={this.props.fourSquareItem}
                                                    requestStatus={this.props.fourSquareError}
                                                />
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