import {useState} from 'react';
import TodoEdit from './TodoEdit';
import TodoView from './TodoView';

function Todo(props) {
	const [localTodoText, setTodoText] = useState(props.todoText);

	const handleFieldChange = (e) => {
		setTodoText(e.target.value);
	};

	const toggleToEdit = () => {
		setShowEditView(true);
	};
	const toggleToView = () => {
		setShowEditView(false);
		setTodoText(props.todoText);
	};

	const [showEditView, setShowEditView] = useState(false);
	return (
		<div>
			{showEditView ? (
				<TodoEdit
					{...props}
					localTodoText={localTodoText}
					handleFieldChange={handleFieldChange}
					toggleToView={toggleToView}
				/>
			) : (
				<TodoView {...props} toggleToEdit={toggleToEdit} />
			)}
		</div>
	);
}

export default Todo;
