export function getDate() {
	let date = new Date();
	return date.toJSON().slice(0, 10).split('-').reverse().join('/');
}

export function getTimeFromMins(mins) {
	let hours = Math.trunc(mins / 60);
	let minutes = mins % 60;
	return hours + ':' + minutes;
}
