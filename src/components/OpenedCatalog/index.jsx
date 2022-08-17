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

        fetch("http://move.pkht.ru/api/catalog/")
        .then(resp=>{
            try {
                resp.json().then(array=>{
                    this.state.categoryList = array;
                    this.setState(this.state);
                });
            }
            catch {

            }
        })
        .catch(err=>{

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