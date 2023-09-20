/* eslint-disable react/prop-types */
import 'leaflet/dist/leaflet.css';
import './Map.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

import { Icon, divIcon, point } from 'leaflet';

export default function Map({ filterData }) {
	const [trips, setTrips] = useState([]);

	useEffect(() => {
		const getTrips = async () => {
			// Create a Supabase query object
			let query = supabase.from('trips').select('*');
			// Add filter conditions based on filterData
			if (filterData.tripType.length > 0) {
				query = query.in('Trip Type', filterData.tripType);
			}
			if (filterData.destinations.length > 0) {
				query = query.in('Destination', filterData.destinations);
			}
			if (filterData.activity.length > 0) {
				query = query.in('Activity', filterData.activity);
			}
			if (filterData.tripLevel.length > 0) {
				query = query.in('Trip Level', filterData.tripLevel);
			}

			const { data, error } = await query;

			if (error) {
				console.error('Error fetching trips:', error);
			} else {
				setTrips(data);
			}
		};

		getTrips();
	}, [filterData]);

	const bounds = [
		[-90, -Infinity], // Bottom bound (South Pole)
		[90, Infinity], // Top bound (North Pole)
	];

	// create custom icon
	const customIcon = new Icon({
		// iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
		iconUrl: 'pin.png',
		iconSize: [38, 38], // size of the icon
	});

	// custom cluster icon
	const createClusterCustomIcon = function (cluster) {
		return new divIcon({
			html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
			className: 'custom-marker-cluster',
			iconSize: point(33, 33, true),
		});
	};

	return (
		<MapContainer
			center={[0, 0]}
			zoom={3}
			attributionControl={false}
			zoomControl={false}
			maxBounds={bounds}
			maxBoundsViscosity={1.0}
			minZoom={2}
			maxZoom={7}
		>
			{/* OPEN STREEN MAPS TILES */}
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			<MarkerClusterGroup
				chunkedLoading
				iconCreateFunction={createClusterCustomIcon}
			>
				{/* Mapping through the markers */}
				{trips.map((trip, index) => (
					<Marker position={trip.Coordinates} icon={customIcon} key={index}>
						<CustomPopup
							tripName={trip.Name}
							photoURL={trip.PhotoURL}
							description={trip.Description}
							moreInfoLink={trip.DetailsURL}
						/>
					</Marker>
				))}
			</MarkerClusterGroup>
		</MapContainer>
	);
}

// eslint-disable-next-line react/prop-types
function CustomPopup({ tripName, photoURL, description, moreInfoLink }) {
	const description_short =
		// eslint-disable-next-line react/prop-types
		description.length > 200 ? description.slice(0, 200) : description;
	return (
		<Popup>
			<h2>{tripName}</h2>
			<div className="popup">
				<div className="popup-left">
					<a href={moreInfoLink}>
						<img height="200" src={photoURL} />
					</a>
				</div>
				<div className="popup-right">
					<p>
						{description_short}
						<a href={moreInfoLink}>... More Info</a>
					</p>
				</div>
			</div>
		</Popup>
	);
}
