import './Navbar.css';
export default function NavBar() {
	return (
		<div className="navbar">
			<div className="navbar-left">
				<img src="wt-logo.webp" height="30rem" />
			</div>

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
					<li>Insporation</li>
					<li>About WT</li>
				</ul>
			</div>
			<div className="navbar-right">
				<div className="asdf">
					<img src="search.png" className="search" />
					<button className="button">FIND A TRIP</button>
				</div>
			</div>
		</div>
	);
}
