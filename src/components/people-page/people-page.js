import React, { Component } from 'react';

import ItemList from '../item-list/item-list';
import ErrorIndicator from '../error-indicator/error-indicator';

import './people-page.css';
import PersonDetails from "../people-detail/people-detail";
import SwapiService from "../../services/swapi-service";
import Row from "../utils/Row";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
        hasError: false
    };

    componentDidCatch(error, info) {

        this.setState({
            hasError: true
        });
    }

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                {(i) => `${i.name} (${i.gender}) ${i.birthYear}`}
            </ItemList>
        );

        const personDetails = (
            <PersonDetails personId={this.state.selectedPerson} />
        );

        return (<Row left = {itemList} right={personDetails}/>);
    }
}