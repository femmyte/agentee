import { Controller } from 'react-hook-form';
import {
	Select,
	SelectItem,
	Autocomplete,
	AutocompleteItem,
} from '@nextui-org/react';
import { Country, State, City } from 'country-state-city';
import { useEffect, useState } from 'react';

const CountryStateCitySelect = ({ control, errors }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const [inputValue, setInputValue] = useState('');

	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedState, setSelectedState] = useState('');

	useEffect(() => {
		setCountries(Country.getAllCountries());
	}, []);

	useEffect(() => {
		if (selectedCountry) {
			setStates(State.getStatesOfCountry(selectedCountry));
			setCities([]);
			setSelectedState('');
		}
	}, [selectedCountry]);

	useEffect(() => {
		if (selectedState && selectedCountry) {
			setCities(City.getCitiesOfState(selectedCountry, selectedState));
		}
	}, [selectedState, selectedCountry]);

	// Filter countries based on user input
	const filteredCountries = countries.filter((country) =>
		country.name.toLowerCase().includes(inputValue.toLowerCase())
	);

	return (
		<div className='space-y-6 mt-6'>
			{/* Country */}
			<Controller
				name='country'
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<>
						<Select
							label='Select Country'
							className='w-full'
							isSearchable
							selectedKeys={field.value ? [field.value] : []}
							onSelectionChange={(keys) => {
								const selected = Array.from(keys)[0];
								field.onChange(selected);
								setSelectedCountry(selected);
							}}
						>
							{countries.map((c) => (
								<SelectItem key={c.isoCode} value={c.isoCode}>
									<div className='flex items-center gap-2'>
										<img
											src={`https://flagsapi.com/${c.isoCode}/flat/32.png`}
											alt={c.name}
											className='w-5 h-5 rounded-sm'
										/>
										{c.name}
									</div>
								</SelectItem>
							))}
						</Select>
						{errors.country && (
							<p className='text-red-500 text-sm mt-1'>
								Country is required
							</p>
						)}
					</>
				)}
			/>
			{/* <Controller
				name='country'
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<>
						<Autocomplete
							label='Select Country'
							className='w-full'
							selectedKey={field.value}
							inputValue={inputValue}
							onInputChange={setInputValue}
							onSelectionChange={(key) => {
								field.onChange(key);
								setSelectedCountry(key);
								setInputValue(''); // optional: reset search text
							}}
							placeholder='Search country...'
						>
							{filteredCountries.map((country) => (
								<AutocompleteItem
									key={country.isoCode}
									value={country.isoCode}
								>
									<div className='flex items-center gap-2'>
										<img
											src={`https://flagsapi.com/${country.isoCode}/flat/32.png`}
											alt={country.name}
											className='w-5 h-5 rounded-sm'
										/>
										{country.name}
									</div>
								</AutocompleteItem>
							))}
						</Autocomplete>

						{errors.country && (
							<p className='text-red-500 text-sm mt-1'>
								Country is required
							</p>
						)}
					</>
				)}
			/> */}

			{/* State */}
			<Controller
				name='state'
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<>
						<Select
							label='Select State'
							className='w-full'
							isSearchable
							isDisabled={!selectedCountry}
							selectedKeys={field.value ? [field.value] : []}
							onSelectionChange={(keys) => {
								const selected = Array.from(keys)[0];
								field.onChange(selected);
								setSelectedState(selected);
							}}
						>
							{states.map((s) => (
								<SelectItem key={s.isoCode} value={s.isoCode}>
									{s.name}
								</SelectItem>
							))}
						</Select>
						{errors.state && (
							<p className='text-red-500 text-sm mt-1'>
								State is required
							</p>
						)}
					</>
				)}
			/>

			{/* City */}
			{/* <Controller
				name='city'
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<>
						<Select
							label='Select City'
							className='w-full'
							isSearchable
							isDisabled={!selectedState}
							selectedKeys={field.value ? [field.value] : []}
							onSelectionChange={(keys) =>
								field.onChange(Array.from(keys)[0])
							}
						>
							{cities.map((city, idx) => (
								<SelectItem key={idx} value={city.name}>
									{city.name}
								</SelectItem>
							))}
						</Select>
						{errors.city && (
							<p className='text-red-500 text-sm mt-1'>
								City is required
							</p>
						)}
					</>
				)}
			/> */}
		</div>
	);
};

export default CountryStateCitySelect;
