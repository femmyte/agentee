export function getTimeFromISODate(isoDateString) {
	// Parse the ISO date string into a Date object
	const date = new Date(isoDateString);

	// Get the hours, minutes, and seconds
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	// Format the time as HH:MM:SS
	const formattedTime = `${String(hours).padStart(2, '0')}:${String(
		minutes
	).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

	return formattedTime;
}
