import * as React from 'react';
import { useTranslation } from 'react-i18next';

import hamburgerMenu from '../../../../../assets/icons/svg/hamburgerMenu.svg';
import close from '../../../../../assets/icons/svg/close.svg';
import styles from './smallScreenNav.module.scss';
import Icon from '../../../../../common/components/icon/Icon';
import LanguageBar from '../languageBar/LanguageBar';

const SmallScreenNav: React.FunctionComponent = props => {
  const { t } = useTranslation();

  const ref = React.useRef<HTMLDivElement>(null);
  const [isOpen, toggleNavMenu] = React.useState(false);
  const handleClick = (e: Event) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      toggleNavMenu(false);
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={styles.smallScreenNav}>
      <button
        aria-label={t('navbar.menuButton.label')}
        onClick={() => toggleNavMenu(!isOpen)}
      >
        <Icon className={styles.icon} src={hamburgerMenu} alt="menu" />
      </button>
      {isOpen && (
        <div
          className={styles.smallScreenNavContent}
          onClick={() => toggleNavMenu(!isOpen)}
        >
          <div className={styles.smallScreenNavTop}>
            <div className={styles.logoWrapper}>
              <div className={styles.logo}></div>
            </div>
            <button
              aria-label={t('common.closeButton.altText')}
              className={styles.closeButton}
              onClick={() => toggleNavMenu(!isOpen)}
            >
              <Icon
                className={styles.icon}
                src={close}
                alt={t('common.closeButton.altText')}
              />
            </button>
          </div>
          <LanguageBar className={styles.smallScreenNavLangBar} />
        </div>
      )}
    </div>
  );
};

export default SmallScreenNav;
