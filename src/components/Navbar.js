import React, { useContext } from 'react';
import { UserContext } from '../App';

const Navbar = () => {
	const { setOption, showImportant, setShowImportant } = useContext(UserContext);

	{
		/*sets the option value selected to option state and initialize select
	 to make both the select(navbar and mobile collapse) to show same selection*/
	}
	const handleSelection = (e) => {
		const M = window.M;
		var elems = document.querySelectorAll('select');
		M.FormSelect.init(elems);
		setOption(e.target.value);
	};
	const handleStarred = () => {
		setShowImportant(!showImportant);
	};
	return (
		<div>
			<nav>
				<div className="nav-wrapper ">
					<div className="brand-logo center">To-do List</div>
					<a href="/#" data-target="mobile-demo" className="sidenav-trigger">
						<i className="material-icons">menu</i>
					</a>
					<ul className="hide-on-med-and-down">
						<li>
							<a href="/#" className={`${showImportant ? 'btn-small' : ''}`} onClick={handleStarred}>
								Important Tasks
								<i className={`${showImportant ? 'material-icons left' : ''}`}>{`${showImportant
									? 'close'
									: ''}`}</i>
							</a>
						</li>

						{/* <li className="left" style={{ marginLeft: '10px' }}>
							<a data-target="dropdown1" href="" className="dropdown-trigger">
								<i className="material-icons">more_horiz</i>
							</a>
						</li>
						<ul id="dropdown1" className="dropdown-content">
							<li>
								<div className="valign-center">
									<i className="material-icons icon-teal">add_alert</i>
									<span className="teal-text">My Tasks</span>
								</div>
							</li>
							<li>
								<div className="valign-center">
									<i className="material-icons icon-teal">star</i>
									<span className="teal-text">Important</span>
								</div>
							</li>
						</ul> */}
						<li className="right" style={{ marginRight: '10px' }}>
							<div className="card teal lighten-1" style={{ paddingLeft: '5px' }}>
								<select id="status1" onChange={handleSelection}>
									<option value="all">All</option>
									<option value="completed">Completed</option>
									<option value="not_completed">Not Completed</option>
								</select>
							</div>
						</li>
					</ul>
				</div>
			</nav>
			<ul className="sidenav" id="mobile-demo">
				<li>
					<a href="/#" onClick={handleStarred} className={`${showImportant ? 'teal' : ''}`}>
						Important Tasks
					</a>
				</li>
				<li>
					<div className="card teal lighten-1">
						<select id="status2" onChange={handleSelection}>
							<option value="all">All</option>
							<option value="completed">Completed</option>
							<option value="not_completed">Not Completed</option>
						</select>
					</div>
				</li>
			</ul>
		</div>
	);
};

export default Navbar;
