import { createReducer } from 'redux-starter-kit';

import { PROFILE_ACTIONS } from '../constants/ProfileActionConstants';
import { Profile } from '../type/ProfileTypes';

export const defaultProfileData: Profile = {
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  children: [
    {
      firstName: '',
      lastName: '',
      birthdate: '',
    },
  ],
};

export default createReducer(defaultProfileData, {
  [PROFILE_ACTIONS.SAVE_PROFILE]: (state, action) => {
    state = action.payload;
  },
  [PROFILE_ACTIONS.CLEAR_PROFILE]: state => {
    state = defaultProfileData;
  },
});
