import React from 'react';
import TodoEdit from './TodoEdit';

function ToggleableAddButton({
	showEdit,
	addNewTodo,
	toggleToAddButton,
	toggleToEdit,
	updateFormState,
	themePreference,
}) {
	const [newTodoText, setNewTodoText] = React.useState('');

	function handleFieldChange(e) {
		setNewTodoText(e.target.value);
	}

	function cleanUp() {
		setNewTodoText('');
	}

	if (showEdit)
		return (
			<>
				{
					<div class='fixed top-0 left-0 z-10 bottom-0 right-0 bg-gray-900/90 '></div>
				}
				<TodoEdit
					localTodoText={newTodoText}
					handleFieldChange={handleFieldChange}
					addNewTodo={addNewTodo}
					cleanUp={cleanUp}
					toggleToView={toggleToAddButton}
					toggleToAddButton={toggleToAddButton}
					isNewEdit
					updateFormState={updateFormState}
					themePreference={themePreference}
				/>
			</>
		);

	return (
		<div className='p-8 w-full flex justify-center content-center'>
			<i
				onClick={toggleToEdit}
				title='Add new todo'
				className={
					'bi-plus text-4xl lg:text-6xl hover:scale-125 cursor-pointer hover:ring-1  rounded-full  text-center ' +
					(themePreference === 'Blue'
						? 'text-blue-500 ring-blue-500'
						: themePreference === 'Green'
						? 'text-green-500 ring-green-500'
						: themePreference === 'Red'
						? 'text-red-500 ring-red-500'
						: '')
				}
			></i>
		</div>
	);
}

export default ToggleableAddButton;
