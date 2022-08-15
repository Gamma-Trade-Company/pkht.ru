import { Component } from "react";
import { Link } from "react-router-dom";
import classes from './ProductItem.module.scss';

export default class ProductItem extends Component {
    render() {
        const {
            className,
            title,
            img,
            link,
            price,
        } = this.props;

        return (
            <Link 
                to={link}
                className={`${className !== undefined ? className : ''} ${classes.card}`}
                >
                <img src={img} alt="" />
                <p className={classes.price}>
                    {price}
                </p>
                <p className={classes.title}>
                    {title}
                </p>
            </Link>
        );
    }
};