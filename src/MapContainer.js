import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

    state = {
        listPlaces: []
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
                this.setState({ listPlaces: results })
                console.log("Tudo Certo")
                console.log(this.state)
            } else {
                console.log("Algo deu errado. Retorno da requisicao:" + status)
            }
        });

    }
    
    render() {

        const style = {
            height: '100%'
        }

        return (
            <Map google={this.props.google} 
                onReady={this.getPlaces}
                style={style}
                initialCenter={{ lat: -23.646156, lng: - 46.669538}}
                zoom={15}
                >
                {this.state.listPlaces.map( (place) => (
                    <Marker
                        onClick={this.onMarkerClick}
                        name={place.name}
                        position={place.geometry.location}
                        icon={{
                            url: "marker.svg",
                            anchor: new this.props.google.maps.Point(16, 16),
                            scaledSize: new this.props.google.maps.Size(32, 32)
                        }} />           
                ))}
                
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA3_oZSDUdY8Vv0JEZd3tK4stb3QGpq-7Q')
})(MapContainer)