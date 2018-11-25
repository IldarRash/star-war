import React, {Component} from 'react';

import Header from '../app-header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page/people-page";
import ErrorButton from "../error-button/error-button";
import SwapiService from "../../services/swapi-service";
import Row from "../utils/Row";
import ItemDetails, {Record} from "../item-detail/item-detail";

export default class  App extends Component{

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };

    componentDidCatch() {
        this.setState({ hasError: true });
    }

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        if (this.state.hasError) {
            return <ErrorIndicator />
        }

        const {getPerson, getStarShip, getPersonImage, getStarShipImage} = this.swapiService;

        const personDetails = (<ItemDetails itemId = {11}
                                            getData={getPerson}
                                            getImageUrl={getPersonImage}>
                                    <Record field="gender" label="Gender" />
                                    <Record field="eyeColor" label="Eye Color" />

                                </ItemDetails>);

        const starShipDetails = (<ItemDetails itemId = {5}
                                              getData={getStarShip}
                                              getImageUrl={getStarShipImage}>
                                    <Record field="model" label="Model" />
                                    <Record field="length" label="Length" />
                                    <Record field="costInCredits" label="Cost" />
                                </ItemDetails>);
        return (
            <div className="stardb-app">
                <Header />
                { planet }



                <Row left={personDetails} right={starShipDetails}/>
            </div>
        );
    };

};

