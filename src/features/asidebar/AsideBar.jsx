import React from 'react'

import { availableColors, capitalize } from '../filters/colors'
import { StatusFilters, colorFilterChanged } from '../filters/filtersSlice'

import { useSelector, useDispatch } from 'react-redux'
import { actionTypes } from '../appActionTypes'

import {
  selectTodos,
  selectTodosStatus,
  StatusLoadingData,
  allTodosCompleted,
  todosCompletedCleared
} from '../todos/todoSlice';




const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const valueStatus = StatusFilters[key]
    const handleClick = () => onChange(valueStatus)
    const className =
      valueStatus.toUpperCase() === status.toUpperCase() ? 'selected' : ''

    return (
      <li key={valueStatus}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    )
  })

  return (
    <div className="filters statusFilters">
      <h5>Filter by status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  )
}

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = Array.from(colors).includes(color)
    const handleChange = () => {
      const changeType = checked ? 'removed' : 'added'
      onChange(color, changeType)
    }
    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        ></input>
        <span className="color-block" style={{ backgroundColor: color }}></span>
        {capitalize(color)}
      </label>
    )
  })

  return (
    <div className="filters colorFilters">
      <h5>Filter by color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  )
}

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? '' : 's'

  return (
    <div>
      <strong>{count}</strong>item{suffix} left
    </div>
  )
}

const RemainingTodosWrapper = () => {
  const todosRemaining = useSelector((state) => {
    const uncompleteTodos = selectTodos(state).filter((todo) => !todo.completed)
    return Array.from(uncompleteTodos).length
  })

  const loadingStatus = useSelector(selectTodosStatus);
  
  let renderedContent;
  if (loadingStatus === StatusLoadingData.loading) {
    renderedContent = <div style={{width:`20px`,height:`20px`}} className="loader"></div>;
  }else{
    renderedContent = <RemainingTodos count={todosRemaining}></RemainingTodos>;
  }

  return(
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      {renderedContent}
    </div>
    
  ) 
}

const AsideBar = () => {
  const { status, colors } = useSelector((state) => state.filters)

  const dispatch = useDispatch()

  const onColorChange = (color, changeType) => {
    dispatch(colorFilterChanged(color, changeType))
  }

  const onStatusChange = (status) => {
    // console.log('Status change: ', status);
    dispatch({
      type: actionTypes.statusFilterChanged,
      payload: status,
    })
  }

  const markAllCompletedHandler = () => {
    dispatch(allTodosCompleted())
  }

  const clearCompletedHandler = () => {
    dispatch(todosCompletedCleared())
  }

  return (
    <aside className="aside-bar">
      <div className="actions">
        <h5>Actions</h5>
        <button onClick={markAllCompletedHandler} className="button">
          Mark All Completed
        </button>
        <button onClick={clearCompletedHandler} className="button">
          Clear Completed
        </button>
      </div>

      <RemainingTodosWrapper></RemainingTodosWrapper>
      <StatusFilter value={status} onChange={onStatusChange}></StatusFilter>
      <ColorFilters value={colors} onChange={onColorChange}></ColorFilters>
    </aside>
  )
}

export default AsideBar
