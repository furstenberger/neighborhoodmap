import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

    render() {

        const style = {
            height: '100%'
        }

        return (
            <Map google={this.props.google} 
                style={style}
                initialCenter={{ lat: -23.646156, lng: - 46.669538}}
                zoom={15}
                >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Current location'}
                    position={{ lat: -23.646156, lng: - 46.669538 }}
                    icon={{
                        url: "marker.svg",
                        anchor: new this.props.google.maps.Point(16, 16),
                        scaledSize: new this.props.google.maps.Size(32, 32)
                    }} />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyA3_oZSDUdY8Vv0JEZd3tK4stb3QGpq-7Q')
})(MapContainer)