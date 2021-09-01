import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { actionTypes } from '../appActionTypes';

import {saveNewTodo} from '../todos/customFetchers';

export const Header = ()=>{
	const [text, setText] = useState('');
	const dispatch = useDispatch();
	const handleInputChange = (e) => setText(e.target.value);
	const handleKeyDown = (e)=>{
		const trimmedText = e.target.value.trim();
		if(e.key==='Enter'&& trimmedText){
			
			//create the thunk func with text
			dispatch(saveNewTodo(trimmedText));

			setText('');
		}
	}
	
	return(
		<header className='header'>
			<input
				className="new-todo"
				placeholder='Type new todo here'
				value={text}
				autoFocus={true}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
			>

			</input>
		</header>
	)
}
