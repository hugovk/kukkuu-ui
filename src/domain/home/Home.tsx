import React, { FunctionComponent, useRef, RefObject } from 'react';
import { useSelector } from 'react-redux';
import classnames from 'classnames';

import styles from './home.module.scss';
import PageWrapper from '../app/layout/PageWrapper';
import HomeHero from './hero/HomeHero';
import HomeInstructions from './instructions/HomeInstructions';
import HomePartners from './partners/HomePartners';
import HomeContact from './contact/HomeContact';
import { userHasProfileSelector } from '../registration/state/RegistrationSelectors';

const Home: FunctionComponent = () => {
  const userHasProfile = useSelector(userHasProfileSelector);
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = (formRef: RefObject<HTMLDivElement>) => {
    if (formRef && formRef.current) {
      window.scrollTo(0, formRef.current.offsetTop);
    }
  };

  return (
    <PageWrapper containerClassName={styles.gridLayoutOverride}>
      <div
        className={classnames(styles.home, {
          userHasProfile: styles.userHasProfile,
        })}
      >
        <HomeHero
          userHasProfile={userHasProfile}
          scrollToForm={() => scrollToForm(formRef)}
        />
        <HomeInstructions />
        <HomePartners />
        <HomeContact />
      </div>
    </PageWrapper>
  );
};

export default Home;
