import { Select, SelectItem } from '@nextui-org/react';
import { animals } from '@/components/data';

export default function SelectInput() {
	const variants = ['flat', 'bordered', 'underlined', 'faded'];

	return (
		// <div className='w-full'>
		<Select variant={''} label='Select an animal' className='w-[10rem]'>
			{animals.map((animal) => (
				<SelectItem key={animal.key}>{animal.label}</SelectItem>
			))}
		</Select>
		// </div>
	);
}
