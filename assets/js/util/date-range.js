/**
 * Utility functions.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * WordPress dependencies
 */
import { applyFilters } from '@wordpress/hooks';
import { __, _n, sprintf } from '@wordpress/i18n';

/**
 * Gets the current dateRange string.
 *
 * @return {string} the date range string.
 */
export function getCurrentDateRange() {
	/**
	 * Filter the date range used for queries.
	 *
	 * @param String The selected date range. Default 'Last 28 days'.
	 */
	const dateRange = applyFilters( 'googlesitekit.dateRange', 'last-28-days' );
	const daysMatch = dateRange.match( /last-(\d+)-days/ );

	if ( daysMatch && daysMatch[ 1 ] ) {
		return sprintf(
			/* translators: %s: Number of days matched. */
			_n( '%s day', '%s days', parseInt( daysMatch[ 1 ], 10 ), 'google-site-kit' ),
			daysMatch[ 1 ]
		);
	}

	throw new Error( 'Unrecognized date range slug used in `googlesitekit.dateRange`.' );
}

/**
 * Gets the current dateRange slug.
 *
 * @return {string} the date range slug.
 */
export function getCurrentDateRangeSlug() {
	return applyFilters( 'googlesitekit.dateRange', 'last-28-days' );
}

/**
 * Gets the hash of available date ranges.
 *
 * @since n.e.x.t
 *
 * @return {Object} The object hash where every key is a date range slug, and the value is an object with the date range slug and its translation.
 */
export function getAvailableDateRanges() {
	/* translators: %s: Number of days to request data. */
	const format = __( 'Last %s days', 'google-site-kit' );

	return {
		'last-7-days': {
			slug: 'last-7-days',
			label: sprintf( format, 7 ),
		},
		'last-14-days': {
			slug: 'last-14-days',
			label: sprintf( format, 14 ),
		},
		'last-28-days': {
			slug: 'last-28-days',
			label: sprintf( format, 28 ),
		},
		'last-90-days': {
			slug: 'last-90-days',
			label: sprintf( format, 90 ),
		},
	};
}
