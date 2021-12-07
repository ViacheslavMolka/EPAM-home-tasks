import React from 'react';
import PropTypes from 'prop-types';

import './Input.css';

function Input({
	onChange,
	placeholderText,
	labelText,
	inputName,
	value,
	type = 'text',
	width = '100%',
}) {
	return (
		<div className='inputWrapper' style={{ width: width }}>
			<label htmlFor={inputName}>{labelText}</label>
			<br />
			<input
				id={inputName}
				className='input'
				placeholder={placeholderText}
				type={type}
				value={value}
				name={inputName}
				onChange={onChange}
			/>
		</div>
	);
}

Input.propTypes = {
	placeholderText: PropTypes.string,
	onChange: PropTypes.func,
	labelText: PropTypes.string,
	inputName: PropTypes.string,
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	type: PropTypes.string,
	width: PropTypes.string,
};

export default Input;
