import React from 'react'
import TodoListItem from './TodoListItem'
import { useSelector } from 'react-redux'

const selectTodos = (state) => state.todos

const TodoList = () => {
  const todos = useSelector(selectTodos)
  const onColorChangeHandler = (e) => {}
  const onCompleteChangeHandler = (e) => {}
  const onDeleteHandler = (e) => {}
  const renderedListItems = todos.map((todo) => {
    return (
      <TodoListItem
        key={todo.id}
        todo={todo}
        onColorChange={onColorChangeHandler}
        onCompleteChange={onCompleteChangeHandler}
        onDelete={onDeleteHandler}
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
