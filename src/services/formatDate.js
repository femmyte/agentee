export function formatDate(isoDate) {
	const dateObject = new Date(isoDate);

	const year = dateObject.getFullYear();
	const month = String(dateObject.getMonth() + 1).padStart(2, '0');
	const day = String(dateObject.getDate()).padStart(2, '0');

	return `${month}/${day}/${year}`;
}

export function toDate_DDMMYYYY(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000); // Convert to milliseconds
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
	const year = date.getFullYear();
	return `${day}-${month}-${year}`;
}

export function toDate_MMM_D_YYYY_hhmmss(unixTimestamp) {
	const date = new Date(unixTimestamp * 1000);

	const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
	};

	const formatted = date.toLocaleString('en-US', options);
	return formatted.replace(',', '').replace(' at', '.') + '';
}
