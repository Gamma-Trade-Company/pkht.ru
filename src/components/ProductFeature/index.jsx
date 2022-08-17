import React, { Component, Fragment } from "react";
import classes from './ProductFeature.module.scss';

export default class ProductFeature extends Component {
    render() {
        const { featureList = [] } = this.props;
        return (
            <>
                <div className="container">
                    <div className="row">
                        <p className={classes.title}>Коротко о товаре</p>
                    </div>
                    <div className="row">
                        {
                            featureList.map(({ name, value }) => {
                                return (
                                    <Fragment key={name}>
                                        <div className={`col-6 ${classes.item__text} ${classes.name}`}>{name}</div>
                                        <div className={`col-6 ${classes.item__text} ${classes.value}`}>{value}</div>
                                    </Fragment>
                                );
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}