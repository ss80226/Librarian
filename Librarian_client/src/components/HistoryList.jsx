import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import HistoryItem from 'components/HistoryItem.jsx';
import uuid from 'uuid/v4';
// import {createVote} from 'api/posts.js';

import './HistoryList.css';

export default class HistoryList extends React.Component {
    static propTypes = {
        historyLists: PropTypes.array
    };

    constructor(props) {
        super(props);
        this.searchBookFromHistory = this.searchBookFromHistory.bind(this);
    }

    render() {
        const {historyLists} = this.props;
        // console.log('hi');
        // console.log(this.props);
        // console.log(historyLists);
        let children = (
            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                <div className='empty-text'>No Searching History.<br/>Try searching something!</div>
            </ListGroupItem>
        );
        if (historyLists.length) {
            children = historyLists.map(p => (
                <ListGroupItem className='card' tag={Link} to='/' key={uuid()} action>
                    <HistoryItem {...p} searchAction={this.searchBookFromHistory}/>
                </ListGroupItem>
            ));
        }

        return (
            <div className='history-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }

    searchBookFromHistory(searchText, searchType) {
        this.props.searchAction(searchText, searchType);
    }

}
