import React from 'react';
import {instanceOf, PropTypes} from 'prop-types';
import cookie from 'react-cookie';
//import Cookies from 'universal-cookie';
import {
    Form,
    Input,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {input, toggleSearchType, selectSearchType} from 'states/search-actions.js';
import {addHistory} from 'states/history-actions.js';
import moment from 'moment';

import './SearchForm.css';

class SearchForm extends React.Component {
    static propTypes = {
        inputValue: PropTypes.string,
        searchTypeToggle: PropTypes.bool,
        searchType: PropTypes.string,
        defaultSearchType: PropTypes.string,
        submitAction: PropTypes.func,
        dispatch: PropTypes.func
    };

    static getSearchTypeString(searchType) {
        return searchType === 'isbn'
            ? 'ISBN'
            : '書名';
    }

    constructor(props) {
        super(props);

        this.inputEl = null;
        // this.cookies = new Cookies();

        //this.handleFormToggle = this.handleFormToggle.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleNameSearchType = this.handleNameSearchType.bind(this);
        this.handleISBNSearchType = this.handleISBNSearchType.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSearchTypeToggle = this.handleSearchTypeToggle.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(selectSearchType(this.props.defaultType));
        console.log(this.props.defaultType);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.searchText !== this.props.searchText) {
            this.props.dispatch(input(nextProps.searchText));
        }
    }

    render() {
        const {inputValue, searchTypeToggle, searchType, searchText} = this.props;

        return (
            <div className={`search-form`}>
                <Form className='form-inline justify-content-center form-body' onSubmit={this.handleSubmit}>
                    <Input placeholder='keyword' className='II' type='text' size='lg' name='input' getRef={el => {
                        this.inputEl = el
                    }} value={inputValue
                        ? inputValue
                        : ''} onChange={this.handleInputChange}></Input>&nbsp;&nbsp;
                    <ButtonDropdown type='buttom' isOpen={searchTypeToggle} toggle={this.handleSearchTypeToggle} className='bd'>
                        <DropdownToggle type='button' caret color="secondary">
                            {SearchForm.getSearchTypeString(searchType)}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem type='button' onClick={this.handleNameSearchType}><i className="fa fa-book fa-lg" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;書名</DropdownItem>
                            <DropdownItem type='button' onClick={this.handleISBNSearchType}><i className='fa fa-barcode fa-lg' aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;ISBN</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>&nbsp;&nbsp;
                    <Button data-wow-iteration="999" data-wow-duration="2s" className='wow pulse not-weathermood-btn' color="info"><i className='fa fa-rocket fa-lg' aria-hidden="true"></i>&nbsp;&nbsp;Search</Button>
                </Form>

            </div>
        );
    }

    // handleFormToggle() {
    //     //this.props.dispatch(toggleForm());
    // }

    handleInputChange(e) {
        this.props.dispatch(input(e.target.value));
    }

    handleNameSearchType(e) {
        this.props.dispatch(selectSearchType('name'));
    }

    handleISBNSearchType(e) {
        this.props.dispatch(selectSearchType('isbn'));
    }

    handleSubmit(e) {
        e.preventDefault();

        // console.log(Cookies);
        // console.log(this.cookies);
        this.inputEl.blur();
        const {inputValue, searchText, searchType, dispatch} = this.props;
        if (inputValue && inputValue.trim()) {
            dispatch(this.props.submitAction(inputValue, searchType));
            //this.handleFormToggle();
        } else {
            dispatch(input(searchText));
        }
        if (inputValue && inputValue.trim()) {
            // console.log(this.cookies, this.cookies.get);
            let history_cookie = cookie.load('history');
            if (history_cookie === undefined) {
                history_cookie = [];
            } else if (history_cookie.length>=15) {
                // Max # of history
                history_cookie.pop();
            }
            let date = new Date();
            let date_f = moment(date).calendar();
            let history_add = {
                searchText: inputValue,
                searchType: searchType,
                searchTime: date_f
            }
            history_cookie = [history_add].concat(history_cookie);
            cookie.save('history', history_cookie);
            dispatch(addHistory(history_cookie));
        }

    }

    handleSearchTypeToggle(e) {
        this.props.dispatch(toggleSearchType());
    }
}

export default connect(state => state.searchForm)(SearchForm);
