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

	const [selectedCountryCode, setSelectedCountryCode] = useState('');
	const [selectedStateCode, setSelectedStateCode] = useState('');

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

	useEffect(() => {
		// Optional: update selectedCountryCode if form value is restored (e.g., edit form)
		if (control?._formValues?.country) {
			const matched = countries.find(
				(c) => c.name === control._formValues.country
			);
			if (matched) setSelectedCountryCode(matched.isoCode);
		}
	}, [control, countries]);
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
								const selectedName = Array.from(keys)[0];
								field.onChange(selectedName); // ✅ store country name
								const matched = countries.find(
									(c) => c.name === selectedName
								);
								if (matched) {
									setSelectedCountry(matched.isoCode); // for loading states
									setSelectedCountryCode(matched.isoCode); // optional use
								}
							}}
						>
							{countries.map((c) => (
								<SelectItem key={c.name} value={c.name}>
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
						<Select
							label='Select Country'
							className='w-full'
							isSearchable
							selectedKeys={field.value ? [field.value] : []}
							onSelectionChange={(keys) => {
								const selectedCode = Array.from(keys)[0];
								field.onChange(selectedCode); // store isoCode
								setSelectedCountry(selectedCode); // load states
							}}
							onInputChange={(value) => {
								setInputValue(value);
								const matched = countries.find(
									(c) =>
										c.name
											.toLowerCase()
											.includes(value.toLowerCase()) ||
										c.isoCode
											.toLowerCase()
											.includes(value.toLowerCase())
								);
								if (matched) {
									setSelectedCountry(matched.isoCode);
								}
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
			/> */}

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
							selectedKeys={
								selectedStateCode ? [selectedStateCode] : []
							}
							onSelectionChange={(keys) => {
								const code = Array.from(keys)[0];
								const state = states.find(
									(s) => s.isoCode === code
								);
								const name = state?.name || '';

								field.onChange(name);
								setSelectedStateCode(code);
								setSelectedState(code);
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
		</div>
	);
};

export default CountryStateCitySelect;
