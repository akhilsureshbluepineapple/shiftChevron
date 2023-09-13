import { createCustomElement } from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import actionHandlers from './actions';
import view from './view';

createCustomElement('neis-shift-chevron', {
	renderer: { type: snabbdom },
	view,
	styles,
	initialState: {
		shift: []
	},
	properties: {
		table: {
			default: ''
		},
		sysId: {
			default: ''
		},
	},
	...actionHandlers,
});
