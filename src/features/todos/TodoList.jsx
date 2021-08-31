import React from 'react'
import TodoListItem from './TodoListItem'
import { useSelector, shallowEqual } from 'react-redux';
import {StatusFilters} from '../filters/filtersSlice';

//returning new array references in selectors causes components to re-render every time

const selectTodoIds = (state,status, colors) => {

  const filteredTodos = state.todos.filter((todo)=>{

    const {completed, color} = todo;

    let colorsSelected = Array.from(colors).length>0;
    let byColor = colorsSelected===false;
    if(colorsSelected){
      byColor = Array.from(colors).includes(color);
    }

    let byStatus;
    switch(`${status}`.toLowerCase()){
      case StatusFilters.All:{
        byStatus = true;
        break;
      }
      case StatusFilters.Active:{
        byStatus = completed === false;
        break;
      }
      case StatusFilters.Completed:{
        byStatus = completed === true;
        break;
      }
      default:
        byStatus = true;
    }
    return byColor && byStatus;   
  })

  return Array.from(filteredTodos).map((todo) => todo.id);
}

const TodoList = () => {
  const { status, colors } = useSelector((state) => state.filters);
  
  //rendering 2 times
  // console.log('TodoList status colors',status,colors)
  //useSelector can take a comparison func as a second arg
  const todoIds = useSelector(
    (state) => selectTodoIds(state, status, colors),
    shallowEqual
  )

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
