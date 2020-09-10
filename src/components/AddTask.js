import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import '../App.css';

const AddTask = () => {
	const { input, setInput, tasks, setTasks, toggle, setToggle, inputError, setInputError } = useContext(UserContext);
	//to avoid overlapping label when editing text
	useEffect(
		() => {
			const M = window.M;
			M.updateTextFields();
		},
		[ input ]
	);

	//takes task entered and sets it to the input state
	const handleInput = (e) => {
		setInput(e.target.value);
		setToggle(false);
		setInputError('');
	};
	//adds text,completed and id properties to tasks state on click of add button
	const handleAdd = (e) => {
		e.preventDefault();

		if (input === '') {
			setToggle(true);
			setInputError('Enter the task');
		} else {
			var flag = false;
			//adding text after editing
			if (tasks.length > 0) {
				setTasks(
					tasks.map((item) => {
						if (item.edited === true) {
							flag = true;
							return {
								...item,
								text: input,
								edited: false
							};
						}
						return item;
					})
				);
			}

			//adding text for the first time
			if (flag === false)
				setTasks([ ...tasks, { text: input, completed: false, edited: false, id: Math.random() * 1000 } ]);

			flag = false;
			setInput('');
		}
	};

	return (
		<div className="container">
			<form className="col s12 m12 l12" onSubmit={handleAdd}>
				<div className="row">
					<div className="input-field col s4 m4 l4">
						<input
							id="input"
							type="text"
							className={`input ${toggle ? 'error' : ''}`}
							value={input}
							onChange={handleInput}
						/>
						<label className="active" htmlFor="input">
							Enter task
						</label>
						<span className="helper-text" style={{ color: 'red' }}>
							{inputError}
						</span>
					</div>
					<div className="col s1 m1 l1" style={{ paddingTop: '25px' }}>
						<button className="btn">
							<i className="material-icons">add</i>
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddTask;
