import ItemDetails, {Record} from "../item-detail/item-detail";
import React from "react";
import withSwapiService from "../hoc-helpers/with-swapi-service";

const StarshipDetails = (props) => {
    return (
        <ItemDetails {...props}>

            <Record field="model" label="Model" />
            <Record field="length" label="Length" />
            <Record field="costInCredits" label="Cost" />
        </ItemDetails>
    );
};

const mapMethodsService = (swapiService) => {
    return {
        getData: swapiService.getStarShip,
        getImageUrl: swapiService.getStarShipImage
    }
};

export default withSwapiService(mapMethodsService)(StarshipDetails);