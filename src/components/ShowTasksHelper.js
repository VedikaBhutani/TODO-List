import React from 'react';

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
	//toggle the starred property
	const handleStarred = () => {
		setTasks(
			tasks.map((item) => {
				if (item.id === task.id) {
					return {
						...item,
						starred: !item.starred
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
	const handleEdited = () => {
		const M = window.M;
		var elems = document.querySelectorAll('.btn-small.tooltipped');
		var i;
		//disable tooltip with moving away the cursor
		for (i = 0; i < elems.length; ++i) {
			var instance = M.Tooltip.getInstance(elems[i]);
			instance.destroy();
		}

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
		<div className="container">
			<div className="row">
				<div className="col l2 m2 s2 " style={{ paddingTop: '15px' }}>
					<a
						href="/#"
						className="btn-floating  tooltipped"
						data-tooltip="Mark as important"
						onClick={handleStarred}
					>
						<i className="material-icons">{task.starred ? 'star' : 'star_outline'}</i>
					</a>
				</div>
				<div
					className="card col l10 m10 s10  brown darken-3"
					style={{ paddingTop: '10px', paddingBottom: '10px' }}
				>
					<span className="col l2 m2 s3">
						<a href="/#" className="btn-small tooltipped" data-tooltip="Edit task" onClick={handleEdited}>
							<i className="material-icons">mode_edit</i>
						</a>
					</span>
					<span className="col l6 m6 s3 label-task ">
						<h6 className={`teal-text ${task.completed ? ' completed' : ' white-text'} `}>{task.text}</h6>
					</span>
					<span className="col l2 m2 s3">
						<a href="/#" className="btn tooltipped" onClick={handleCompleted} data-tooltip="Check task">
							<i className="material-icons">check</i>
						</a>
					</span>
					<span className="col l2 m2 s3">
						<a className="btn tooltipped modal-trigger" href="#modal1" data-tooltip="Delete task">
							<i className="material-icons">delete</i>
						</a>

						<div id="modal1" className="modal">
							<div className="modal-content">
								<h6>Are you sure you want to delete the task?</h6>
							</div>
							<div className="modal-footer">
								<a href="/#" onClick={handleDeleted} className="modal-close  btn">
									Yes
								</a>
								<a href="#!" className="modal-close btn" style={{ marginLeft: '10px' }}>
									Cancel
								</a>
							</div>
						</div>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ShowTasksHelper;
