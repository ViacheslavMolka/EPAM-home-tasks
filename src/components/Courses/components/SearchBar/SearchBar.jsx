import React from 'react';

import { Button } from '../../../../common/Button/Button';
import { buttonText } from '../../../../constants';

import './SearchBar.css';

function SearchBar({ onChange, onSubmit }) {
	return (
		<form onSubmit={onSubmit}>
			<input
				className='input'
				placeholder='Enter course name or id...'
				type='text'
				name='search'
				onChange={onChange}
			/>
			<Button type='submit' buttonText={buttonText.search} />
		</form>
	);
}

export default SearchBar;
