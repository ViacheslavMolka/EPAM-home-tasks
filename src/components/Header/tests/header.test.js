import * as React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../Header';

describe('Header component', () => {
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
	beforeEach(() => {
		render(
			<Router>
				<Provider store={mockedStore}>
					<Header />
				</Provider>
			</Router>
		);
	});

	it('Should display user name', () => {
		expect(screen.getByText('Test Name')).toBeInTheDocument();
	});
	it('Should display logo', () => {
		expect(screen.getByAltText('logo')).toBeInTheDocument();
	});
});
