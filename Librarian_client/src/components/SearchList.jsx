import React from 'react';
import PropTypes from 'prop-types';
import {ListGroup, ListGroupItem} from 'reactstrap';

import SearchItem from 'components/SearchItem.jsx';
// import {createVote} from 'api/posts.js';

import './SearchList.css';

export default class PostList extends React.Component {
    static propTypes = {
        lists: PropTypes.array
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {lists, hasSearched} = this.props;

        let children = (

            <ListGroupItem className='empty d-flex justify-content-center align-items-center'>
                {hasSearched && <div className='empty-text'>No Result.<br/>Try another search text.</div>}
                {!hasSearched && <div className='empty-text'>Try to search something!</div>}
            </ListGroupItem>

        );
        if (lists.length) {
            children = lists.map(p => (
                <div className='item'>
                    <h5 className= {`${p.location} title`}>{p.location}</h5>
                    <ListGroupItem key={p.id} action className= {`${p.location} content`}>
                        <SearchItem {...p}/>
                    </ListGroupItem>
                </div>
            ));
        }

        return (
            <div className='search-list'>
                <ListGroup>{children}</ListGroup>
            </div>
        );
    }
}
