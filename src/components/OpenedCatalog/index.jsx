import { Component } from "react";
import { Link } from "react-router-dom";
import classes from './OpenedCatalog.module.scss';

export default class OpenedCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: []
        };
    }
    
    componentDidMount() {
        this.setState({
            categoryList: [
                {
                    category: {
                        name: 'Краски',
                        link: '/catalog/1',
                    },
                    listItem: [
                        {
                            name: 'Акварель',
                            link: '/catalog/10'
                        },
                        {
                            name: 'Гуашь',
                            link: '/catalog/11'
                        },
                        {
                            name: 'Гуашь художественная',
                            link: '/catalog/12'
                        },
                        {
                            name: 'Масло',
                            link: '/catalog/13'
                        },
                        {
                            name: 'АКРИЛ',
                            link: '/catalog/14'
                        },
                        {
                            name: 'Краски по ткани',
                            link: '/catalog/15'
                        },
                    ],
                },                
                {
                    category: {
                        name: 'Художественные материалы',
                        link: '/catalog/2',
                    },
                    listItem: [
                        {
                            name: 'Картон грунтованный',
                            link: '/catalog/16'
                        },
                        {
                            name: 'Холсты',
                            link: '/catalog/17'
                        },
                        {
                            name: 'Вспомогательные жидкости',
                            link: '/catalog/18'
                        },
                    ],
                },                
                {
                    category: {
                        name: 'Канцелярские товары',
                        link: '/catalog/3',
                    },
                    listItem: [
                        {
                            name: 'Папки',
                            link: '/catalog/19'
                        },
                        {
                            name: 'Файлы',
                            link: '/catalog/20'
                        },
                        {
                            name: 'Регистраторы',
                            link: '/catalog/21'
                        },
                        {
                            name: 'Архивные Короба',
                            link: '/catalog/22'
                        },
                        {
                            name: 'Планшет',
                            link: '/catalog/23'
                        },
                        {
                            name: 'Закладки/планинг',
                            link: '/catalog/24'
                        },
                    ],
                },                
                {
                    category: {
                        name: 'Товары для лепки',
                        link: '/catalog/4',
                    },
                    listItem: [
                        {
                            name: 'Пластилин',
                            link: '/catalog/25'
                        },
                        {
                            name: 'Доски для лепки',
                            link: '/catalog/26'
                        },
                    ],
                },                
            ],
        });
    }

    render() {
        const {className} = this.props;
        const {categoryList} = this.state;
        return (
            <nav className={`row ${className !== undefined ? className: ''}`}>
                {
                    categoryList.map(({category : {name, link}, listItem})=> {
                        return (
                            <ul className={`col-12 col-sm-6 col-md-4 col-lg-3 ${classes.category__col}`} key={link}>
                                <li>
                                    <Link className={classes.category__title} to={link}>{name}</Link>
                                    <ul>
                                        {
                                            listItem.map(({name, link})=>{
                                                return (
                                                    <li key={link}>
                                                        <Link to={link} >{name}</Link>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>
                            </ul>
                        );
                    })
                }
            </nav>
        );
    }
}