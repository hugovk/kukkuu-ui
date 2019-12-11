import React, { FunctionComponent } from 'react';

import styles from './home.module.scss';
import HomePreliminaryForm from './form/HomePreliminaryForm';
import PageWrapper from '../app/layout/PageWrapper';
import HomeHero from './hero/HomeHero';
import HomeInstructions from './instructions/HomeInstructions';
import HomePartners from './partners/HomePartners';
import HomeContact from './contact/HomeContact';

const Home: FunctionComponent = () => {
  return (
    <PageWrapper>
      <div className={styles.home}>
        <HomeHero userHasProfile={false} />
        <HomeInstructions />
        <HomePreliminaryForm />
        <HomePartners />
        <HomeContact />
      </div>
    </PageWrapper>
  );
};

export default Home;
