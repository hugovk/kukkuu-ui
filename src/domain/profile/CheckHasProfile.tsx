import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import * as Sentry from '@sentry/browser';
import { Redirect } from 'react-router-dom';

import { profileQuery as ProfileQueryType } from '../api/generatedTypes/profileQuery';
import { saveProfile } from './state/ProfileActions';
import profileQuery from './queries/ProfileQuery';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import { getCurrentLanguage } from '../../common/translation/TranslationUtils';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './profile.module.scss';

const CheckHasProfile: FunctionComponent = () => {
  const { loading, error, data } = useQuery<ProfileQueryType>(profileQuery);
  const { i18n, t } = useTranslation();
  const locale = getCurrentLanguage(i18n);

  const dispatch = useDispatch();

  if (loading) return <LoadingSpinner isLoading={true} />;
  if (error) {
    Sentry.captureException(error);
    return (
      <PageWrapper>
        <div className={styles.profile}>{t('api.errorMessage')}</div>
      </PageWrapper>
    );
  }
  if (data?.myProfile) {
    dispatch(saveProfile(data.myProfile));
    return <Redirect to={`/${locale}/profile`} />;
  }
  return null;
};

export default CheckHasProfile;
