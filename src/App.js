import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import ShowTasks from './components/ShowTasks';
import Navbar from './components/Navbar';
import Error from './components/Error';
export const UserContext = createContext();
const App = () => {
	const [ input, setInput ] = useState('');
	const [ tasks, setTasks ] = useState([]);
	const [ option, setOption ] = useState('all');
	const [ filteredTasks, setFilteredTasks ] = useState([]);
	const [ toggle, setToggle ] = useState(false);
	const [ inputError, setInputError ] = useState('');
	const [ showImportant, setShowImportant ] = useState(false);

	//to link 2 selects together ,initialize materialize css elements and declare function to get tasks from sessionStorage
	useEffect(() => {
		const M = window.M;
		var elems = document.querySelectorAll('select');
		M.FormSelect.init(elems);

		//linking the select
		document.getElementById('status1').addEventListener(
			'change',
			function() {
				document.getElementById('status2').selectedIndex = document.getElementById('status1').selectedIndex;
			},
			false
		);
		document.getElementById('status2').addEventListener(
			'change',
			function() {
				document.getElementById('status1').selectedIndex = document.getElementById('status2').selectedIndex;
			},
			false
		);
		var elems1 = document.querySelectorAll('.tooltipped');
		M.Tooltip.init(elems1, { enterDelay: 1000 });
		var elems2 = document.querySelectorAll('.sidenav');
		M.Sidenav.init(elems2);
		getLocalTasks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	//saving task to sessionStorage and filtering tasks on the basis of option(all,completed,not completed) selected and starred
	useEffect(
		() => {
			const saveLocalTasks = () => {
				sessionStorage.setItem('tasks', JSON.stringify(tasks));
			};
			const filterHandler = () => {
				if (option === 'completed' && showImportant === true)
					setFilteredTasks(tasks.filter((item) => item.completed === true && item.starred === true));
				else if (option === 'completed' && showImportant === false)
					setFilteredTasks(tasks.filter((item) => item.completed === true));
				else if (option === 'not_completed' && showImportant === true)
					setFilteredTasks(tasks.filter((item) => item.completed === false && item.starred === true));
				else if (option === 'not_completed' && showImportant === false)
					setFilteredTasks(tasks.filter((item) => item.completed === false));
				else if (option === 'all' && showImportant === true)
					setFilteredTasks(tasks.filter((item) => item.starred === true));
				else setFilteredTasks(tasks);
			};
			filterHandler();
			saveLocalTasks();
		},
		[ tasks, option, showImportant ]
	);
	//retrieve data from session storage
	const getLocalTasks = () => {
		if (sessionStorage.getItem('tasks') === null) {
			sessionStorage.setItem('tasks', JSON.stringify([]));
		} else {
			let todoTask = JSON.parse(sessionStorage.getItem('tasks', JSON.stringify(tasks)));
			setTasks(todoTask);
		}
	};

	return (
		<div className="App ">
			<UserContext.Provider
				value={{
					input,
					setInput,
					tasks,
					setTasks,
					filteredTasks,
					setOption,
					toggle,
					setToggle,
					inputError,
					setInputError,
					showImportant,
					setShowImportant
				}}
			>
				<Navbar />
				<AddTask />
				{filteredTasks.length === 0 || tasks.length === 0 ? <Error /> : <ShowTasks />}
			</UserContext.Provider>
		</div>
	);
};

export default App;
