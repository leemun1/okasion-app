/*global google*/
import React, { Component } from "react";
import PropTypes from "prop-types";
import Script from "react-load-script";
import Geosuggest from "react-geosuggest";

class PlaceField extends Component {
  state = {
    scriptLoaded: false
  };

  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const { label, info, error, onSelect } = this.props;
    return (
      <div className="placeField">
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=AIzaSyBg2JzymZWfjGD0NFmnw5P08dbnw9NYGbs&libraries=places`}
          onLoad={this.handleScriptLoaded}
        />
        {label && <h6 className="placeField__label">{label}</h6>}

        {this.state.scriptLoaded && (
          <Geosuggest
            className="placeField__input"
            ref={el => (this._geoSuggest = el)}
            placeholder="Where will the event be held at?"
            onSuggestSelect={onSelect}
            location={new google.maps.LatLng(53.558572, 9.9278215)}
            radius="20"
          />
        )}

        {info && <small className="placeField__info">{info}</small>}
        {error && <div className="placeField__error">{error}</div>}
      </div>
    );
  }
}

PlaceField.propTypes = {
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string
};

export default PlaceField;
