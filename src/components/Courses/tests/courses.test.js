import * as React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import Courses from '../Courses';

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
beforeEach(() => {
	useSelectorMock.mockClear();
});
afterEach(() => {
	localStorage.clear();
});

const renderWithStore = (mocked) => {
	return render(
		<Router>
			<Provider store={mocked}>
				<Courses />
			</Provider>
		</Router>
	);
};

const mockedState = {
	user: {
		role: 'admin',
	},
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

test('COurses component with empty store should display empty container', async () => {
	localStorage.setItem('token', 'token');
	const mockedEmptyState = {
		user: {},
		courses: [],
		authors: [],
	};
	const mockedStore = {
		getState: () => mockedEmptyState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	useSelectorMock.mockReturnValue(mockedEmptyState);

	renderWithStore(mockedStore);

	const courseCards = screen.queryByTestId('courseCard');
	expect(courseCards).toBeNull();
});

test('Courses component should display amount of CourseCard equal length of courses array', async () => {
	localStorage.setItem('token', 'token');

	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	useSelectorMock.mockReturnValue(mockedState);

	renderWithStore(mockedStore);

	const courseCards = screen.getAllByTestId('courseCard');
	expect(courseCards.length).toBe(mockedState.courses.length);
});

// test('Should display CourseForm after click', async () => {
// 	localStorage.setItem('token', 'token');

// 	const mockedStore = {
// 		getState: () => mockedState,
// 		subscribe: jest.fn(),
// 		dispatch: jest.fn(),
// 	};
// 	useSelectorMock.mockReturnValue(mockedState);

// 	renderWithStore(mockedStore);

// 	fireEvent.click(screen.getByText('Add new course'));
// 	expect(await screen.findByTestId('courseForm')).toBeInTheDocument();
// });
