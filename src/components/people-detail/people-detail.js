import React, { Component } from 'react';

import './people-detail.css';
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button/error-button";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        person: null,
        loaded: true
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps) {
        if (this.props.personId !== prevProps.personId) {
            this.updatePerson();
        }
    }

    updatePerson() {
        const {personId} = this.props;
        if(!personId) {
            return;
        }

        this.swapiService
            .getPerson(personId)
            .then((person) => {
                this.setState({ person,
                loaded: false});
            });
    };

    render() {

        const {person, loaded} = this.state;

        const loadPerson = loaded ? <Spinner/> : null;

        const personFragment = !loaded ? <DetailInfo person={person}/> : null;

        return (
            <div className="person-details card">
                {loadPerson}
                {personFragment}
            </div>
        );
    }
}

const DetailInfo = ({person}) => {

    const { id, name, gender,
        birthYear, eyeColor} = person;

    return (
        <React.Fragment>
            <img className="person-image"
                 src= {`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}  alt="character"/>

            <div className="card-body">
                <h4>{name} </h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Birth Year</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    );
}