import React, { Component } from 'react';

class Search extends Component {
	constructor(props) {
		super(props);
		this.inputRef = React.createRef();
	}
	componentDidMount() {
		if ( this.inputRef ) {
			this.inputRef.current.focus();
		}
	}
	render() {

	const { onSubmit, value, onChange, children } = this.props;

		return (
			<form onSubmit={ onSubmit }>
				{ children } 
				<input
					id="search"
					type="text"
					value={value}
					onChange={ onChange }
					ref = { this.inputRef }
				/>
				<button type="submit">{ children }</button>
			</form>			
		);
	}
}

export default Search;