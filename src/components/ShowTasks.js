import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import ShowTasksHelper from './ShowTasksHelper';

const ShowTasks = () => {
	const { tasks, setTasks, filteredTasks, setInput } = useContext(UserContext);
	////for initializing materialize css select and tooltip
	useEffect(
		() => {
			const M = window.M;
			// M.AutoInit();
			var elems = document.querySelectorAll('.tooltipped');
			M.Tooltip.init(elems, { enterDelay: 1000 });

			var elems2 = document.querySelectorAll('.modal');
			M.Modal.init(elems2);
		},
		[ filteredTasks ]
	);

	//loops through the filtered tasks(on the basis of option selected) and calls another component to display each task entered
	return (
		<div className="container">
			<div className="  scroll-box">
				{filteredTasks.length ? (
					filteredTasks.map(
						(task) =>
							task.edited === false && (
								<ShowTasksHelper
									task={task}
									key={task.id}
									filteredTasks={filteredTasks}
									setTasks={setTasks}
									tasks={tasks}
									setInput={setInput}
								/>
							)
					)
				) : null}
			</div>
		</div>
	);
};

export default ShowTasks;
