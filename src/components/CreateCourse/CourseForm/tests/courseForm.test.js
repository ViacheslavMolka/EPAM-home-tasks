import * as React from 'react';
import * as reactRedux from 'react-redux';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import CourseForm from '../CourseForm';

describe('CourseForm component', () => {
	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const mockedState = {
		user: {
			isAuth: true,
			name: 'Test Name',
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
		authors: [
			{ name: 'name1', id: 'id1' },
			{ name: 'name2', id: 'id2' },
		],
	};
	const mockedStore = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};

	const renderWithStore = () => {
		localStorage.setItem('token', 'token');
		useSelectorMock.mockReturnValue(mockedState);
		return render(
			<Router>
				<Provider store={mockedStore}>
					<CourseForm />
				</Provider>
			</Router>
		);
	};

	beforeEach(() => {
		useSelectorMock.mockClear();
		renderWithStore();
	});
	afterEach(() => {
		localStorage.clear();
	});

	it('Should show authors list', () => {
		const list = screen.getAllByTestId('authorsList');
		expect(list.length).toBe(2);
	});

	it('Create author click button should call dispatch', () => {
		fireEvent.change(screen.getByPlaceholderText('Enter author name...'), {
			target: { value: 'author name' },
		});
		fireEvent.click(screen.getByText('Create author'));
		expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
	});

	it('Add author button click should add an author to course authors list', () => {
		fireEvent.click(screen.getByTestId('addButton1'));
		const coursesAuthorList = screen.getAllByTestId('coursesAuthorsList');
		expect(coursesAuthorList.length).toBe(1);
	});

	it('Delete author button click should delete an author from the course list', () => {
		fireEvent.click(screen.getByTestId('addButton1'));
		fireEvent.click(screen.getByTestId('deleteButton0'));
		const authorList = screen.queryByTestId('coursesAuthorsList');
		expect(authorList).toBeNull();
	});
});
