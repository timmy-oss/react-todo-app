import React from 'react';
import Todo from './Todo';
import ToggleableAddButton from './ToggleableAddButton';
function TodoContainer() {
	const defaultTodos = [
		{
			id: 1,
			todoText: 'Add a new todo now!',
			createdAt: new Date().toLocaleString(),
			isDone: false,
		},
	];

	const [unfilteredTodos, setUnfilteredTodos] = React.useState([]);
	const [todos, setTodos] = React.useState([]);
	const [showToggleEdit, setShowToggleEdit] = React.useState(false);
	const [numberOfOpenForms, setNumberOfOpenForms] = React.useState(0);
	const [filterPreference, setFilterPreference] = React.useState('All');
	const [themePreference, setThemePreference] = React.useState('Blue');

	const updateFormState = (state) => {
		if (state === false) {
			if (numberOfOpenForms != 0) {
				setNumberOfOpenForms(numberOfOpenForms - 1);
			}
		} else if (state === true) {
			setNumberOfOpenForms(numberOfOpenForms + 1);
		}
	};

	function updateTodo(todoId, todoText) {
		let selectedTodo = unfilteredTodos.find((todo) => {
			return todoId === todo.id;
		});

		const updatedTodo = Object.assign({}, selectedTodo, {todoText});
		setUnfilteredTodos(
			unfilteredTodos
				.filter((todo) => todoId != todo.id)
				.concat(updatedTodo)
				.sort((a, b) => b.id - a.id)
		);
	}

	function markAsDone(todoId) {
		let selectedTodo = unfilteredTodos.find((todo) => {
			return todoId === todo.id;
		});

		const newTodo = Object.assign({}, selectedTodo, {isDone: true});
		setUnfilteredTodos(
			unfilteredTodos
				.filter((todo) => todoId != todo.id)
				.concat(newTodo)
				.sort((a, b) => b.id - a.id)
		);
	}

	//save todos to localStorage
	function syncTodos(todos, update = true) {
		if (!localStorage) {
			alert('Could not access  local storage! Syncing is disabled.');
			return todos;
		}
		if (update) {
			localStorage.setItem('savedTodosData', JSON.stringify(todos));
			return todos;
		}
		const savedTodosData = localStorage.getItem('savedTodosData');
		if (savedTodosData === 'undefined') {
			syncTodos(todos);
		} else {
			const parsedTodos = JSON.parse(savedTodosData);
			return parsedTodos;
		}
	}

	// Sync from Local Storage
	React.useEffect(() => {
		const todosFromStorage = syncTodos(defaultTodos, false);
		setUnfilteredTodos(todosFromStorage);

		// return () => {
		// 	if (
		// 		!confirm(
		// 			'You are leaving this page, do you want your todos saved?'
		// 		)
		// 	) {
		// 		syncTodos(undefined, true);
		// 	}
		// };
	}, []);

	React.useEffect(() => {
		if (filterPreference === 'All') {
			setTodos(unfilteredTodos.sort((a, b) => b.id - a.id));
		} else if (filterPreference === 'Pending') {
			setTodos(
				unfilteredTodos
					.filter((todo) => todo.isDone === false)
					.sort((a, b) => b.id - a.id)
			);
		} else if (filterPreference === 'Completed') {
			setTodos(
				unfilteredTodos
					.filter((todo) => todo.isDone === true)
					.sort((a, b) => b.id - a.id)
			);
		}

		syncTodos(unfilteredTodos);
	}, [filterPreference, unfilteredTodos]);

	function handleFilterPreferenceChange(e) {
		if (numberOfOpenForms > 0) return;

		const filter = e.target.value;
		setFilterPreference(filter);
	}

	function handleThemePreferenceChange(e) {
		const theme = e.target.value;
		setThemePreference(theme);
	}

	const deleteTodo = (id) => {
		setUnfilteredTodos(
			unfilteredTodos
				.filter((todo) => todo.id != id)
				.sort((a, b) => b.id - a.id)
		);
	};

	const addNewTodo = (todoText) => {
		const newTodo = {
			id: Math.round(Math.random() * 1000),
			todoText: todoText,
			createdAt: new Date().toLocaleString(),
			isDone: false,
		};
		setUnfilteredTodos(
			unfilteredTodos.concat(newTodo).sort((a, b) => b.id - a.id)
		);
	};
	return (
		<div className='max-w-2xl lg:mx-auto mx-1 mb-8 lg:mb-16 '>
			<div className='sticky text-white text-center p-3  font-bold select-none top-0 z-10 right-0 left-0 bg-black '>
				<p
					title='By Timileyin Pelumi'
					className={
						'text-center font-black text-xl lg:text-2xl p-4 ' +
						(themePreference === 'Blue'
							? 'text-blue-700 border-blue-500'
							: themePreference === 'Green'
							? 'text-green-500 border-green-500'
							: themePreference === 'Red'
							? 'text-red-500 border-red-500'
							: '')
					}
				>
					{' '}
					Todo App
				</p>

				<hr
					className={
						'my-2 mb-4 bg-white text-base  border-2 border-dashed p-1' +
						(themePreference === 'Blue'
							? 'text-blue-500 border-blue-500'
							: themePreference === 'Green'
							? 'text-green-500 border-green-500'
							: themePreference === 'Red'
							? 'text-red-500 border-red-500'
							: '')
					}
				/>
				<div className='flex flex-col content-center lg:flex-row justify-between'>
					<div>
						<p
							style={{fontFamily: 'cursive'}}
							className={
								'text-base inline-block px-2 ' +
								(themePreference === 'Blue'
									? 'text-blue-500 border-blue-500'
									: themePreference === 'Green'
									? 'text-green-500 border-green-500'
									: themePreference === 'Red'
									? 'text-red-500 border-red-500'
									: '')
							}
						>
							{' '}
							Theme :{' '}
						</p>{' '}
						<select
							className={
								'cursor-pointer text-sm text-center ring-2 border-2 hover:text-gray-800/70 ring-white     ring-offset-3 rounded p-1 m-2 font-bold ' +
								(themePreference === 'Blue'
									? 'text-blue-500 border-blue-500'
									: themePreference === 'Green'
									? 'text-green-500 border-green-500'
									: themePreference === 'Red'
									? 'text-red-500 border-red-500'
									: '')
							}
							value={themePreference}
							onChange={handleThemePreferenceChange}
							name='theme'
						>
							<option
								className='text-blue-500 font-bold'
								selected={themePreference === 'Blue'}
								name='Blue'
								value='Blue'
							>
								{' '}
								Blue{' '}
							</option>
							<option
								className='text-green-500 font-bold'
								selected={themePreference === 'Green'}
								name='Green'
								value='Green'
							>
								{' '}
								Green{' '}
							</option>
							<option
								className='text-red-500 font-bold'
								selected={themePreference === 'Red'}
								name='Red'
								value='Red'
							>
								{' '}
								Red
							</option>
						</select>
					</div>

					<div>
						<p
							style={{fontFamily: 'cursive'}}
							className={
								'text-base inline-block px-2 ' +
								(themePreference === 'Blue'
									? 'text-blue-500 border-blue-500'
									: themePreference === 'Green'
									? 'text-green-500 border-green-500'
									: themePreference === 'Red'
									? 'text-red-500 border-red-500'
									: '')
							}
						>
							{' '}
							Showing :{' '}
						</p>
						<select
							className='text-gray-700  text-sm cursor-pointer text-center ring-2 border-2 hover:text-gray-800/70  border-black  ring-white ring-offset-3 rounded p-1 m-2 font-bold '
							value={filterPreference}
							onChange={handleFilterPreferenceChange}
							name='filterBy'
							disabled={
								numberOfOpenForms > 0 ||
								unfilteredTodos.length === 0
							}
						>
							<option
								selected={filterPreference === 'All'}
								className='font-bold'
								name='All'
								value='All'
							>
								{' '}
								All{' '}
							</option>
							<option
								selected={filterPreference === 'Completed'}
								name='Completed'
								value='Completed'
								className='font-bold'
							>
								{' '}
								Completed{' '}
							</option>
							<option
								selected={filterPreference === 'Pending'}
								name='Pending'
								value='Pending'
								className='font-bold'
							>
								{' '}
								Pending
							</option>
						</select>
					</div>
				</div>
			</div>

			<div className='ring-2 my-1 ring-gray-700/40 rounded-lg p-4  '>
				{todos.map((todo) => (
					<Todo
						updateTodo={updateTodo}
						deleteTodo={deleteTodo}
						updateFormState={updateFormState}
						numberOfOpenForms={numberOfOpenForms}
						markAsDone={markAsDone}
						key={todo.id}
						themePreference={themePreference}
						{...todo}
					/>
				))}

				<p className='text-gray-700/70 text-base text-center font-normal py-16 p-3'>
					{!todos.length && !unfilteredTodos.length
						? "There's nothing to show, add a new todo"
						: unfilteredTodos.length && !todos.length
						? "There's nothing to show in this category"
						: ''}
				</p>
			</div>

			{!numberOfOpenForms && (
				<ToggleableAddButton
					toggleToAddButton={() => {
						setShowToggleEdit(false);
					}}
					toggleToEdit={() => {
						if (numberOfOpenForms > 0) return;

						setShowToggleEdit(true);
					}}
					addNewTodo={addNewTodo}
					showEdit={showToggleEdit}
					updateFormState={updateFormState}
					numberOfOpenForms={numberOfOpenForms}
					themePreference={themePreference}
				/>
			)}
		</div>
	);
}

export default TodoContainer;
