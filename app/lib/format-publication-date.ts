export function formatPublicationDate(webPublicationDate: string) {

	const date = new Date(webPublicationDate);

	const day = date.getDate();

	const months = [
		'January', 'February', 'March', 'April',
		'May', 'June', 'July', 'August',
		'September', 'October', 'November', 'December',
	];
	const monthName = months[date.getMonth()];
	const year = date.getFullYear();
	let hours = date.getHours();
	const minute = date.getMinutes();
	const seconds = date.getSeconds();
	const period = hours >= 12 ? 'PM' : 'AM';

	if (hours > 12) {
		hours -= 12;
	}

	const formattedTime = `${hours.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	return `${ day } ${ monthName } ${ year } ${ formattedTime } ${ period }`;
}
