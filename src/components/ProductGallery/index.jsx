import { Component } from "react";
import classes from './ProductGallery.module.scss';

export default class ProductGallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0
        }
    }

    #handleClick = (e, src) => {
        const index = this.props.imgList.indexOf(src);
        if (index === -1) return;
        this.setState({activeSlide: index});
    }

    render() {
        const {imgList = []} = this.props;
        const {activeSlide: active} = this.state;

        return (
            <div className={classes.product__gallery}>
                <ul className={classes['product__gallery-nav']}>
                {
                    imgList.map((src, i)=>{
                        return (
                            <li className={`${classes.item} ${i === active ? classes.active: ''}`}
                                key={i}
                                onClick={e=> this.#handleClick(e, src)}>
                                <img src={src} alt="" />
                            </li>
                        );
                    })
                }    
                </ul>
                <div className={classes['product__gallery-main']}>
                    <img src={imgList[active]} alt="" />
                </div>     
            </div>
        );
    }
}