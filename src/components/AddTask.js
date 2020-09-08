import React, { useContext } from 'react';
import { UserContext } from '../App';

const AddTask = () => {
	const { input, setInput, tasks, setTasks, setOption } = useContext(UserContext);
	//takes task entered and sets it to the input state
	const handleInput = (e) => {
		setInput(e.target.value);
	};
	//adds text,completed and id properties to tasks state on click of add button
	const handleAdd = (e) => {
		var flag = false;
		e.preventDefault();
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
	};
	//sets the option value selected to option state
	const handleSelection = (e) => {
		setOption(e.target.value);
	};

	return (
		<div className="container">
			<form className="col s12 m12 l12">
				<div className="row">
					<div className="input-field  col s4 m4 l4">
						<input id="input" type="text" className="input" value={input} onChange={handleInput} />
						<label className="active" htmlFor="input">
							Enter task
						</label>
					</div>
					<div className="col s1 m1 l1" style={{ paddingTop: '25px' }}>
						<button className="btn" onClick={handleAdd}>
							<i className="material-icons">add</i>
						</button>
					</div>
					<div className="col l2 s2 m2" />
					<div className="col l4 s4 m4" style={{ paddingTop: '20px' }}>
						<select className="browser-default" onChange={handleSelection}>
							<option value="all">All</option>
							<option value="completed">Completed</option>
							<option value="not_completed">Not Completed</option>
						</select>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AddTask;
