
import { actionTypes } from "../appActionTypes"

export const StatusFilters = {
	All:'all',
	Active:'active',
	Completed:'completed'
}

export const initialState = {
	status: StatusFilters.All,
	colors: []
}

export const colorFilterChanged = (color, changeType)=>{
	return {
		type: actionTypes.colorFilterChanged,
		payload: { color, changeType },
	}
}

export default function filtersReducer(state = initialState, action){
	switch(action.type){
		case actionTypes.statusFilterChanged:{
			return {
				...state,
				status: action.payload,
			};
		}

		/**
		 * action.payload = {
		 * 	color:string,
		 * 	changeType:'added'|'removed'
		 * }
		 */
		case actionTypes.colorFilterChanged:{
			let { color, changeType } = action.payload;
			const {colors} = state;
			
			switch(changeType){
				case 'added':{
					if(colors.includes(color)){
						// this color is already included in filter. No changes to state
						return state
					}

					//add new color
					return {
						...state,
						colors:state.colors.concat(color)
					}
				}
				case 'removed':{
					return{
						...state,
						colors:state.colors.filter((oldColor)=>oldColor!==color)
					}
				}
				default:
					return state;
			}
			
		}
		default:
			return state;
	}
}