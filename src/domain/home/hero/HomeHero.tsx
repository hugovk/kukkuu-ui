import * as React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './hero.module.scss';

type HomeHero = {
  userHasProfile: boolean;
  scrollToForm: () => void;
};

const HomeHero: React.FunctionComponent<HomeHero> = ({
  userHasProfile,
  scrollToForm,
}) => {
  const { t } = useTranslation();
  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <h1>{t('homePage.hero.underConstruction.heading')}</h1>
          <p> {t('homePage.hero.underConstruction.text')}</p>
        </div>
      </div>
      <div className={styles.kidsImageContainer}>
        <div className={styles.kidsImage}></div>
      </div>
    </section>
  );
};

export default HomeHero;
