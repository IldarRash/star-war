import React, {Component} from 'react';

import Header from '../app-header';
import RandomPlanet from '../random-planet';
import ErrorBoundary from "../utils/error-boundary";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from '../../services/dummy-swapi-service';
import {PeoplePage, PlanetsPage, StarshipsPage} from '../pages'

import {SwapiServiceProvider} from '../swapi-service-context/swapi-service-context'
import ErrorIndicator from "../error-indicator/error-indicator";

import './app.css';

export default class  App extends Component{


    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService : new SwapiService()
    };

    onServiceChange = () => {
        this.setState(({ swapiService }) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;

            console.log(Service.name);
            return {
                swapiService: new Service()
            };
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

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value = {this.state.swapiService}>
                    <div className="stardb-app">
                        <Header onServiceChange={this.onServiceChange}/>
                        { planet }

                        <PeoplePage/>
                        <StarshipsPage/>
                        <PlanetsPage/>
                    </div>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    };

};

