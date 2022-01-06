import * as React from 'react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import CourseCard from '../CourseCard';

describe('CourseCard component', () => {
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
			role: 'admin',
		},
		courses: [],
		authors: [],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	const mockedProps = {
		title: 'title',
		description: 'description',
		duration: 50,
		creationDate: '13/02/2020',
		authors: ['Author name'],
	};
	beforeEach(() => {
		render(
			<Router>
				<Provider store={mockedStore}>
					<CourseCard {...mockedProps} />
				</Provider>
			</Router>
		);
	});

	it('should display title', () => {
		expect(screen.getByText('Title: title')).toBeInTheDocument();
	});

	it('should display description', () => {
		expect(screen.getByText('description')).toBeInTheDocument();
	});

	it('should display created date', () => {
		expect(screen.getByText('13/02/2020')).toBeInTheDocument();
	});

	it('should display duration in the correct format', () => {
		expect(screen.getByText('0:50')).toBeInTheDocument();
	});

	it('should display author list', () => {
		expect(screen.getByText('Author name')).toBeInTheDocument();
	});
});
