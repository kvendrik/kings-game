import * as React from 'react';
import classNames from 'Utils/classNames';

import * as styles from './Heading.scss';

interface Props {
  size: 'extra-large' | 'large' | 'medium';
  children: React.ReactNode;
  subdued?: boolean;
}

export default ({children, size, subdued}: Props) => {
  let HeadingTag = 'h2';

  if (size === 'extra-large') {
    HeadingTag = 'h1';
  }

  return (
    <div>
      <HeadingTag
        className={classNames(
          styles.Heading,
          size === 'extra-large' && styles.ExtraLargeHeading,
          size === 'large' && styles.SubHeading,
          size === 'medium' && styles.MediumHeading,
          subdued && styles.Subdued,
        )}
      >
        {children}
      </HeadingTag>
    </div>
  );
};
