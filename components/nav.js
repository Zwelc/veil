import Link from 'next/link'

export default function Navbar() {
	return (
	<nav className="navbar navbar-expand-lg navbar-lg bg-dark text-white">
		<div className="container-fluid">
			<Link href="/" >
			<a className="navbar-brand">Reactive Stats</a>
			</Link>

			<div className="navbar-nav">
			<Link activeClassName="active" href="/">
				<a className="nav-link">Home</a>
			</Link>
			<Link activeClassName="active" href="/heroes">
				<a className="nav-link">Heroes</a>
			</Link>
			<Link activeClassName="active" href="/players">
				<a className="nav-link">Players</a>
			</Link>
			<Link activeClassName="active" href="/about">
				<a className="nav-link">About</a>
			</Link>
			</div>
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link active" href="/">
						<a>Home</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/players">
						<a className="nav-link" aria-current="page">Players</a>
						</Link>
					</li>
					<li className="nav-item">
						<Link href="/heroes">
						<a className="nav-link">Heroes</a>
						</Link>
					</li>
				</ul>
		<form className="d-flex">
			<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
  		<button className="btn btn-outline-primary" type="submit">Search</button>
		</form>
		</div>
	</nav>
	)
}