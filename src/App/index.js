import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { sortBy } from 'lodash';
import './index.css';

// Font-awesome
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import regular from '@fortawesome/fontawesome-free-regular';
import solid from '@fortawesome/fontawesome-free-solid';

fontawesome.library.add(regular, solid);

import Search from '../Search/index.js';
import Table from '../Table/index.js';
import Button from '../Button/index.js';
import Loading from '../Loading/index.js';
import Sort from '../Sort/index.js';

const DEFAULT_QUERY = 'redux';
const DEFAULT_HPP = '20';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const PARAM_HPP = 'hitsPerPage';

const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


const updateSearchTopStoriesState = ( hits, page ) => ( prevState ) => {
	const { searchKey, results } = prevState;

	const oldHits = results && results[searchKey]
		? results[searchKey].hits : [];

	const updatedHits = [
		...oldHits, 
		...hits
	];

	return {
		results: {
			...results,
			[searchKey]: { hits: updatedHits, page }
		},
		isLoading: false
	}
}

 const updateDismiss = ( id ) => ( prevState ) => {
		const { searchKey, results } = prevState;
		const { hits, page } = results[searchKey];

		const isNotId = item => item.objectID !== id;
		const updatedHits = hits.filter( isNotId );
		return { 
			results: { 
				...results,
				[searchKey] : { hits: updatedHits, page }
			} // spread operator for merging
		};
 }

class App extends Component {
	_isMounted = false;

	constructor(props) {
		super(props);
		this.state = {
			results: null,
			searchKey: '',
			searchTerm: DEFAULT_QUERY,
			error: null,
			isLoading: false,
		};
		this.needsToSearchTopStories = this.needsToSearchTopStories.bind( this );
		this.setSearchTopStories = this.setSearchTopStories.bind( this );
		this.fetchSearchTopStories = this.fetchSearchTopStories.bind( this );
		this.onDismiss = this.onDismiss.bind( this );
		this.onSearchChange = this.onSearchChange.bind( this );
		this.onSearchSubmit = this.onSearchSubmit.bind( this );
	} 

	needsToSearchTopStories( searchTerm ) {
		return !this.state.results[searchTerm];
	}

	fetchSearchTopStories( searchTerm, page = 0 ) {
		this.setState({
			isLoading: true
		});

		axios( `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}` )
			.then( result => this._isMounted && this.setSearchTopStories( result.data ) )
			.catch( error => this._isMounted && this.setState( { error } ) );
	}

	setSearchTopStories( result ) {
		const { hits, page } = result;
		this.setState(updateSearchTopStoriesState( hits, page ));
	}

	onDismiss( id ) {
		// const { searchKey, results } = this.state;
		// const { hits, page } = results[searchKey];

		// const isNotId = item => item.objectID !== id;
		// const updatedHits = hits.filter( isNotId );
		// this.setState({ 
		// 	results: { 
		// 		...results,
		// 		[searchKey] : { hits: updatedHits, page }
		// 	} // spread operator for merging
		// });

		this.setState( updateDismiss( id ) );
	}

	onSearchChange( event ) {
		this.setState( { searchTerm: event.target.value } );
	} 

	onSearchSubmit( event ) {
		const { searchTerm } = this.state;
		this.setState( { searchKey: searchTerm } );
		if ( this.needsToSearchTopStories( searchTerm ) ) {
			this.fetchSearchTopStories( searchTerm );
		}
		event.preventDefault();
	}

	onMeledog = ( event, name ) => { console.log( event.type, ' ', name ) }

	componentDidMount() {
		this._isMounted = true
		const { searchTerm, error } = this.state;

		this.setState( { searchKey : searchTerm } );

		this.fetchSearchTopStories( searchTerm );
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		const { searchTerm, results, searchKey, error, isLoading } = this.state;

		const page = ( results && results[searchKey] && results[searchKey].page ) || 0;

		const list = ( results && results[searchKey] && results[searchKey].hits ) || [];

		return (
			<div className="page">
				<div className="interactions">
					<Search 
						value={searchTerm} 
						onChange={this.onSearchChange}
						onSubmit={this.onSearchSubmit}
					>
						Search
					</Search>
				</div>

				{ error ?
					<div className="interactions">
						<p>Something went wrong.</p>
					</div>
					:
					<Table 
						list={list}
						onDismiss={this.onDismiss}
					/>
				}
				<div className="interactions">
					<ButtonWithLoading 
						isLoading={ isLoading }
						onClick={ () => this.fetchSearchTopStories( searchKey, page + 1) }
						>
						More
					</ButtonWithLoading>
				</div>	
			</div>
		);
	}
}

 // High Order Component for conditional rendering
const withLoading = ( Component ) => ( { isLoading, ...rest } ) => 
	isLoading ? 
		<Loading /> :
		<Component { ...rest } />

const ButtonWithLoading = withLoading( Button );

export default App; 

export {
	Button,
	Search,
	Table,
}; 
