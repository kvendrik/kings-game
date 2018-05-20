import * as React from 'react';

import * as styles from './Row.scss';

interface Props {
  children: React.ReactNode;
}

export default ({children}: Props) => (
  <div className={styles.Row}>{children}</div>
);
