import { actionTypes } from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
import { FETCH_VALUE_FAILED, FETCH_VALUE_SUCCEEDED, FETCH_RECORD, URL_CM_PLAN } from './constants';

export default {
	actionHandlers: {

		[actionTypes.COMPONENT_BOOTSTRAPPED]: ({ dispatch, state, updateState }) => {
			if (state.properties.table == 'x_neis_dxocm_cm_plan' && state.properties.sysId != -1) {
				dispatch(FETCH_RECORD, {
					id: state.properties.sysId
				});
			}

		},
		[actionTypes.COMPONENT_CONNECTED]: ({ dispatch, state,updateState }) => {
			if (state.properties.table == 'x_neis_dxocm_cm_plan' && state.properties.sysId != -1) {
				dispatch(FETCH_RECORD, {
					id: state.properties.sysId
				});
			}

		},
		[FETCH_RECORD]: createHttpEffect(URL_CM_PLAN, {
			pathParams: ['id'],
			method: 'GET',
			errorActionType: FETCH_VALUE_FAILED,
			successActionType: FETCH_VALUE_SUCCEEDED
		}),
		[actionTypes.COMPONENT_PROPERTY_CHANGED]: ({ dispatch, state }) => {
			dispatch(FETCH_RECORD, {
				id: state.properties.sysId
			});
		},
		[FETCH_VALUE_SUCCEEDED]: ({ action, updateState, state }) => {

			const {
				payload: { result = [] }

			} = action;

			//console.log(state);
			var temp = [{
				value: result.strategize ? result.strategize : 0, label: 'S'
			},
			{ value: result.harmonize ? result.harmonize : 0, label: 'H' },
			{ value: result.informatize ? result.informatize : 0, label: 'I' },
			{ value: result.formalize ? result.formalize : 0, label: 'F' },
			{ value: result.transformatize ? result.transformatize : 0, label: 'T' }
			]

			updateState({ shift: temp });
			// Logging the result

		},
		[FETCH_VALUE_FAILED]: ({ action }) => {
			const {
				type,
				payload: {
					statusText,
					data: {
						error: { message }
					}
				}
			} = action;
			console.error(`[${type}] ${statusText}: ${message}!`);
		},
		[actionTypes.COMPONENT_ERROR_THROWN]: () => {
			console.log('error')
		},

	}
}