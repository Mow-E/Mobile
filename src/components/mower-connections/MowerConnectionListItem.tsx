import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
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
  showInfoButton?: boolean;
}

/**
 * A list entry for a mower connection with an info button.
 */
function MowerConnectionListItem({
  item,
  onSelectItem,
  onOpenInfo,
  infoTestID,
  showInfoButton = false,
}: MowerConnectionListItemProps): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

  return (
    <View style={componentStyles.container}>
      <Pressable onPress={onSelectItem} style={componentStyles.label}>
        <Text style={styles.textNormal}>
          {item?.name ??
            t(
              'routes.mowerConnections.mowerConnectionsList.activeConnection.noActiveConnection',
            )}
        </Text>
      </Pressable>
      {item && showInfoButton && (
        <MowerConnectionInfoButton
          onOpenInfo={onOpenInfo}
          testID={infoTestID}
        />
      )}
    </View>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // This provides an even height for all list items, even if some have no info button
    // height = info + (2 * padding)
    height: INFO_ICON_SIZE + 2 * spacing.sm,
  },
  label: {
    padding: spacing.sm,
    flexGrow: 1,
    maxWidth: '87%',
  },
});

export default MowerConnectionListItem;
