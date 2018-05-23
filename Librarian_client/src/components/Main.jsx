import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Input,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';

import Search from 'components/Search.jsx';
import History from 'components/History.jsx'
//import Forecast from 'components/Forecast.jsx';
//import {setSearchText} from 'states/post-actions.js';
import {toggleNavbar} from 'states/main-actions.js';

import './Main.css';

class Main extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        navbarToggle: PropTypes.bool,
        store: PropTypes.object,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);

        this.searchEl = null;

        this.handleNavbarToggle = this.handleNavbarToggle.bind(this);
        //this.handleSearchKeyPress = this.handleSearchKeyPress.bind(this);
        this.handleClearSearch = this.handleClearSearch.bind(this);
    }

    render() {

        return (
            <Router>
                <div className='main'>
                    <div className='bg-faded navbar-top'>
                        <div className='container navbar-mid'>
                            <Navbar color='faded' light toggleable className='navbar-top'>
                                <NavbarToggler right onClick={this.handleNavbarToggle}/>
                                <NavbarBrand className='text-info ' href="/">
                                    <i className='space'>&nbsp;</i> <i className='title'>Libraian</i></NavbarBrand>
                                <Collapse isOpen={this.props.navbarToggle} navbar>
                                    <Nav navbar>
                                        <NavItem>
                                            <NavLink className='item' tag={Link} to='/history'>History</NavLink>
                                        </NavItem>
                                    </Nav>
                                </Collapse>
                                <img className='icon' src="../images/l_icon.png" height="42" width="42"/>
                            </Navbar>
                        </div>
                    </div>

                    <Route exact path="/" render={() => (<Search/>)}/>
                    <Route exact path="/history" render={() => (<History/>)}/>
                    <div className='footer'>
                        SufferBook.
                    </div>
                </div>
            </Router>
        );
    }

    handleNavbarToggle() {
        this.props.dispatch(toggleNavbar());
    }

    handleSearchKeyPress(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            this.props.dispatch(setSearchText(e.target.value));
        }
    }

    handleClearSearch() {
        this.props.dispatch(setSearchText(''));
        this.searchEl.value = '';
    }
}

export default connect(state => ({
    ...state.main,
    searchText: state.searchText
}))(Main);
