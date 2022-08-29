import {useLocation, useParams, useNavigate} from "react-router-dom";

const withRouter = WrappedComponent => props => {
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    // etc... other react-router-dom v6 hooks
    return (
        <WrappedComponent
            {...props}
            params={params}
            navigate={navigate}
            location={location}
            // etc...
        />
    );
};

export default withRouter;