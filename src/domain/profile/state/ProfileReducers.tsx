import { createReducer } from '@reduxjs/toolkit';

import { PROFILE_ACTIONS } from '../constants/ProfileActionConstants';
import { ProfileType } from '../type/ProfileTypes';

export const defaultProfileData: ProfileType = {
  id: '',
  firstName: '',
  lastName: '',
  phoneNumber: '',
  email: '',
  language: null,
  children: {
    edges: [],
  },
};

export default createReducer(defaultProfileData, {
  [PROFILE_ACTIONS.SAVE_PROFILE]: (state, action) => (state = action.payload),
  [PROFILE_ACTIONS.CLEAR_PROFILE]: state => (state = defaultProfileData),
});
