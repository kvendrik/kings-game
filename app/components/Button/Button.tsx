import * as React from 'react';
import {Link} from 'react-router-dom';

import * as styles from './Button.scss';

interface Props {
  children: React.ReactNode;
  href?: string;
  type?: 'submit' | undefined;
  onClick?: any;
}

export default ({children, href, type, onClick}: Props) => {
  if (!href || type === 'submit') {
    return (
      <button type={type} className={styles.Button} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Link className={styles.Button} to={href}>
      {children}
    </Link>
  );
};
