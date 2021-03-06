import React, { Component } from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, className, children }) => 
	<button
		onClick={onClick}
		className={className}
		type="button"
	>
		{children}
	</button>

Button.defaultProps = {
	className: '',
}

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired
}




export default Button;