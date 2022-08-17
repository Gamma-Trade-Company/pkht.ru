import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import FilterSide from "./FilterSide";
import classes from './DetailedCatalog.module.scss';
import ProductItem from "../ProductItem";
import { useMemo } from "react";
import scrollAnimate from '../../utils/scrollAnimate';

const DetailedCatalog = () => {
    const { id } = useParams();
    const [data, setData] = useState(state);
    const { title, filterList, productList } = data;
    useEffect( () => {
        (async()=>{
            const resp =  await fetch(`http://move.pkht.ru/api/catalog/${id}/`);
            const {goods, parentCategory: {name: title}} = await resp.json();
            setData({...data, title, productList: goods});
        })();
    }, []);

    async function handlerChange({type, groupName, ...props}) {
        const {default: deepObjectClone} = await import('rfdc');
        const clone = deepObjectClone({proto: false});
        const clonedFilterList = clone(filterList);

        for (let i = 0; i < clonedFilterList.length; i++) {
            const item = clonedFilterList[i];
            if (item.name === groupName) {
                if (type === 'radio') {
                   item.checkedValue = props.value;
                   item.checkedList[0] = props.id;
                   setData({...data, filterList: clonedFilterList});
                } else {
                    const formElem = item.formElem.find(elem => elem.id === props.id);
                    if (formElem) {
                        formElem.checked = !formElem.checked;
                        if (formElem.checked) {
                            item.checkedList.push(props.id);
                        } else {
                            const indexForRemove = item.checkedList.indexOf(props.id);
                            item.checkedList.splice(indexForRemove, 1);
                        }
                        setData({...data, filterList: clonedFilterList});
                    }
                }
                
                scrollAnimate(window, 0, 500);
                return;
            }
        }

    }

    const filteredProductList = useMemo(()=>{
        let clonedProductList = [...productList];
        filterList.forEach(({checkedList}) => {
            clonedProductList = clonedProductList.filter(({filterList})=> {
                if (checkedList.length === 0) return true;
                for (let i = 0; i < checkedList.length; i++) {
                    if (filterList.includes(checkedList[i])) return true;
                }
                return false;
            });
        });
        return clonedProductList;
    }, [filterList, title]); // коммент для Костина Максима: Как появятся фильтры убрать константу title

    return (
        <div className={`row ${classes.detaild__wrapper}`}>
            <FilterSide title={title}>
                <ul className={classes.filter__list}>
                    {
                        filterList.map(({name, type, formElem, checkedValue}) => {
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
                                                            checkedValue === undefined ?
                                                            <Input
                                                                className={classes.label}
                                                                {...elem}
                                                                type={type}
                                                                groupName={name}
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
                <div className="row">
                    {
                        filteredProductList.length !== 0 ?
                        filteredProductList.map(item => (
                            <div className="col-12 col-sm-6 col-md-4" key={item.link} style={{marginBottom: '3.5rem'}}>
                                <ProductItem {...item}/>
                            </div>                         
                        )) :
                        <h2>По заданным фильтрам товар не найден</h2>
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
}

export default DetailedCatalog;

// Структура JSON объекта приходящего с сервера
// {
//     title: 'Краски',
//     filterList: [
//         {
//             name: 'Наличие',
//             type: 'radio',
//             checkedValue: 0,
//             checkedList: [
//                 // 'filter-paramnal0'
//             ],
//             formElem: [
//                 {
//                     id: 'filter-paramnal0',
//                     name: 'filter-shop',
//                     value: 0,
//                     label: 'Все товары',
//                     disabled: false,
//                 },
//                 {
//                     id: 'filter-paramnal1',
//                     name: 'filter-shop',
//                     value: 1,
//                     label: 'В наличии',
//                     disabled: false,
//                 },
//             ],
//         },
//         {
//             name: 'Новинки',
//             type: 'radio',
//             checkedValue: null,
//             checkedList: [],
//             formElem: [
//                 {
//                     id: 'filterchecknovinki:1',
//                     name: 'novinki',
//                     value: 1,
//                     label: '1 месяц',
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknovinki:2',
//                     name: 'novinki',
//                     value: 2,
//                     label: '2 месяца',
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknovinki:3',
//                     name: 'novinki',
//                     value: 3,
//                     label: '3 месяца',
//                     disabled: false,
//                 },
//             ],
//         },
//         {
//             name: 'Эффект',
//             type: 'checkbox',
//             checkedList: [],
//             formElem: [
//                 {
//                     id: 'filtercheckeffect:635',
//                     name: 'effect',
//                     value: '635',
//                     label: 'без эффекта',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filtercheckeffect:4887',
//                     name: 'effect',
//                     value: '4887',
//                     label: 'велюр',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filtercheckeffect:642',
//                     name: 'effect',
//                     value: '642',
//                     label: 'глянцевый',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filtercheckeffect:649',
//                     name: 'effect',
//                     value: '649',
//                     label: 'грифельная доска',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filtercheckeffect:647',
//                     name: 'effect',
//                     value: '647',
//                     label: 'иридисцентный',
//                     checked: false,
//                     disabled: false,
//                 },
//             ],
//         },
//         {
//             name: 'Назначение',
//             type: 'checkbox',
//             checkedList: [],
//             formElem: [
//                 {
//                     id: 'filterchecknaznachenie:5235',
//                     name: 'naznachenie',
//                     value: '5235',
//                     label: 'декоративные',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknaznachenie:804',
//                     name: 'naznachenie',
//                     value: '804',
//                     label: 'для декорирования',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknaznachenie:2627',
//                     name: 'naznachenie',
//                     value: '2627',
//                     label: 'для декупажа',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknaznachenie:803',
//                     name: 'naznachenie',
//                     value: '803',
//                     label: 'для рисования',
//                     checked: false,
//                     disabled: false,
//                 },
//                 {
//                     id: 'filterchecknaznachenie:808',
//                     name: 'naznachenie',
//                     value: '808',
//                     label: 'для творчества',
//                     checked: false,
//                     disabled: false,
//                 },
//             ],
//         },
//     ],
//     productList: [
//         {
//             img: '/img/products/1.jpg',
//             title: '"Love2art" Краска для ткани FAP-60 60 мл',
//             link: '/products-card/1',
//             price: '395 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:1',
//                 'filtercheckeffect:4887',
//                 'filterchecknaznachenie:5235',
//             ],
//         },
//         {
//             img: '/img/products/2.jpg',
//             title: '"Love2art" Краска по стеклу и фарфору GPP-30 30 мл',
//             link: '/products-card/2',
//             price: '301 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filter-paramnal1',
//                 'filterchecknovinki:2',
//                 'filtercheckeffect:635',
//                 'filterchecknaznachenie:804',
//             ],
//         },
//         {
//             img: '/img/products/3.jpg',
//             title: '"Love2art" морилка LAS-80 80 мл',
//             link: '/products-card/3',
//             price: '391 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:3',
//                 'filtercheckeffect:642',
//                 'filterchecknaznachenie:2627',
//             ],
//         },
//         {
//             img: '/img/products/1.jpg',
//             title: '"Love2art" Краска для ткани FAP-60 60 мл',
//             link: '/products-card/4',
//             price: '395 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:1',
//                 'filtercheckeffect:4887',
//                 'filterchecknaznachenie:5235',
//             ],
//         },
//         {
//             img: '/img/products/2.jpg',
//             title: '"Love2art" Краска по стеклу и фарфору GPP-30 30 мл',
//             link: '/products-card/5',
//             price: '301 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filter-paramnal1',
//                 'filterchecknovinki:2',
//                 'filtercheckeffect:635',
//                 'filterchecknaznachenie:804',
//             ],
//         },
//         {
//             img: '/img/products/3.jpg',
//             title: '"Love2art" морилка LAS-80 80 мл',
//             link: '/products-card/6',
//             price: '391 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:3',
//                 'filtercheckeffect:642',
//                 'filterchecknaznachenie:2627',
//             ],
//         },
//         {
//             img: '/img/products/1.jpg',
//             title: '"Love2art" Краска для ткани FAP-60 60 мл',
//             link: '/products-card/7',
//             price: '395 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:1',
//                 'filtercheckeffect:4887',
//                 'filterchecknaznachenie:5235',
//             ],
//         },
//         {
//             img: '/img/products/2.jpg',
//             title: '"Love2art" Краска по стеклу и фарфору GPP-30 30 мл',
//             link: '/products-card/8',
//             price: '301 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filter-paramnal1',
//                 'filterchecknovinki:2',
//                 'filtercheckeffect:635',
//                 'filterchecknaznachenie:804',
//             ],
//         },
//         {
//             img: '/img/products/3.jpg',
//             title: '"Love2art" морилка LAS-80 80 мл',
//             link: '/products-card/9',
//             price: '391 ₽/шт',
//             filterList: [
//                 'filter-paramnal0',
//                 'filterchecknovinki:3',
//                 'filtercheckeffect:642',
//                 'filterchecknaznachenie:2627',
//             ],
//         },
//     ],
// }