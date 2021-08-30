import filtersReducer, { initialState } from './filtersSlice'
import { actionTypes } from '../appActionTypes'

describe('filters reducer', () => {
  const testInitialState = {
    ...initialState,
  }
  it('should handle initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual({
      ...testInitialState,
    })
  })
  it('should change change of status', () => {
    const newStatus = 'SomeButNotAll'
    expect(
      filtersReducer(testInitialState, {
        type: actionTypes.statusFilterChanged,
        payload: newStatus,
      })
    ).toEqual({
      ...testInitialState,
      status: newStatus,
    })
  })
  it('should change the selected colors colorFilterChanged added', () => {
    const newColorState = {
      color: 'red',
      changeType: 'added',
    }
    expect(
      filtersReducer(testInitialState, {
        type: actionTypes.colorFilterChanged,
        payload: {
          ...newColorState,
        },
      })
    ).toEqual({
			...testInitialState,
			colors:[newColorState.color]
		})
  })
  it('should change the selected colors colorFilterChanged removed', () => {
    const newColorState = {
      color: 'red',
      changeType: 'added',
    }
		filtersReducer(testInitialState, {
			type: actionTypes.colorFilterChanged,
			payload: {
				...newColorState,
			},
		})

		const newColorStateDeleted = {
      ...newColorState,
			changeType:'removed'
    }

    expect(
			filtersReducer(testInitialState, {
						type: actionTypes.colorFilterChanged,
						payload: {
							...newColorStateDeleted,
						},
					})
		
    ).toEqual({
			...testInitialState
		})
  })
})
