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
};
