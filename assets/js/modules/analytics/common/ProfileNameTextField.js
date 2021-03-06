/**
 * Analytics Profile Name component.
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
import { useCallback, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Data from 'googlesitekit-data';
import { STORE_NAME as CORE_FORMS } from '../../../googlesitekit/datastore/forms';
import { TextField, HelperText, Input } from '../../../material-components';
import { STORE_NAME, PROFILE_CREATE, FORM_SETUP } from '../datastore/constants';
const { useSelect, useDispatch } = Data;

export default function ProfileNameTextField() {
	const propertyID = useSelect( ( select ) => select( STORE_NAME ).getPropertyID() );
	const profiles = useSelect( ( select ) => select( STORE_NAME ).getProfiles( propertyID ) );
	const profileID = useSelect( ( select ) => select( STORE_NAME ).getProfileID() );
	const profileName = useSelect( ( select ) => select( CORE_FORMS ).getValue( FORM_SETUP, 'profileName' ) );

	const { setValues } = useDispatch( CORE_FORMS );
	const onChange = useCallback( ( { currentTarget } ) => {
		setValues( FORM_SETUP, { profileName: currentTarget.value } );
	}, [] );

	useEffect( () => {
		if ( ! profileName ) {
			setValues( FORM_SETUP, { profileName: __( 'All Web Site Data', 'google-site-kit' ) } );
		}
	}, [] );

	// bounce if an existing profile is selected
	if ( profileID !== PROFILE_CREATE ) {
		return null;
	}

	let helperText;
	let trailingIcon;

	const existingProfile = Array.isArray( profiles ) && profiles.some( ( { name } ) => name === profileName );
	if ( existingProfile ) {
		helperText = (
			<HelperText persistent>
				{ __( 'A view with this name already exists.', 'google-site-kit' ) }
			</HelperText>
		);

		trailingIcon = (
			<span className="googlesitekit-text-field-icon--warning">
				<span className="screen-reader-text">
					{ __( 'Warning', 'google-site-kit' ) }
				</span>
			</span>
		);
	}

	return (
		<div className="googlesitekit-analytics-profilename">
			<TextField
				label={ __( 'View Name', 'google-site-kit' ) }
				outlined
				helperText={ helperText }
				trailingIcon={ trailingIcon }
			>
				<Input value={ profileName } onChange={ onChange } />
			</TextField>

			<p>
				{ __( 'You can make changes to this view (e.g. exclude URL query parameters) in Google Analytics.', 'google-site-kit' ) }
			</p>
		</div>
	);
}
