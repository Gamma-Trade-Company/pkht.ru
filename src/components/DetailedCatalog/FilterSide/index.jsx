import { Component } from "react";
import classes from './FilterSide.module.scss';

import ArrowBackIcon from '../../icons/arrow-back';

export default class FilterSide extends Component {
    render() {
        const { title, children, shown, close } = this.props;
        return (
            <div className={classes.filterSide + (shown ? " "+classes.filterSide__shown : "")}>
                <div className={classes.filterSide_mobHeader}>
                    <button className={classes.filterCloseBtn} type="button" onClick={close}><ArrowBackIcon /></button>
                </div>
                <h3 className={classes.filterSide_mobTitle}>Фильтры</h3>
                <h1 className={classes.title}>{title}</h1>
                <div className={classes.filterSide__content}>
                    {children}
                </div>
            </div>
        );
    }
}