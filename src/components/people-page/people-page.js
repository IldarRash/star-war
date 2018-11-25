import React, {Component} from 'react';

import ItemList from '../item-list/item-list';

import './people-page.css';
import ItemDetails from "../item-detail/item-detail";
import SwapiService from "../../services/swapi-service";
import Row from "../utils/Row";
import ErrorBoundary from "../utils/error-boundary";


export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3,
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({ selectedPerson });
    };

    render() {
        const itemList = (
            <ItemList onItemSelected={this.onPersonSelected}
                      getData={this.swapiService.getAllPeople}>
                {(i) => `${i.name} (${i.gender}) ${i.birthYear}`}
            </ItemList>
        );

        const personDetails = (
            <ItemDetails personId={this.state.selectedPerson} />
        );

        return (
            <ErrorBoundary>
                <Row left = {itemList} right={personDetails}/>
            </ErrorBoundary>);
    }
}
