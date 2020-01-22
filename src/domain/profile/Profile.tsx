import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/react-hooks';
import { Redirect, Switch, Route } from 'react-router-dom';
import * as Sentry from '@sentry/browser';

import { profileQuery as ProfileQueryType } from '../api/generatedTypes/profileQuery';
import { saveProfile } from './state/ProfileActions';
import profileQuery from './queries/ProfileQuery';
import LoadingSpinner from '../../common/components/spinner/LoadingSpinner';
import ProfileChildDetail from './children/child/ProfileChildDetail';
import { getCurrentLanguage } from '../../common/translation/TranslationUtils';
import ProfileChildrenList from './children/ProfileChildrenList';
import PageWrapper from '../app/layout/PageWrapper';
import styles from './profile.module.scss';

const Profile: FunctionComponent = () => {
  const { loading, error, data } = useQuery<ProfileQueryType>(profileQuery, {
    fetchPolicy: 'no-cache',
  });
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
  } else {
    // User has logged in, but not created a profile, send them to front page for registration.
    return <Redirect to="/" />;
  }

  return (
    <Switch>
      <Route
        component={ProfileChildDetail}
        exact
        path={`/${locale}/profile/child/:childId`}
      />
      <Route
        component={ProfileChildrenList}
        exact
        path={`/${locale}/profile/children`}
      />

      <Redirect to={`/profile/children`} />
    </Switch>
  );
};

export default Profile;
