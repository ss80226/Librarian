import React from 'react';
import PropTypes from 'prop-types';
import {Alert} from 'reactstrap';
import {connect} from 'react-redux';

//import WeatherDisplay from 'components/WeatherDisplay.jsx';
import SearchForm from 'components/SearchForm.jsx';
// import SearchWord from 'components/SearchWord.jsx';
import SearchList from 'components/SearchList.jsx';
//import {cancelWeather} from 'api/open-weather-map.js';
import {getBook} from 'states/search-actions.js';
//import {listPosts, createPost, createVote} from 'states/post-actions.js';
// import PostForm from 'components/PostForm.jsx';
// import PostList from 'components/PostList.jsx';

import './Search.css';

class Search extends React.Component {
    static propTypes = {
        searchText: PropTypes.string,
        searchType: PropTypes.string,
        weatherLoading: PropTypes.bool,
        masking: PropTypes.bool,
        lists: PropTypes.array,
        postLoading: PropTypes.bool,
        posts: PropTypes.array,
        dispatch: PropTypes.func,
        hasSearched: PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    // componentDidMount() {
    //     this.props.dispatch(getBook('Hsinchu', this.props.unit));
    //     this.props.dispatch(listPosts(this.props.searchText));
    // }
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
        const {
            searchType,
            masking,
            lists,
            searchText,
            searchLoading_nthu,
            searchLoading_nctu,
            hasSearched
        } = this.props;
        //console.log(this.props);
        //document.body.className = `weather-bg ${group}`;
        document.querySelector('.librarian-bg .mask').className = `mask ${masking
            ? 'masking'
            : ''}`;
        //
        // document.body.className = `weather-bg ${group}`;
        // document.querySelector('.librarian-bg .unhasSearched').className = `.librarian-bg ${hasSearched
        //     ? 'hasSearched'
        //     : 'unhasSearched'}`;
        return (
            <div className='search'>
                <div className='searchForm group'>
                    <SearchForm searchText={searchText} defaultType={searchType} submitAction={getBook}/>
                </div>
                <div className='searchText group'>
                    <h5 className='label'>
                        <i className='fa fa-pencil' aria-hidden="true"></i>&nbsp;&nbsp;Keyword:
                    </h5>
                    <div className='searchText-show'>
                        {searchText}
                    </div>
                </div>
                <div className='searchList group'>
                    <h5 className='label'>
                        <i className='fa fa-list' aria-hidden="true"></i>&nbsp;&nbsp;Search Result:
                    </h5>
                    <SearchList lists={lists} hasSearched={hasSearched}/> {(searchLoading_nthu || searchLoading_nctu) && <Alert size='lg' color='warning' className='loading'>
                        <i className="fa fa-refresh fa-spin fa-fw"></i>&nbsp;Loading...</Alert>}
                </div>
            </div>
        );
        // return (
        //     <div className='search'>
        //         <div className='searchForm'>
        //             <SearchForm defaultType={searchType} submitAction={getBook}/>
        //             <SearchWord/>
        //             <SearchList/>
        //         </div>
        //
        //     </div>
        // );
    }
}

export default connect(state => ({
    ...state.search,
    searchType: state.searchType
}))(Search);
