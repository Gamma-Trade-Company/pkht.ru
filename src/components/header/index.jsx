import React from 'react';
import {Link} from 'react-router-dom'

import './style.scss';
import LogoImg from '../../assets/img/logo.png';
import LinkToCatalog from '../UI/LinkToCatalog';

class Header extends React.Component {
    render () {
        return (
            <header className='header'>
                <Link to="/" className='header_logo'>
                    <img src={LogoImg} alt='' className='header_logoImg' />
                </Link>
                <LinkToCatalog className="linkto__header-catalog"/>
                <nav className='header_nav'>
                    <ul className='header_navList'>
                        <li className='header_navItem'>
                            <Link className='header_navLink' to="/where-to-buy">Где купить</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;