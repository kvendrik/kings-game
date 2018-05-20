import * as React from 'react';
import {Link} from 'react-router-dom';

import * as styles from './Link.scss';

interface Props {
  children: React.ReactNode;
  href?: string;
  title?: string;
  onClick?: any;
}

export default ({href, title, children, onClick}: Props) => {
  const isExternal = /http(s)?\:\/\//.test(href || '');

  if (isExternal || !href) {
    return (
      <a
        className={styles.Link}
        href={href}
        title={title}
        target="_blank"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={styles.Link} to={href} title={title}>
      {children}
    </Link>
  );
};
