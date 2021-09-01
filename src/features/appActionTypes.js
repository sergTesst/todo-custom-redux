
export const actionTypes = {
	todosAdded:'todos/todoAdded',
	todosFetchAdded:'todos/todoFetchAdded',

	todosToggled:'todos/todoToggled',
	todosColorSelected:'todos/colorSelected',
	todoDeleted:'todos/todoDeleted',
	
	todosLoaded:'todos/todosLoaded',

	allTodosCompleted:'todos/allCompleted',
	todosCompletedCleared:'todos/completedCleared',

	statusFilterChanged:'filters/statusFilterChanged',
	colorFilterChanged:'filters/colorFilterChanged',

}

/*
	const actions = [
	{type:actionTypes.todosAdded, payload:todoText},
	{type:actionTypes.todosToggled, payload:todoId},
	{type:actionTypes.todosColorSelected, payload:{todoId, color}},
	{type:actionTypes.todoDeleted, payload:todoId},
	{type:actionTypes.allTodosCompleted},
	{type:actionTypes.todosCompletedCleared},
	{type:actionTypes.statusFilterChanged, payload:filterValue},
	{type:actionTypes.colorFilterChanged, payload:{color, changeType}}	
]
*/

