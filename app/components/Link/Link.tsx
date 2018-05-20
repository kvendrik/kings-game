import * as React from 'react';
import {Link} from 'react-router-dom';

import * as styles from './Link.scss';

interface Props {
  href: string;
  children: React.ReactNode;
  title?: string;
}

export default ({href, title, children}: Props) => {
  const isExternal = /http(s)?\:\/\//.test(href);

  if (isExternal) {
    return (
      <a className={styles.Link} href={href} title={title} target="_blank">
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
