import React, { useContext } from 'react';
import { UserContext } from '../App';

const Navbar = () => {
	const { setOption } = useContext(UserContext);

	//sets the option value selected to option state
	const handleSelection = (e) => {
		setOption(e.target.value);
	};
	return (
		<div>
			<nav>
				<div className="nav-wrapper ">
					<ul className="left ">
						<li className="brand-logo " style={{ marginLeft: '5px' }}>
							To-do List
						</li>
					</ul>
					<ul className="right ">
						<li style={{ marginRight: '5px' }}>
							<div className="card red lighten-3" style={{ paddingLeft: '5px' }}>
								<select onChange={handleSelection}>
									<option value="all">All</option>
									<option value="completed">Completed</option>
									<option value="not_completed">Not Completed</option>
								</select>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
