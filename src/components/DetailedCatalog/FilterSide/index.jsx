import { Component } from "react";
import classes from './FilterSide.module.scss';

export default class FilterSide extends Component {
    render() {
        const { title, children } = this.props;
        return (
            <div className={classes.filterSide}>
                <h1 className={classes.title}>{title}</h1>
                <div className={classes.filterSide__content}>
                    {children}
                </div>
            </div>
        );
    }
}