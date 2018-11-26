import React, {Component} from 'react';

import './item-detail.css';
import Spinner from "../spinner/spinner";
import ErrorButton from "../error-button/error-button";


const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{ item[field] }</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        loaded: true,
        image: null
    };

    componentDidMount() {
        this.updateitem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId || this.props.getData !== prevProps.getData) {
            this.updateitem();
        }
    }

    updateitem() {
        const {itemId, getData, getImageUrl} = this.props;
        if(!itemId) {
            return;
        }

        getData(itemId).then((item) => {
                this.setState({ item,
                loaded: false,
                image: getImageUrl(item)});
            });
    };

    render() {

        const {item, loaded, image} = this.state;

        const loaditem = loaded ? <Spinner/> : null;

        const itemFragment = !loaded ? <DetailInfo item={item} image={image}
        children={this.props.children}/> : null;

        return (
            <div className="item-details card">
                {loaditem}
                {itemFragment}
            </div>
        );
    }
}

const DetailInfo = ({item, image, children}) => {

    return (
        <React.Fragment>
            <img className="item-image"
                 src= {image}  alt="character"/>

            <div className="card-body">
                <h4>{item.name} </h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    );
}