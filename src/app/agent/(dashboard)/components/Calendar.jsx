'use client';
import React from 'react';
import { Calendar } from '@nextui-org/react';
import { parseDate } from '@internationalized/date';

export default function DashboardCalendar() {
	let [value, setValue] = React.useState(parseDate('2024-03-07'));

	return (
		<Calendar
			// aria-label='Date (Controlled)'
			calendarWidth={800}
			showMonthAndYearPickers={true}
			value={value}
			onChange={setValue}
			className='w-full justify-between items-center'
			// weekdayStyle='long'
		/>
	);
}
