import { useEffect } from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductFeature from "../../components/ProductFeature";
import ProductGallery from "../../components/ProductGallery";
import classes from './ProductsCard.module.scss';

const ProductsCard = () => {
    const {id} = useParams();
    const [productInfo, setProductInfo] = useState(state);
    const {title, imgList, featureList} = productInfo;

    useEffect(()=>{
        (async()=>{
            const resp = await fetch(`http://move.pkht.ru/api/catalog/product-card/${id}/`);
            const { title, imgList, featureList } = await resp.json();
            setProductInfo({...productInfo, title, imgList, featureList});
        })();
    },[]);

    return (
        featureList.length === 0 ?
        <Navigate to="/non-existent" /> :
        <section className={classes.products__card}>
            <div className="container">
                <h1 className={classes.title}>{title}</h1>
                <div className={`row ${classes['products__card-content']}`}>
                    <div className="col">
                        <ProductGallery imgList={imgList}/>
                    </div>
                    <div className={`${classes.feature}`}>
                        <ProductFeature featureList={featureList} />
                    </div>
                </div>
            </div>
        </section>
    );
}

const state = {
    title: '',
    imgList: [],
    featureList: [],
};

export default ProductsCard;