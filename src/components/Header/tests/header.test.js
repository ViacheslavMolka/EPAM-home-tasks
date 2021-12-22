import * as React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../Header';

test('Header should have logo and user name', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
		},
		courses: [],
		authors: [],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	render(
		<Router>
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		</Router>
	);
	expect(screen.getByText('Test Name')).toBeInTheDocument();
	expect(screen.getByAltText('logo')).toBeInTheDocument();
});
