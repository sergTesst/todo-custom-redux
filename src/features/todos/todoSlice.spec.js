import { actionTypes } from '../appActionTypes'

import todosReducer, { initialState } from './todoSlice'

describe('todo reducer', () => {
  const testInitialState = [
    ...initialState,
	];

  it('adds new todo to initial state', () => {
    const newTodoText = 'new todo test text';

    const newState = todosReducer(testInitialState, {
      type: actionTypes.todosAdded,
      payload: newTodoText,
    });

    const expectedState = [
      ...testInitialState,
      {
        id: 3,
        text: newTodoText,
        completed: false,
      },
    ];
    expect(newState).toEqual(expectedState);
  })
	
	it('adds or modifies color for todo with todoId', ()=>{
		
		const todoWithExistingIdAndNewColor = {
			color:'brown',
			todoId: 0
		};

		const newState = todosReducer(testInitialState, {
      type: actionTypes.todosColorSelected,
      payload: {
				...todoWithExistingIdAndNewColor
			},
    });

		const [first, second, third] = testInitialState;
		const expectedState = [
      {
				...first,
				color:todoWithExistingIdAndNewColor.color
      },
			{
				...second
			},
			{
				...third
			}
    ];

		expect(newState).toEqual(expectedState);

	})

	it('toggles todo with todoId', ()=>{
		
		const todoIdToToggle = 1;

		const newState = todosReducer(testInitialState, {
      type: actionTypes.todosToggled,
      payload: todoIdToToggle,
    });

		const [first, second, third] = testInitialState;
		const expectedState = [
      {
				...first
      },
			{
				...second,
				completed:true
			},
			{
				...third
			}
    ];

		expect(newState).toEqual(expectedState);

	})
	it('deletes todo with todoId', ()=>{
		
		const todoIdToDelete = 0;

		const newState = todosReducer(testInitialState, {
      type: actionTypes.todoDeleted,
      payload: {
				todoId:todoIdToDelete
			},
    });

		const [first, second, third] = testInitialState;
		const expectedState = [
			{
				...second,
			},
			{
				...third
			}
    ];

		expect(newState).toEqual(expectedState);

	})
	it('all todo completed', ()=>{
		
		const newState = todosReducer(testInitialState, {
      type: actionTypes.allTodosCompleted,
    });

		const [first, second, third] = testInitialState;
		const expectedState = [
			{
				...first,
				completed: true
			},
			{
				...second,
				completed: true
			},
			{
				...third,
				completed: true
			}
    ];

		expect(newState).toEqual(expectedState);
	})
	it('all todo completed cleared', ()=>{
		
		const newState = todosReducer(testInitialState, {
      type: actionTypes.todosCompletedCleared,
    });

		const [first, second, third] = testInitialState;
		const expectedState = [
			{
				...second,
			},
			{
				...third,
			}
    ];

		expect(newState).toEqual(expectedState);
	})

})
