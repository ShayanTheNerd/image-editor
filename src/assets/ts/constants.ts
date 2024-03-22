const IMG_DONWLOAD_TIMEOUT_MS = 1000;
const ACTIVE_FILTER_CLASS = 'btn--filter--active';
const ACTIVE_FILTER_VALUE_CSS_VAR = '--_value';
const SPLIT_FROM_LAST_DOT_REGEXP = /\.(?=[^.]+$)/;
const SPIN_MODES = ['Rotate Right', 'Rotate Left', 'Vertical Flip', 'Horizontal Flip'] as const;

export {
	SPIN_MODES as spinModes,
	ACTIVE_FILTER_CLASS as activeFilterClass,
	IMG_DONWLOAD_TIMEOUT_MS as imgDownloadTimeoutMS,
	SPLIT_FROM_LAST_DOT_REGEXP as splitFromLastDotRegExp,
	ACTIVE_FILTER_VALUE_CSS_VAR as activeFilterValueCSSVar,
};
