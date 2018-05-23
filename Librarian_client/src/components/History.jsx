import React from 'react';
import PropTypes from 'prop-types';
import {Alert, Button} from 'reactstrap';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import {addHistory, deleteHistory} from 'states/history-actions.js';
//import WeatherDisplay from 'components/WeatherDisplay.jsx';
import HistoryList from 'components/HistoryList.jsx';
import {getBook} from 'states/search-actions.js';

import './History.css';

class History extends React.Component {
    static propTypes = {
        historyLists: PropTypes.array,
        dispatch: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.deleteHistory = this.deleteHistory.bind(this);
        this.gethistory = this.gethistory.bind(this);
        this.searchBookFromHistory = this.searchBookFromHistory.bind(this);
    }

    componentDidMount() {
        this.gethistory();
    }
    //
    // componentWillUnmount() {
    //     if (this.props.weatherLoading) {
    //         cancelWeather();
    //     }
    // }
    //
    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.searchText !== this.props.searchText) {
    //         this.props.dispatch(listPosts(nextProps.searchText));
    //     }
    // }

    render() {
        // const {city, group, description, temp, unit, masking, posts, postLoading} = this.props;
        const historyLists = this.props.history.historyLists;
        // console.log(this.props);
        // console.log(historyLists);
        //document.body.className = `weather-bg ${group}`;

        // document.body.className = `weather-bg ${group}`;
        // document.querySelector('.weather-bg .mask').className = `mask ${masking ? 'masking' : ''}`;

        return (
            <div className='history'>
                <div className='historyList'>
                    <div className='title '>
                        <h4 className='label'>
                            <i className="fa fa-tag" aria-hidden="true"></i>&nbsp;&nbsp;History:
                        </h4>
                        <div className='d-bt'>
                            <Button Button outline color="warning" size="lg" block className='btn-delete' onClick={this.deleteHistory} >Delete History</Button>
                        </div>

                    </div>
                    <HistoryList className='h-list' historyLists={historyLists} searchAction={this.searchBookFromHistory}/>
                </div>
            </div>
        );

    }
    gethistory() {
        let history_cookie = cookie.load('history');
        if (history_cookie === undefined) {
            history_cookie = [];
        }
        this.props.dispatch(addHistory(history_cookie));
    }

    deleteHistory() {
        let temp = [];
        cookie.save('history', temp);
        this.props.dispatch(deleteHistory());
    }

    searchBookFromHistory(searchText, searchType) {
        this.props.dispatch(getBook(searchText, searchType));
    }
}

export default connect(state => ({history: state.history}))(History);
