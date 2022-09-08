import React from 'react';
import {Link} from 'react-router-dom';

import './style.scss';
import VKLogo from '../../assets/img/vk-logo.svg';

class Footer extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            nav: [
                {
                    name: "Где купить",
                    path: "/where-to-buy"
                }
            ]
        }
    }
    render () {

        const {nav} = this.state;

        return (
            <footer className='footer'>
                <Link to="/" className='footer_logo'>
                    <img src="/img/ui/logo.png" className='footer_logoImg' alt='' />
                </Link>
                <nav className='footer_nav'>
                    <ul className='footer_navList'>
                        {
                            nav.map((item, i)=> (
                                <li className='footer_navItem' key={i}>
                                    <Link to={item.path} className='footer_navLink'>{item.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <div className='footer_additionalLinks'>
                    <div className='footer_social'>
                        {/* <a href='https://vk.com/' target="_blank" className='footer_socialLink'>
                            <img src={VKLogo} alt='' className='footer_socialImg' />
                        </a> */}
                    </div>
                    <p className='footer_copyright'>© {new Date().getFullYear()} ООО "Аква плюс"</p>
                </div>
            </footer>
        );
    }
}

export default Footer;