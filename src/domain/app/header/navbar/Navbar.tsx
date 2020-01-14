import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import styles from './navbar.module.scss';
import LanguageBar from './languageBar/LanguageBar';
import SmallScreenNav from './smallScreenNav/SmallScreenNav';

const Navbar: React.FunctionComponent = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const isSmallScreen = window.innerWidth <= 768;
  return (
    <div className={styles.navbarTop}>
      <div className={styles.logoWrapper}>
        <div className={styles.logo} onClick={() => history.push('/')}></div>
        {!isSmallScreen && <h3 className={styles.appName}>{t('appName')}</h3>}
      </div>
      <div className={styles.languageWrapper}>
        {isSmallScreen ? <SmallScreenNav /> : <LanguageBar />}
      </div>
    </div>
  );
};

export default Navbar;
