import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {MowerConnection} from '../../hooks/useActiveMowerConnection';
import {useTranslation} from 'react-i18next';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';
import MowerConnectionInfoButton, {
  INFO_ICON_SIZE,
} from './MowerConnectionInfoButton';

/**
 * The properties for <MowerConnectionListItem />.
 */
interface MowerConnectionListItemProps {
  /**
   * The item to display.
   * Renders an empty-state placeholder if null.
   */
  item: MowerConnection | null;
  /**
   * Called when the item is selected.
   */
  onSelectItem?: () => void;
  /**
   * Called when the connection information of the item should be opened.
   */
  onOpenInfo?: () => void;
  infoTestID?: string;
}

/**
 * A list entry for a mower connection with an info button.
 */
function MowerConnectionListItem({
  item,
  onSelectItem,
  onOpenInfo,
  infoTestID,
}: MowerConnectionListItemProps): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <Pressable onPress={onSelectItem} style={componentStyles.button}>
      <Text style={styles.textNormal}>
        {item?.name ??
          t(
            'routes.mowerConnections.mowerConnectionsList.activeConnection.noActiveConnection',
          )}
      </Text>
      {item && (
        <MowerConnectionInfoButton
          onOpenInfo={onOpenInfo}
          testID={infoTestID}
        />
      )}
    </Pressable>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  button: {
    padding: spacing.s,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.s,
  },
});

export default MowerConnectionListItem;
