'use client';

import React, { useEffect, useState } from 'react';
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	Spinner,
	Card,
	CardBody,
} from '@nextui-org/react';

/**
 * @param {Object} props
 * @param {Array} [props.columns] - Array of column headers, e.g., [{ key: 'name', label: 'Name' }]
 * @param {Array} [props.rows] - Array of row objects, e.g., [{ name: 'John', email: 'a@b.com' }]
 * @param {string} [props.dataUrl] - Optional URL to fetch data from
 */
export default function ReUsableTable({
	columns = [],
	rows = [],
	dataUrl = null,
}) {
	const [data, setData] = useState(rows);
	const [loading, setLoading] = useState(!!dataUrl);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(dataUrl);
				const result = await res.json();
				setData(result);
			} catch (err) {
				console.error('Error fetching data:', err);
				setData([]);
			} finally {
				setLoading(false);
			}
		};

		if (dataUrl) fetchData();
	}, [dataUrl]);

	if (loading) {
		return (
			<div className='flex justify-center items-center h-40'>
				<Spinner color='primary' />
			</div>
		);
	}

	if (!data || data.length === 0) {
		return (
			<Card className='w-full max-w-3xl mx-auto mt-8'>
				<CardBody>
					<p className='text-center text-gray-500'>
						No data available.
					</p>
				</CardBody>
			</Card>
		);
	}

	return (
		<div className='overflow-x-auto w-full max-w-5xl mx-auto mt-8'>
			<Table aria-label='Dynamic table'>
				<TableHeader>
					{columns.map((col) => (
						<TableColumn key={col.key}>{col.label}</TableColumn>
					))}
				</TableHeader>
				<TableBody>
					{data.map((row, idx) => (
						<TableRow key={idx}>
							{columns.map((col) => (
								<TableCell key={col.key}>
									{row[col.key]}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
