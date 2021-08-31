import React from 'react';

import { availableColors, capitalize } from '../filters/colors';
import {StatusFilters} from '../filters/filtersSlice';


const RemainingTodos = ({count})=>{
	const suffix = count === 1?'':'s';

	return(
		<div className='todo-count'>
			<h5>Remaining Todos</h5>
			<strong>{count}</strong>item{suffix} left
		</div>
	)
}
const StatusFilter = ({value:status, onChange})=>{
	const renderedFilters = Object.keys(StatusFilters).map((key)=>{
		const valueStatus = StatusFilters[key];
		const handleClick = () => onChange(valueStatus);
		const className = valueStatus === status?'selected':'';

		return(
			<li key={valueStatus}>
				<button className={className} onClick={handleClick}>{key}</button>
			</li>
		)
	})

	return(
		<div className='filters statusFilters'>
			<h5>Filter by status</h5>
			<ul>{renderedFilters}</ul>
		</div>
	)
}

const ColorFilters = ({value:colors, onChange})=>{


	const renderedColors = availableColors.map((color)=>{

		const checked = Array.from(colors).includes(color);
		const handleChange = ()=>{
			const changeType = checked ? 'removed': 'added';
			onChange(color, changeType);
		}
		return(
			<label key={color}>
				<input
					type="checkbox"
					name={color}
					checked={checked}
					onChange={handleChange}
				></input>
				<span
					className="color-block"
					style={{backgroundColor:color}}
				></span>
				{capitalize(color)}
			</label>
		)
	});

	return (
		<div className="filters colorFilters">
			<h5>Filter by color</h5>
			<form className="colorSelection">{renderedColors}</form>
		</div>
	)

}

const AsideBar = ()=>{
	const colors = [];
	const status = StatusFilters.All;
	const todosRemaining =1;

	const onColorChange = (color, changeType)=>{
		console.log('Color change: ', {color, changeType});
	}
	const onStatusChange = (status)=>{
		 console.log('Status change: ', status);
	}
	return(
		<aside className='aside-bar'>
			<div className='actions'>
				<h5>Actions</h5>
				<button className='button'>Mark All Completed</button>
				<button className='button'>Clear Completed</button>
			</div>

			<RemainingTodos count={todosRemaining}></RemainingTodos>
			<StatusFilter value={status} onChange={onStatusChange}></StatusFilter>
			<ColorFilters value={colors} onChange={onColorChange}></ColorFilters>

		</aside>
	)
}

export default AsideBar;