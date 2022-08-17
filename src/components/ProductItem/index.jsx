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
                to={`/catalog${link}`}
                className={`${className !== undefined ? className : ''} ${classes.card}`}
                >
                <img src={img} alt="" />
                <p className={classes.price} dangerouslySetInnerHTML={{__html: price}} />
                <p className={classes.title}>
                    {title}
                </p>
            </Link>
        );
    }
};