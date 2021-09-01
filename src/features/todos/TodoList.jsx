import React from 'react'
import TodoListItem from './TodoListItem'
import { useSelector, shallowEqual } from 'react-redux'

import { selectFilteredTodoIds, selectFilteredTodos } from './todoSlice'


const TodoList = () => {

  //returning new array references in selectors causes components to re-render every time
  const todoIds = useSelector(state => selectFilteredTodoIds(state));

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return (
    <>
      <ul className="todo-list">{renderedListItems}</ul>
    </>
  )
}

export default TodoList
