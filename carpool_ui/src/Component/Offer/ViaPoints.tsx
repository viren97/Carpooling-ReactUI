import React from 'react';
// import Autocomplete from "react-google-autocomplete";
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { Card } from 'reactstrap';
import ToggleButton from '../RideForm/ToggleButton';
import Seats from './Seats';
interface MyProps {
    [x: string]: any;
    values: any;
    handleViaPointChange : (coordinates: any, i: number) => void;
    handleChange : (event: { target: { name: any; value: any;}; } ,) => void;
    addViaPoint : () => void;
    deleteViaPoint : (index: number) => void;
    handleSubmit : (e: { preventDefault: () => void; }) => void;
    error : string,
}



function ViaPoints (props: MyProps) {
    return (
        <Card className=" viaPoint">
            <div className="heading">
                <div>
                    <h1>{'Offer Ride'} </h1>
                    <p>We get you the matches ASAP</p>
                </div>
                <ToggleButton/>
            </div>
            <div className="route-details">
                <div>
                    {props.error ? <p className="error">{props.error}</p> : null}
                </div>
                {props.values.viaPoints.map((val: { name: any; }, i: number) => {
                return (
                    <div className="form-group ">
                        <label htmlFor={`viaPoint1${i + 1}`}>{`Via Point ${i + 1}`}</label>
                        <div className="input-group">
                            {/* <Autocomplete
                            className="form-control form-control-sm"
                            value={val.name}
                            onChange={(e: { target: { value: any; }; }) => {
                                const coordinates = {
                                    formatted_address: e.target.value,
                                    geometry: {
                                        location: {
                                        lat: function() {return 0},
                                        lng: function() {return 0}
                                        }
                                    }
                                };
                                props.handleViaPointChange(coordinates, i);
                            }}
                            onPlaceSelected={(place: { formatted_address: any; geometry: { location: { lat: () => number; lng: () => number; }; }; place_id : string; }) => {
                                props.handleViaPointChange(place, i);
                            }}
                            types={["(cities)"]}
                            componentRestrictions={{ country: "in" }}
                            /> */}

                            <MapboxAutocomplete publicKey='pk.eyJ1IjoidmlyZW45NyIsImEiOiJja2Z4bDJ0eGcxbG40MnB0OHl0MGRpaXY2In0.wa0lFkxcbILUDWL05aOvEA'
                                inputClass='form-control form-control-sm '
                                onSuggestionSelect={(result, lat, lng, text) => {
                                    const place = {
                                        formatted_address: result,
                                        geometry: {
                                            location: {
                                                lat: () => {
                                                    return Number(lat)
                                                },
                                                lng: () => {
                                                    return Number(lng)
                                                }
                                            }
                                        },
                                        place_id: `${text}${lat}${lng}`
                                    }
                                    props.handleViaPointChange(place, i);
                                }}
                             
                                country='in'
                                resetSearch={false} />
                            <button className="" type="button" onClick={() =>props.deleteViaPoint(i)}>
                                <i className="fas fa-minus"></i>
 
                            </button>
                        </div>
                    </div>
                    );
                })}
                <div className="form-group">
                    <button onClick={props.addViaPoint} className="btn ">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                <Seats handleChange={props.handleChange} />
                <div className="submit-container">
                    <button className="submit" type="button" name="submit" onClick={props.handleSubmit}>Submit</button>
                </div>
            </div>
        </Card>
    );
}



export default ViaPoints;
