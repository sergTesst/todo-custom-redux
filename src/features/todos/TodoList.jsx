import React from 'react'
import TodoListItem from './TodoListItem'
import {
  useSelector,
  // shallowEqual
} from 'react-redux'

import {
  selectFilteredTodoIds,
  selectTodosStatus,
  StatusLoadingData,
} from './todoSlice'

const TodoList = () => {
  //returning new array references in selectors causes components to re-render every time
  const todoIds = useSelector((state) => selectFilteredTodoIds(state))
  const loadingStatus = useSelector(selectTodosStatus)

  if (loadingStatus === StatusLoadingData.loading) {
    return (
      <div className="todo-list">
        <div className="loader"></div>
      </div>
    )
  }

  const renderedListItems = todoIds.map((todoId) => {
    return <TodoListItem key={todoId} id={todoId} />
  })

  return (
    <React.Fragment>
      <ul className="todo-list">{renderedListItems}</ul>
    </React.Fragment>
  )
}

export default TodoList
