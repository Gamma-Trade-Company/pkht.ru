import React from 'react';

import './style.scss';

import SearchIcon from '../icons/search';
import withRouter from '../withRouter/';

class Search extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            searchText: ""
        }
    }

    onChange = (e) => {
        this.state.searchText = e.target.value;
        this.setState(this.state);
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.sendQuery();
        }
    }

    sendQuery = () => {
        if (this.state.searchText !== "") {
            const { searchText } = this.state;
            this.state.searchText = "";
            this.setState(this.state, () => {
                this.props.onSearch();
                this.props.navigate("/search/"+searchText.replace("/", " ")+"/");
            });
        }
    }

    render = () => {
        const {type} = this.props;
        const {searchText} = this.state;
        const {onChange, onKeyUp, sendQuery} = this;

        return (
            <div className={"searchBar" + (type === 'mobile' ? " searchBar__mob" : "")}>
                <SearchIcon onClick={sendQuery} />
                <input
                    type="search"
                    className="searchBar_input"
                    placeholder="Найти"
                    value={searchText}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                />
            </div>
        );
    }
}

export default withRouter(Search);