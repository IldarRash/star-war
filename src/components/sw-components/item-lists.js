import React from 'react';
import ItemList from '../item-list';
import { withData,withSwapiService } from '../hoc-helpers';
import compose from "../hoc-helpers/compose";
import withChildFunction from "../hoc-helpers/with-child-function";
import PropTypes from 'prop-types';

const mapPersonMethodsToProps = (swapiService) => {
    return {
      getData: swapiService.getAllPeople
    };
};
const mapPlanetMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllPlanets
    };
};
const mapStarShipMethodsToProps = (swapiService) => {
    return {
        getData: swapiService.getAllStarships
    };
};



const renderName = ({ name }) => <span>{name}</span>;
const renderModelAndName = ({ model, name}) => <span>{name} ({model})</span>;

const PersonList = compose(
    withSwapiService(mapPersonMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const PlanetList = compose(
    withSwapiService(mapPlanetMethodsToProps),
    withData,
    withChildFunction(renderName)
)(ItemList);

const StarshipList = compose(
    withSwapiService(mapStarShipMethodsToProps),
    withData,
    withChildFunction(renderModelAndName)
)(ItemList);

export {
    PersonList,
    PlanetList,
    StarshipList
};