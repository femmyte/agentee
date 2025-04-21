'use client';
import React, { useEffect } from 'react';
import {
	Listbox,
	ListboxItem,
	Chip,
	ScrollShadow,
	Avatar,
} from '@nextui-org/react';
import { ListboxWrapper } from './ListboxWrapper';

export default function UserList({ users, handleSetuser }) {
	const [values, setValues] = React.useState(new Set(['']));

	const arrayValues = Array.from(values);

	useEffect(() => {
		handleSetuser(arrayValues);
	}, [arrayValues, handleSetuser]);

	const topContent = React.useMemo(() => {
		if (!arrayValues.length) {
			return null;
		}

		return (
			<ScrollShadow
				hideScrollBar
				className='w-full flex py-0.5 px-2 gap-1'
				orientation='horizontal'
			>
				{arrayValues.map((value) => (
					<Chip key={value}>
						{
							users?.find((user) => `${user?.id}` === `${value}`)
								?.name
						}
					</Chip>
				))}
			</ScrollShadow>
		);
	}, [arrayValues.length]);

	return (
		<ListboxWrapper>
			<Listbox
				topContent={topContent}
				classNames={{
					base: 'max-w-sm ',
					list: 'max-h-[300px] overflow-scroll',
				}}
				defaultSelectedKeys={['']}
				items={users}
				label='Assigned to'
				selectionMode='single'
				onSelectionChange={setValues}
				variant='flat'
				disallowEmptySelection={false}
				hideEmptyContent={true}
			>
				{(item) => (
					<ListboxItem
						key={item.id}
						textValue={item.name}
						className='w-full'
					>
						<div className='flex gap-2 items-center w-full'>
							<Avatar
								alt={item.name}
								className='flex-shrink-0'
								size='sm'
								src={item.avatar}
							/>
							<div className='flex flex-col'>
								<span className='text-small'>{item.name}</span>
								<span className='text-tiny text-default-400'>
									{item.email}
								</span>
								<span className='text-tiny text-default-400'>
									{item.team}
								</span>
							</div>
						</div>
					</ListboxItem>
				)}
			</Listbox>
		</ListboxWrapper>
	);
}
