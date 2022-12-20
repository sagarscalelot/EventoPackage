import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

export class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: parseFloat(this.props.coordinates.coordinates[1]),
                lng: parseFloat(this.props.coordinates.coordinates[0]),
            },
        };
    }

    render() {
        return (
            <Map
                google={this.props.google}
                style={{
                    position: "relative",
                    width: "100%",
                    height: "calc(100% - 24px)",
                }}
                initialCenter={{
                    lat: parseFloat(this.state.mapCenter.lat),
                    lng: parseFloat(this.state.mapCenter.lng),
                }}
                center={{
                    lat: parseFloat(this.props.coordinates.coordinates[1]),
                    lng: parseFloat(this.props.coordinates.coordinates[0]),
                }}
            >
                <Marker
                    position={{
                        lat: parseFloat(this.props.coordinates.coordinates[1]),
                        lng: parseFloat(this.props.coordinates.coordinates[0]),
                    }}
                />
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q",
})(GoogleMap);