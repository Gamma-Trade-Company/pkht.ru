import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../UI/Input";
import FilterSide from "./FilterSide";
import classes from './DetailedCatalog.module.scss';


const DetailedCatalog = () => {
    const { id } = useParams();
    const [data, setData] = useState(state);
    const { title, filterList, productList } = data;
    useEffect(() => {
        setData({
            title: 'Краски',
            filterList: [
                {
                    name: 'Наличие',
                    type: 'radio',
                    checkedValue: 0,
                    formElem: [
                        {
                            id: 'filter-paramnal0',
                            name: 'filter-shop',
                            value: 0,
                            label: 'Все товары',
                            disabled: false,
                        },
                        {
                            id: 'filter-paramnal1',
                            name: 'filter-shop',
                            value: 1,
                            label: 'В наличии',
                            disabled: false,
                        },
                    ],
                },
                {
                    name: 'Новинки',
                    type: 'radio',
                    checkedValue: null,
                    formElem: [
                        {
                            id: 'filterchecknovinki:1',
                            name: 'novinki',
                            value: 1,
                            label: '1 месяц',
                            disabled: false,
                        },
                        {
                            id: 'filterchecknovinki:2',
                            name: 'novinki',
                            value: 2,
                            label: '2 месяца',
                            disabled: false,
                        },
                        {
                            id: 'filterchecknovinki:3',
                            name: 'novinki',
                            value: 3,
                            label: '3 месяца',
                            disabled: false,
                        },
                    ],
                },
                {
                    name: 'Эффект',
                    type: 'checkbox',
                    formElem: [
                        {
                            id: 'filtercheckeffect:635',
                            name: 'effect',
                            value: '635',
                            label: 'без эффекта',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filtercheckeffect:4887',
                            name: 'effect',
                            value: '4887',
                            label: 'велюр',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filtercheckeffect:642',
                            name: 'effect',
                            value: '642',
                            label: 'глянцевый',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filtercheckeffect:649',
                            name: 'effect',
                            value: '649',
                            label: 'грифельная доска',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filtercheckeffect:647',
                            name: 'effect',
                            value: '647',
                            label: 'иридисцентный',
                            checked: false,
                            disabled: false,
                        },
                    ],
                },
                {
                    name: 'Назначение',
                    type: 'checkbox',
                    formElem: [
                        {
                            id: 'filterchecknaznachenie:5235',
                            name: 'naznachenie',
                            value: '5235',
                            label: 'декоративные',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filterchecknaznachenie:804',
                            name: 'naznachenie',
                            value: '804',
                            label: 'для декорирования',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filterchecknaznachenie:2627',
                            name: 'naznachenie',
                            value: '2627',
                            label: 'для декупажа',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filterchecknaznachenie:803',
                            name: 'naznachenie',
                            value: '803',
                            label: 'для рисования',
                            checked: false,
                            disabled: false,
                        },
                        {
                            id: 'filterchecknaznachenie:808',
                            name: 'naznachenie',
                            value: '808',
                            label: 'для творчества',
                            checked: false,
                            disabled: false,
                        },
                    ],
                },
            ],
            productList: [

            ],
        });
    }, []);

    async function handlerChange({type, groupName, ...props}) {
        const {default: deepObjectClone } = await import('rfdc');
        const clone = deepObjectClone({proto: true});
        const clonedFilterList = clone(filterList);

        for (let i = 0; i < clonedFilterList.length; i++) {
            const item = clonedFilterList[i];
            if (item.name === groupName) {
                if (type === 'radio') {
                   item.checkedValue = props.value;
                   setData({...data, filterList: clonedFilterList});
                } else {
                    const formElem = item.formElem.find(elem => elem.id === props.id);
                    if (formElem) {
                        formElem.checked = !formElem.checked;
                        setData({...data, filterList: clonedFilterList});
                    }
                }
                
                return;
            }
        }
    }

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