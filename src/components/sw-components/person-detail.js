import withSwapiService from "../hoc-helpers/with-swapi-service"
import ItemDetails, {Record} from "../item-detail/item-detail";
import React from "react";


const PersonDetails = (props) => {
    return (
        <ItemDetails {...props} >

            <Record field="gender" label="Gender" />
            <Record field="eyeColor" label="Eye Color" />
        </ItemDetails>
    );
};

const mapMethodsService = (swapiService) => {
    return {
        getData: swapiService.getPerson,
        getImageUrl: swapiService.getPersonImage
    }
};

export default withSwapiService(mapMethodsService)(PersonDetails);