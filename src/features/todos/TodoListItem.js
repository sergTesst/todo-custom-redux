import React from 'react'

import { ReactComponent as TimesSolid } from './times-solid.svg'
import { availableColors, capitalize } from '../filters/colors'

import { useSelector, useDispatch } from 'react-redux'

import { actionTypes } from '../appActionTypes'

const selectTodoById = (state, todoId) => {
  return Array.from(state.todos).find((todo) => todo.id === todoId)
}

const TodoListItem = ({ id: todoId }) => {
	
	console.log('i am rendering ',{todoId});

  const todo = useSelector((state) => selectTodoById(state, todoId))

  const { text, completed, color } = todo
  const dispatch = useDispatch()

  const handleCompletedChanged = (e) => {
    dispatch({ type: actionTypes.todosToggled, payload: todo.id })
  }
  const handleColorChanged = (e) => {
    dispatch({
      type: actionTypes.todosColorSelected,
      payload: {
        color: e.target.value,
        todoId: todo.id,
      },
    })
  }
  const handleTodoDeleted = (e) => {
    dispatch({
      type: actionTypes.todoDeleted,
      payload: { todoId: todo.id },
    })
  }

  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ))

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          ></input>
          <div className="todo-text">{text}</div>
        </div>

        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>

          <button className="destroy" onClick={handleTodoDeleted}>
            <TimesSolid></TimesSolid>
          </button>
        </div>
      </div>
    </li>
  )
}

export default TodoListItem
