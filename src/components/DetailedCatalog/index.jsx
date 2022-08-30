import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Input from "../UI/Input";
import FilterSide from "./FilterSide";
import classes from './DetailedCatalog.module.scss';
import ProductItem from "../ProductItem";
import { useMemo } from "react";
import scrollAnimate from '../../utils/scrollAnimate';
import FilterIcon from "../icons/filter";

const DetailedCatalog = (props) => {
    const { id } = useParams();
    let { query } = useParams();
    query = decodeURI(query);
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const [data, setData] = useState(state);
    const { title, filterList, productList } = data;

        
        useEffect( () => {
            if (props.search === true) {
                searchQuery();
            }
            else {
                (async()=>{
                    const resp =  await fetch(`https://pkht.ru/api/catalog/${id}/`+location.search);
                    const {goods, parentCategory: {name: title}, filters} = await resp.json();
        
                    filters.forEach(filter=>filter.formElem.sort((a,b)=>a.value > b.value ? 1 : -1));
                    
                    document.title = title + " — Переславский комбинат художественных товаров";
        
                    setData({...data, title, filterList: filters, productList: goods});
                })();
            }
        }, []);

        useEffect(()=>{
            if (props.search === true) {
                searchQuery();
            }
        }, [location]);

        const searchQuery = async()=>{
            const resp =  await fetch(`https://pkht.ru/api/search/?q=${query}`);
            const json = await resp.json();

            document.title = "\"" + query + "\" — Переславский комбинат художественных товаров";

            setData({...data, title: "Поиск по \""+json.query+"\"", filterList: [], productList: json.goods});
        }

    async function handlerChange({type, groupName, ...props}) {

        const {default: deepObjectClone} = await import('rfdc');
        const clone = deepObjectClone({proto: false});
        const clonedFilterList = clone(filterList);

        for (let i = 0; i < clonedFilterList.length; i++) {
            const item = clonedFilterList[i];
            if (item.name === groupName) {
                const formElem = item.formElem.find(elem => elem.id === props.id);

                if (type === 'radio') {
                   item.checkedValue = props.value;
                   item.checkedList[0] = props.id;
                   setData({...data, filterList: clonedFilterList});
                } else {
                    if (formElem) {

                        let isChecked = false;

                        item.checkedList.forEach(checkedName=>{
                            if (checkedName === "filter-"+formElem.id) isChecked = true;
                        });

                        isChecked = !isChecked;
                        if (isChecked) {
                            item.checkedList.push(props.name);
                        } else {
                            const indexForRemove = item.checkedList.indexOf(props.name);
                            item.checkedList.splice(indexForRemove, 1);
                        }
                        setData({...data, filterList: clonedFilterList});
                    }
                }
                
                scrollAnimate(window, 0, 500);

                getFiltredGoods(clonedFilterList);

                return;
            }
        }
    }

    const getFiltredGoods = async (updatedFilterList) => {

        let newSearch = "";

        updatedFilterList.forEach(filter=>{
            filter.formElem.forEach(elem=>{
                if (filter.checkedList.indexOf(elem.name) > -1) {
                    if (newSearch) newSearch += ";";
                    newSearch += filter.codeName + ":" + elem.value;
                }
            });
        });

        if (newSearch) newSearch = "?filter=" + newSearch;

        navigate(`/catalog/${id}/`+newSearch);

        const resp =  await fetch(`https://pkht.ru/api/catalog/${id}/`+newSearch);
        const {goods, parentCategory: {name: title}, filters} = await resp.json();

        filters.forEach(filter=>filter.formElem.sort((a,b)=>a.value > b.value ? 1 : -1));
        
        setData({...data, filterList: filters, productList: goods});
    }

    const showFilterMob = () => {
        setData({...data, showFilterMob: true});
    }

    const hideFilterMob = () => {
        setData({...data, showFilterMob: false});
    }

    // const filteredProductList = useMemo(()=>{
    //     let clonedProductList = [...productList];
    //     filterList.forEach(({checkedList}) => {
    //         clonedProductList = clonedProductList.filter(({filterList})=> {
    //             if (checkedList.length === 0) return true;
    //             for (let i = 0; i < checkedList.length; i++) {
    //                 if (filterList.includes(checkedList[i])) return true;
    //             }
    //             return false;
    //         });
    //     });
    //     return clonedProductList;
    // }, [filterList, title]); // коммент для Костина Максима: Как появятся фильтры убрать константу title

    return (
        <div className={`row ${classes.detaild__wrapper}`}>
            <FilterSide
                title={title}
                shown={data.showFilterMob}
                close={hideFilterMob}
            >
                <ul className={classes.filter__list}>
                    {
                        filterList.map(({name, type, formElem, checkedValue, checkedList, codeName}) => {
                            return (
                                <li key={name}>
                                    <div className={classes.title}>
                                        {name}
                                    </div>
                                    <ul>
                                        {
                                            formElem.map(elem => {
                                                return (
                                                    <li key={elem.id}>
                                                        {
                                                            !checkedValue ?
                                                            <Input
                                                                className={classes.label}
                                                                {...elem}
                                                                type={type}
                                                                groupName={name}
                                                                checked={(()=>{
                                                                    let retirnValue = false;

                                                                    checkedList.forEach(checkedName=>{
                                                                        if (checkedName === "filter-"+codeName+elem.value) retirnValue = true;
                                                                    });

                                                                    return retirnValue;
                                                                })()}
                                                                onChange={handlerChange} /> :
                                                            <Input
                                                                className={classes.label}
                                                                {...elem}
                                                                checked={checkedValue === elem.value}
                                                                type={type}
                                                                groupName={name}
                                                                onChange={handlerChange} />
                                                        }
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                            );   
                        })
                    }
                </ul>
            </FilterSide>
            <div className="col" style={{ marginLeft: 'auto', maxWidth: 832 }}>

                {
                    !props.search ? (
                        <>
                            <div className="row detailedCatalogMob">
                                <h3>{title}</h3>
                            </div>
                            <div className="row detailedCatalogMob">
                                <button className="detailedCatalogMob_button" type="button" onClick={showFilterMob}>
                                    <FilterIcon />
                                    Фильтры
                                </button>
                            </div>
                        </>
                    ) : ""
                }
                <div className="row">
                    {
                        productList ? (
                            productList.length !== 0 ?
                            productList.map(item => (
                                <div className="col-12 col-sm-6 col-md-4" key={item.link} style={{marginBottom: '3.5rem'}}>
                                    <ProductItem {...item}/>
                                </div>                         
                            )) :
                            <h2>По заданным фильтрам товар не найден</h2>
                        ) : <h2>По заданным фильтрам товар не найден</h2>
                    }
                </div>
            </div>
        </div>
    );
}

const state = {
    title: '',
    filterList: [],
    productList: [],
    showFilterMob: false
}

export default DetailedCatalog;