import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { Grid, Col, Row, Image } from 'react-bootstrap'


export class MapContainer extends Component {

    //propTypes to controle what is coming
    static propTypes = {
        listPlaces: PropTypes.array.isRequired,
        handlePlaces: PropTypes.func.isRequired
    };
    
    state = {
        showInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    }

    handlePlaces = (results) => {
        this.props.handlePlaces(results);
    }
       
    getPlaces = (mapProps, map) => {
        const {google} = mapProps;
        const service = new google.maps.places.PlacesService(map);
        
        var request = {
            location: { lat: -23.646156, lng: - 46.669538 },
            radius: '1000',
            type: ['restaurant']
        };
        
        service.nearbySearch(request, (results, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                return this.handlePlaces(results);
            } else {
                console.log("Algo deu errado. Retorno da requisicao:" + status);
                return [];
            }
        });

    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showInfoWindow: false,
                activeMarker: null
            })
        }
    };

    onMarkerClick = (props, marker, evt) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showInfoWindow: true
        });

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
                initialCenter={{ lat: -23.646156, lng: - 46.669538}}
                zoom={17}
                >
                {this.props.listPlaces.map( (place) => (
                    <Marker
                        key={place.id}
                        onClick={this.onMarkerClick}
                        name={place.name}
                        position={place.geometry.location}
                        icon={{
                            url: "marker.svg",
                            anchor: new this.props.google.maps.Point(16, 16),
                            scaledSize: new this.props.google.maps.Size(32, 32)
                        }} />        
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showInfoWindow}>
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