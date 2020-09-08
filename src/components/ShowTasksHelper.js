import React from 'react';
import '../App.css';

const ShowTasksHelper = ({ task, setTasks, tasks, setInput }) => {
	//changes completed property of tasks state on click of check button
	const handleCompleted = () => {
		setTasks(
			tasks.map((item) => {
				if (item.id === task.id) {
					return {
						...item,
						completed: !item.completed
					};
				}
				return item;
			})
		);
	};
	//deletes the task from tasks state on click of delete
	const handleDeleted = () => {
		setTasks(tasks.filter((el) => el.id !== task.id));
	};
	//set the edited property to true of the task currently being edited and turn others to false
	const handleEdit = () => {
		setTasks(
			tasks.map((item) => {
				if (item.id === task.id) {
					return {
						...item,
						edited: true
					};
				} else if (item.id !== task.id && item.edited === true) {
					return {
						...item,
						edited: false
					};
				} else return item;
			})
		);
		setInput(task.text);
	};

	return (
		<div className="container ">
			<div className="row ">
				<div className="col l1">
					<button className="btn" onClick={handleEdit}>
						<i className="material-icons">mode_edit</i>
					</button>
				</div>
				<div className="col l4">
					<li className={`collection-item ${task.completed ? 'completed' : ''} `}>{task.text}</li>
				</div>
				<div className="col l1">
					<button className="btn" onClick={handleCompleted}>
						<i className="material-icons">check</i>
					</button>
				</div>
				<div className="col l1">
					<button className="btn" onClick={handleDeleted}>
						<i className="material-icons">delete</i>
					</button>
				</div>
			</div>
		</div>
	);
};

export default ShowTasksHelper;
