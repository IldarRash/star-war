import ItemDetails, {Record} from "../item-detail/item-detail";
import withSwapiService from "../hoc-helpers/with-swapi-service"
import React from "react";

const PlanetDetails = (props) => {
    return (
        <ItemDetails {...props}>

            <Record field="population" label="Population" />
            <Record field="rotationPeriod" label="Rotation Period" />
            <Record field="diameter" label="Diameter" />
        </ItemDetails>
    );
};

const mapMethodsService = (swapiService) => {
    return {
        getData: swapiService.getPlanet,
        getImageUrl: swapiService.getPlanetImage
    }
};

export default withSwapiService(PlanetDetails, mapMethodsService);