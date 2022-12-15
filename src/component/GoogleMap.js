import React, { Component, useState } from "react";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";

export class GoogleMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: "",
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: this.props.coordinates.coordinates[1],
                lng: this.props.coordinates.coordinates[0],
            },
        };
    }

    handleChange = (address) => {
        this.setState({ address });
    };

    handleSelect = (address) => {
        this.setState({ address });
        geocodeByAddress(address)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => {
                // update center state
                this.setState({ mapCenter: latLng });
                console.log("update : ")(
                    this.props.handleClick(this.state.address, latLng.lng, latLng.lat)
                );
            })
            .catch((error) => console.error("Error", error));
    };

    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div className="mapBox w-full h-full pt-6">
                        <input
                            {...getInputProps({
                                placeholder: "Search Places ...",
                                className:
                                    "location-search-input absolute top-0 left-0 w-full z-10",
                            })}
                        />
                        <div className="autocomplete-dropdown-container absolute top-6 left-0 w-full z-10">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                    ? "suggestion-item--active"
                                    : "suggestion-item";
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
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
                                lat: this.props.coordinates.coordinates[1],
                                lng: this.props.coordinates.coordinates[0],
                            }}
                        >
                            <Marker
                                position={{
                                    lat: this.props.coordinates.coordinates[1],
                                    lng: this.props.coordinates.coordinates[0],
                                }}
                            />
                        </Map>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDLgr8YB5IK8dBIEWClexZGzXaB7UlVm7Q",
})(GoogleMap);
