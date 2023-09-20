import { useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/Sidebar';
import NavBar from './components/Navbar';

import './App.css';

export default function App() {
	const [filterData, setFilterData] = useState({
		tripType: [],
		destinations: [],
		activity: [],
		tripLevel: [],
	});

	return (
		<>
			<div className="container">
				<NavBar />
				<div className="filters-and-map">
					<Sidebar filterData={filterData} setFilterData={setFilterData} />
					<Map filterData={filterData} />
				</div>
			</div>
		</>
	);
}
