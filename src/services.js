export const coursesAppService = {
	getCoursesData: async () => {
		const res = await fetch('http://localhost:3000/courses/all');
		const data = await res.json();
		return data;
	},
	getAuthorsData: async () => {
		const res = await fetch('http://localhost:3000/authors/all');
		const data = await res.json();
		return data;
	},
	getCurrentUser: async (token) => {
		const res = await fetch('http://localhost:3000/users/me', {
			method: 'GET',
			headers: {
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	},
	deleteCourse: async (id, token) => {
		const res = await fetch(`http://localhost:3000/courses/${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	},
	updateCourse: async (id, token, values) => {
		const res = await fetch(`http://localhost:3000/courses/${id}`, {
			method: 'PUT',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: values.title,
				description: values.description,
				duration: +values.duration,
				authors: [...values.authors],
			}),
		});
		const data = await res.json();
		return data;
	},
	addCourse: async (token, values) => {
		const res = await fetch('http://localhost:3000/courses/add', {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title: values.title,
				description: values.description,
				duration: +values.duration,
				authors: values.authors,
			}),
		});
		const data = await res.json();
		return data;
	},
	addAuthors: async (token, values) => {
		const res = await fetch('http://localhost:3000/authors/add', {
			method: 'POST',
			headers: {
				Authorization: token,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: values.name,
			}),
		});
		const data = await res.json();
		return data;
	},
	logout: async (token) => {
		const res = await fetch('http://localhost:3000/logout', {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		const data = await res.json();
		return data;
	},
};
