import React from 'react';
import {SwapiServiceConsumer} from "../swapi-service-context";


const withSwapiService = (Wrapped, mapMethodsService) => {
    return (props) => {
        return <SwapiServiceConsumer>
                {(swapiService) => {

                    const serviceProps = mapMethodsService(swapiService);
                    return (
                        <Wrapped {...props} {...serviceProps}/>
                    );}
                }
        </SwapiServiceConsumer>
    }
}

export default withSwapiService;