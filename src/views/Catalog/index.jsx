import { Outlet } from "react-router-dom";

const Catalog = () => {
    return (
        <section style={{marginTop: '3.3rem'}}>
            <div className="container">
                <Outlet/>
            </div>       
        </section>
    );
}

export default Catalog;