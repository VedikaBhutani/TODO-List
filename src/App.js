import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import AddTask from './components/AddTask';
import ShowTasks from './components/ShowTasks';

export const UserContext = createContext();
const App = () => {
	const [ input, setInput ] = useState('');
	const [ tasks, setTasks ] = useState([]);
	const [ option, setOption ] = useState('all');
	const [ filteredTasks, setFilteredTasks ] = useState([]);
	const [ toggle, setToggle ] = useState(false);
	const [ inputError, setInputError ] = useState('');

	//filtering tasks on the basis of option(all,completed,not completed) selected
	const filterHandler = () => {
		switch (option) {
			case 'completed':
				setFilteredTasks(tasks.filter((item) => item.completed === true));
				break;
			case 'not_completed':
				setFilteredTasks(tasks.filter((item) => item.completed === false));
				break;
			default:
				setFilteredTasks(tasks);
		}
	};
	useEffect(
		() => {
			filterHandler();
		},
		[ tasks, option ]
	);
	return (
		<div className="App">
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
					setInputError
				}}
			>
				<AddTask />
				<ShowTasks />
			</UserContext.Provider>
		</div>
	);
};

export default App;
