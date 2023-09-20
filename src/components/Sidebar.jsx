/* eslint-disable react/prop-types */
import { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import './Sidebar.css';

export default function Sidebar({ filterData, setFilterData }) {
	const [dropdownStates, setDropdownStates] = useState({
		tripType: false,
		destinations: false,
		activity: false,
		tripLevel: false,
	});

	const handleDropdownToggle = (category) => {
		setDropdownStates((prevStates) => ({
			...prevStates,
			[category]: !prevStates[category],
		}));
	};

	const handleCheckboxChange = (item, category) => {
		if (isSelected(item, category)) {
			const updatedFilters = filterData[category].filter(
				(selectedItem) => selectedItem !== item
			);
			setFilterData((prevFilterData) => ({
				...prevFilterData,
				[category]: updatedFilters,
			}));
		} else {
			const updatedFilters = [...filterData[category], item];
			setFilterData((prevFilterData) => ({
				...prevFilterData,
				[category]: updatedFilters,
			}));
		}
	};

	const isSelected = (item, category) => filterData[category].includes(item);

	const Dropdown = ({ label, category, items }) => {
		return (
			<>
				<hr
					style={{
						backgroundColor: '#A27E57',
						height: '1px',
						border: 'none',
					}}
				/>
				<div style={{ margin: '0px 5px 10px 5px' }}>
					<button
						className="dropdown-btn"
						onClick={() => handleDropdownToggle(category)}
					>
						<div style={{ flex: '1', textAlign: 'left', fontWeight: 'bold' }}>
							{label}
						</div>
						{dropdownStates[category] ? <IoIosArrowUp /> : <IoIosArrowDown />}
					</button>
					{dropdownStates[category] && (
						<div className="dropdown-container">
							{items.map((item) => {
								const selected = isSelected(item, category);
								return (
									<label key={item} className="dropdown-item">
										<input
											type="checkbox"
											checked={selected}
											onChange={() =>
												handleCheckboxChange(item, category)
											}
											style={{ marginRight: '10px' }}
										/>
										{item}
									</label>
								);
							})}
						</div>
					)}
				</div>
			</>
		);
	};

	return (
		<div className="sidenav">
			<h2>Filters</h2>
			<Dropdown
				label={'Trip Type'}
				category={'tripType'}
				items={['Small Group Adventure', 'Private Journey', 'Cruise Collection']}
			/>
			<Dropdown
				label={'Destinations'}
				category={'destinations'}
				items={[
					'Africa',
					'Asia',
					'Europe',
					'Latin America',
					'Middle East',
					'North America',
					'Pacific',
					'Polar Regions',
				]}
			/>
			<Dropdown
				label={'Activity'}
				category={'activity'}
				items={[
					'Cultural',
					'Family Trips',
					'Hiking / Trekking',
					'Limited Edition',
					'Rail Journeys',
					'River Cruising',
					'Safaris',
					'Sea Kayaking & Snorkeling',
					'Small Ship Cruising',
					'Walking',
					'Wildlife & Natural History',
				]}
			/>
			<Dropdown
				label={'Trip Level'}
				category={'tripLevel'}
				items={[
					'Easier (Level 1-2)',
					'Moderate (Level 3-4)',
					'Challenging (Level 5-6)',
				]}
			/>
		</div>
	);
}
