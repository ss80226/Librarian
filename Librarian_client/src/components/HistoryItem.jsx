import React from 'react';
import PropTypes from 'prop-types';
import {Tooltip, Button} from 'reactstrap';
import {connect} from 'react-redux';
import moment from 'moment';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import {getBook} from 'states/search-actions.js';
//import {getMoodIcon} from 'utilities/weather.js';
//import {createVote, setTooltipToggle, toggleTooltip} from 'states/post-actions.js';

import './HistoryItem.css';

export default class HistoryItem extends React.Component {
    static propTypes = {

        dispatch: PropTypes.func,
        searchText: PropTypes.string,
        searchType: PropTypes.string,
        searchTime: PropTypes.string
    };

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleTooltipToggle = this.handleTooltipToggle.bind(this);
        this.handleVote = this.handleVote.bind(this);
    }

    render() {
        const {searchText, searchType, searchTime} = this.props;

        return (
            <div className='history-item d-flex flex-column' onClick={this.handleClick}>
                <div className='history d-flex row'>
                    <div className='wrap col-md-12'>
                        <div className='searchText'>
                            <i className="fa fa-dot-circle-o" aria-hidden="true"></i>&nbsp;<strong>Keyword:</strong>&nbsp;<i className='text'>{searchText}</i>
                        </div>
                        <div className='searchType'>
                            <i className="fa fa-dot-circle-o" aria-hidden="true"></i>&nbsp;<strong>Search type:</strong>&nbsp;<i className='text'>{searchType === 'name'
                                    ? '書名'
                                    : 'ISBN'}</i>
                        </div>
                        <br/>
                        <div className='d-flex justify-content-end search-time'>
                            <span className='time'>{searchTime}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleClick() {
        const {searchText, searchType} = this.props;
        this.props.searchAction(searchText, searchType);
    }

    handleTooltipToggle() {
        //this.props.dispatch(toggleTooltip(this.props.id));
    }

    handleVote(vote) {
        // this.props.dispatch(createVote(this.props.id, vote));
        // this.props.dispatch(setTooltipToggle(this.props.id, false));
    }
}
//
// export default connect((state, ownProps) => ({
//     tooltipOpen: state.postItem.tooltipOpen[ownProps.id]
//         ? true
//         : false
// }))(PostItem);
//         : false
//}
