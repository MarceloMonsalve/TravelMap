import './Navbar.css';
import { useState, useEffect } from 'react';

export default function NavBar() {
	const [fullNav, setFullNav] = useState(true);

	const updateNavMiddleVisibility = () => {
		if (window.innerWidth > 1100) {
			setFullNav(true);
		} else {
			setFullNav(false);
		}
	};

	useEffect(() => {
		updateNavMiddleVisibility();
		window.addEventListener('resize', updateNavMiddleVisibility);

		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener('resize', updateNavMiddleVisibility);
		};
	}, []);

	return (
		<div className="navbar">
			{fullNav ? (
				<div style={{ padding: '10px', flex: '1' }}>
					<img src="wt-logo.webp" height="30rem" />
				</div>
			) : (
				<div style={{ padding: '10px' }}>
					<img src="wt-logo.webp" height="30rem" />
				</div>
			)}

			{fullNav && (
				<>
					<div className="navbar-middle">
						<ul>
							<li>1-800-368-2794</li>
							<li>Catalog</li>
							<li>Newsletter</li>
							<li>Contact Us</li>
						</ul>
						<hr />
						<ul>
							<li>Destinations</li>
							<li>Browse Trips</li>
							<li>Inspiration</li>
							<li>About WT</li>
						</ul>
					</div>
					<div className="navbar-right">
						<div className="asdf">
							<img src="search.png" className="search" />
							<button className="button">FIND A TRIP</button>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
