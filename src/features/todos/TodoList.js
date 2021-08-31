import React from 'react'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'

//returning new array references in selectors causes components to re-render every time

const selectTodoIds = state => state.todos.map(todo=>todo.id);

const TodoList = () => {

//useSelector can take a comparison func as a second arg
  const todoIds = useSelector(selectTodoIds);

  const renderedListItems = todoIds.map((todoId) => {
    return (
      <TodoListItem
        key={todoId}
        id={todoId}
      />
    )
  })

  return (
    <>
      <ul className="todo-list">{renderedListItems}</ul>
    </>
  )
}

export default TodoList
