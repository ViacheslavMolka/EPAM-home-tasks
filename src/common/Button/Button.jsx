import React from 'react';
import PropTypes from 'prop-types';

import './Button.css';

export const Button = ({
	buttonText,
	onClick,
	type = 'button',
	disabled = false,
	className = 'button',
	dataTestId = 'button',
}) => (
	<button
		disabled={disabled}
		type={type}
		className={className}
		onClick={onClick}
		data-testid={dataTestId}
	>
		{buttonText}
	</button>
);

Button.propTypes = {
	buttonText: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
	onClick: PropTypes.func,
	type: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
};
