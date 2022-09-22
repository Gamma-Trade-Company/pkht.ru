import React from 'react';
import {Link} from 'react-router-dom'

import './style.scss';
import LinkToCatalog from '../UI/LinkToCatalog';
import Search from '../search';
import MenuIcon from '../icons/menu';
import BackIcon from '../icons/arrow-back';

class Header extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            menu: [
                {
                    link: "/advantages/",
                    title: "Преимущества"
                },
                {
                    link: "/about/",
                    title: "О компании"
                },
                {
                    link: "/vacances/",
                    title: "Вакансии",
                    nativeLink: true,
                },
                {
                    link: "/where-to-buy/",
                    title: "Где купить"
                },
                {
                    link: "/feedback/",
                    title: "Обратная связь"
                },
            ],
            mobileMenuShow: false
        }
    }

    showMobMenu = (state) => {
        const body = document.querySelector("body");
        if (state) {
            body.style = "overflow: hidden";
        }
        else {
            body.style = "";
        }
        this.state.mobileMenuShow = state;
        this.setState(this.state);
    }

    render () {
        return (
            <>
                <header className='header'>
                    <Link to="/" className='header_logo'>
                        <img src="/img/ui/logo.png" alt='' className='header_logoImg' />
                    </Link>
                    <LinkToCatalog className="linkto__header-catalog"/>
                    <nav className='header_nav'>
                        <ul className='header_navList'>
                            {
                                this.state.menu.map(({link, title, nativeLink}, i) => (
                                    <li className='header_navItem' key={i}>
                                        {
                                            nativeLink ? <a href={link} className='header_navLink'>{title}</a> :
                                            <Link className='header_navLink' to={link}>{title}</Link>
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <Search />
                    
                    <button
                        className="header_mobCatalogButton"
                        type="button"
                        onClick={()=>this.showMobMenu(true)}
                    >
                        <MenuIcon />
                    </button>
                    <Link to="/" className='header_logo header_logo__mob'>
                        <img src="/img/ui/logo_mob.png" alt='' className='header_logoImg' />
                    </Link>
                    <span className="header_mobEmptyBlock" />
                </header>
                <div className={"mobileMenu" + (this.state.mobileMenuShow ? " mobileMenu__shown" : "")}>
                    <div className="mobileMenu_header">
                        <button
                            className="header_mobCatalogButton"
                            type="button"
                             onClick={()=>this.showMobMenu(false)}
                        >
                            <BackIcon />
                        </button>
                        <Link to="/" className='header_logo header_logo__mob' onClick={()=>this.showMobMenu(false)}>
                            <img src="/img/ui/logo_mob.png" alt='' className='header_logoImg' />
                        </Link>
                        <span className="header_mobEmptyBlock" />
                    </div>
                    <div className="mobileMenu_content">
                        <Link className="mobileMenu_item" to="/catalog/" onClick={()=>this.showMobMenu(false)}>
                            Каталог
                        </Link>
                        {this.state.menu.map(({link, title, nativeLink}, i) => (
                            nativeLink ? 
                            <a 
                                href={link}
                                onClick={()=>this.showMobMenu(false)}
                                className="mobileMenu_item"
                                key={i}
                                >
                                    {title}
                                </a> :
                            <Link
                            className="mobileMenu_item"
                            to={link}
                            onClick={()=>this.showMobMenu(false)}
                            key={i}
                        >
                            {title}
                        </Link>
                        ))}
                    </div>
                    <div className="mobileMenu_search">
                        <Search type="mobile" onSearch={()=>this.showMobMenu(false)} />
                    </div>
                </div>
            </>
        );
    }
}

export default Header;