import axios, { AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

import i18n from '../../common/translation/i18n/i18nInit';
import userManager from './userManager';
import { StoreThunk } from '../app/types/AppTypes';
import {
  startFetchingToken,
  fetchTokenSuccess,
  fetchTokenError,
} from './state/BackendAuthenticationActions';
import { TUNNISTAMO_API_TOKEN_ENDPOINT } from '../api/constants/ApiConstants';
import { BackendTokenResponse } from './types/BackendAuthenticationTypes';

export const loginTunnistamo = (path?: string) => {
  userManager
    .signinRedirect(
      path ? { data: { path: path } } : { data: { path: '/profile' } }
    )
    .catch(error => {
      if (error.message === 'Network Error') {
        toast(i18n.t('authentication.networkError.message'), {
          type: toast.TYPE.ERROR,
        });
      } else {
        toast(i18n.t('authentication.errorMessage'), {
          type: toast.TYPE.ERROR,
        });
        Sentry.captureException(error);
      }
    });
};

export const logoutTunnistamo = async () => {
  try {
    await userManager.signoutRedirect();
  } catch (e) {
    Sentry.captureException(e);
  }
};

export const authenticateWithBackend = (
  accessToken: string
): StoreThunk => async dispatch => {
  try {
    dispatch(startFetchingToken());

    const res: AxiosResponse<BackendTokenResponse> = await axios.post(
      TUNNISTAMO_API_TOKEN_ENDPOINT,
      {},
      {
        headers: {
          Authorization: `bearer ${accessToken}`,
        },
      }
    );

    dispatch(fetchTokenSuccess(res.data));
  } catch (error) {
    toast(i18n.t('authentication.errorMessage'), {
      type: toast.TYPE.ERROR,
    });
    try {
      // This is a workaround that can save us until we can fix silentRenew().
      loginTunnistamo();
      Sentry.captureMessage(
        'authenticateWithBackend() failed - running loggingTunnistamo()'
      );
    } catch (loginTunnistamoError) {
      Sentry.captureException(error);
      Sentry.captureException(loginTunnistamoError);
      dispatch(fetchTokenError(error as AxiosError));
    }
  }
};
