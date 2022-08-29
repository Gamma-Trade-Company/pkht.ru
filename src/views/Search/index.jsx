import { toHaveStyle } from "@testing-library/jest-dom/dist/matchers";
import React from "react";
import DetailedCatalog from "../../components/DetailedCatalog";
import withRouter from "../../components/withRouter";

class SearchView extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            location: props.location
        }
    }

    componentDidUpdate = () => {
        if (this.state.location !== this.props.location) {
            this.setState({
                location: this.props.location
            });
        }
    }

    render = () => {
        return (
            <section style={{marginTop: "3.3rem"}}>
                <div className="container">
                    <DetailedCatalog search={true} />
                </div>
            </section>
        )
    }
}

export default withRouter(SearchView);