import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { actionTypes } from '../appActionTypes';

import {saveNewTodo} from '../todos/customFetchers';
import { StatusLoadingData } from '../todos/todoSlice';

export const Header = ()=>{
	
	const dispatch = useDispatch();
	const [status, setStatus] = useState(StatusLoadingData.idle);

	const [text, setText] = useState('');
	const handleInputChange = (e) => setText(e.target.value);

	const handleKeyDown = async (e)=>{

		const trimmedText = text.trim();
		if(e.key==='Enter'&& trimmedText){
			setStatus(StatusLoadingData.loading);

			// wait for the promise returned by saveNewTodo
			await dispatch(saveNewTodo(trimmedText));

			setText('');
			setStatus(StatusLoadingData.idle);
		}
	}
	let isLoading = status === StatusLoadingData.loading;
	let placeholder = isLoading?'...':'Type new todo here';
	let loader = isLoading?<div className='loader'></div>: null;

	return(
		<header className='header'>
			<input
				className="new-todo"
				placeholder={placeholder}
				value={text}
				autoFocus={true}
				onChange={handleInputChange}
				onKeyDown={handleKeyDown}
				disabled={isLoading}
			>
			</input>
			{loader}
		</header>
	)
}
