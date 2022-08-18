import { Component } from "react";
import { Link } from "react-router-dom";
import classes from './LinkToCatalog.module.scss';

export default class LinkToCatalog extends Component {
    render() {
        const {className} = this.props;
        return (
            <Link to="/catalog/" className={`${classes.link} ${className}`}>
                <span className={classes.decor}>
                    <span></span>
                </span>
                <span className={classes.text}>Каталог</span>
            </Link>
        );
    }
}