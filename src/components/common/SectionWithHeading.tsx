import React, {PropsWithChildren} from 'react';
import {Text, View} from 'react-native';
import useStyles from '../../hooks/useStyles';

/**
 * The properties for <SectionWithHeading />.
 */
export interface SectionWithHeadingProps {
  /**
   * The heading to display for the section.
   */
  heading?: string;
}

/**
 * A page section with a heading.
 */
function SectionWithHeading({
  heading,
  children,
}: PropsWithChildren<SectionWithHeadingProps>): JSX.Element {
  const styles = useStyles();

  return (
    <View>
      <Text style={styles.textHeading}>{heading}</Text>
      {children}
    </View>
  );
}

export default SectionWithHeading;
