import {Component} from "react";
import ErrorIndicator from "../error-indicator/error-indicator";
import React from "react";

export default class ErrorBoundary  extends Component {
    state = {
        hasError: false
    };

    componentDidCatch(error, info) {

        this.setState({
            hasError: true
        });
    }

    render() {

        if (this.state.hasError) {
            return <ErrorIndicator />;
        }

        return (this.props.children);
    }
}