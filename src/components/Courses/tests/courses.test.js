import * as React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Courses from '../Courses';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
beforeEach(() => {
	useSelectorMock.mockClear();
});
afterEach(() => {
	localStorage.clear();
});

test('CourseCard component with empty store', async () => {
	localStorage.setItem('token', 'token');
	const mockedState = {
		user: {},
		courses: [],
		authors: [],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	useSelectorMock.mockReturnValue(mockedState);

	render(
		<Router>
			<Provider store={mockedStore}>
				<Courses />
			</Provider>
		</Router>
	);

	const courseCards = screen.queryByTestId('courseCard');
	expect(courseCards).toBeNull();
});

test('CourseCard component', async () => {
	localStorage.setItem('token', 'token');
	const mockedState = {
		user: {},
		courses: [
			{
				title: 'Title',
				description: 'React desc',
				duration: 100,
				authors: ['id1'],
				creationDate: '14/12/2021',
				id: 'id',
			},
		],
		authors: [{ name: 'name1', id: 'id1' }],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	useSelectorMock.mockReturnValue(mockedState);

	render(
		<Router>
			<Provider store={mockedStore}>
				<Courses />
			</Provider>
		</Router>
	);
	const courseCards = screen.getAllByTestId('courseCard');
	expect(courseCards.length).toBe(mockedState.courses.length);
});
