import * as React from 'react';

import * as styles from './Page.scss';

export interface Props {
  children: React.ReactNode;
}

export default ({children}: Props) => (
  <main className={styles.Page}>{children}</main>
);
