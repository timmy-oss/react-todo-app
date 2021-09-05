import React from 'react';

function TodoEdit({
	todoText,
	id,
	deleteTodo,
	toggleToEdit,
	createdAt,
	updateFormState,
	numberOfOpenForms,
	isDone,
	markAsDone,
	themePreference,
}) {
	return (
		<div
			className={
				'w-full  shadow-xl my-8 ring-gray-700/80 relative rounded-lg bg-gradient-to-tr from-black   p-4 ' +
				(themePreference === 'Blue'
					? 'to-blue-500 border-blue-500'
					: themePreference === 'Green'
					? 'to-green-500 border-green-500'
					: themePreference === 'Red'
					? 'to-red-500 border-red-500'
					: '')
			}
		>
			{!isDone ? (
				<span className='absolute uppercase top-0 border-2 border-white/75  opacity-90 rounded font-black left-0 p-1 text-white text-xs text-center bg-yellow-500'>
					<i className='text-base bi-hourglass-split'></i>{' '}
					&nbsp;Pending
				</span>
			) : (
				<span className='absolute top-0 border-2 uppercase border-white/75  opacity-90 font-black rounded  left-0 p-1 text-white text-xs text-center bg-green-500'>
					<i className='text-base bi-check-circle-fill'></i>{' '}
					&nbsp;Completed
				</span>
			)}
			<div className=' '>
				<p className='p-4 my-4 border-white/50 border-2    font-sans text-left text-white font-normal text-xl lg:text-2xl'>
					{todoText}
				</p>
			</div>

			<div>
				<p className='text-center inline-block mx-auto lg:ml-3 font-sans font-semibold mt-3 shadow-lg px-2 border-2 border-white/60 border-dotted p-1 rounded-lg  text-white text-xs  lg:text-sm bg-gray-800'>
					<i className='bi-clock-history text-xl text-white   '></i>
					&nbsp;&nbsp;
					{createdAt}
				</p>
			</div>

			<div className='flex flex-row justify-end  space-x-3   '>
				{!isDone && (
					<i
						title='Edit'
						onClick={() => {
							if (numberOfOpenForms > 0) return;
							// alert(numberOfOpenForms);

							updateFormState(true);
							toggleToEdit();
						}}
						className='bi-pencil-square cursor-pointer hover:scale-110 text-gray-50  text-2xl hover:text-gray-400'
					></i>
				)}

				{isDone || (
					<i
						title='Mark as done'
						onClick={() => {
							markAsDone(id);
						}}
						className='bi-check2-square cursor-pointer  hover:scale-110 text-gray-50 text-2xl hover:text-gray-400'
					></i>
				)}

				{isDone && (
					<i
						title='Todo has been marked as done'
						className='bi-check-lg hover:text-green-300   text-green-400 text-2xl '
					></i>
				)}

				<i
					title='Delete'
					onClick={() => {
						if (
							confirm('Are you sure you want to delete the todo?')
						) {
							deleteTodo(id);
						}
					}}
					className='bi-trash cursor-pointer  hover:scale-110 text-gray-50 text-2xl hover:text-gray-400'
				></i>
			</div>
		</div>
	);
}

export default TodoEdit;
