import React from 'react';

import './Input.css';

function Input({
	onChange,
	placeholderText,
	labelText,
	inputName,
	value,
	type = 'text',
}) {
	return (
		<div className='inputWrapper'>
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

export default Input;
