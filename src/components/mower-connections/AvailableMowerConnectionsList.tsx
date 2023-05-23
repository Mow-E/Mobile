import React from 'react';
import {FlatList} from 'react-native';
import LineListItemSeparator from '../common/LineListItemSeparator';
import MowerConnectionListItem from './MowerConnectionListItem';
import useStyles from '../../hooks/useStyles';
import MowerConnection from '../../models/MowerConnection';

/**
 * The properties for <AvailableMowerConnectionsList />.
 */
interface AvailableMowerConnectionsList {
  /**
   * The available mower connections to display.
   */
  availableConnections: MowerConnection[];
  /**
   * Called when a mower connection is selected.
   *
   * @param connection the selected mower connection.
   */
  onSelectConnection: (connection: MowerConnection) => void;
  /**
   * Called when the connection info of a mower connection should be opened.
   *
   * @param connection the mower connection to show the info of.
   */
  onOpenConnectionInfo: (connection: MowerConnection) => void;
}

/**
 * Shows a list of mower connections.
 */
function AvailableMowerConnectionsList({
  availableConnections,
  onSelectConnection,
  onOpenConnectionInfo,
}: AvailableMowerConnectionsList): JSX.Element {
  const styles = useStyles();

  return (
    <FlatList
      data={availableConnections}
      contentContainerStyle={styles.border}
      ItemSeparatorComponent={LineListItemSeparator}
      ListEmptyComponent={<MowerConnectionListItem item={null} />}
      renderItem={({item}) => (
        <MowerConnectionListItem
          item={item}
          onSelectItem={() => onSelectConnection(item)}
          onOpenInfo={() => onOpenConnectionInfo(item)}
          infoTestID={`openConnectionInfo-${item.id}`}
        />
      )}
    />
  );
}

export default AvailableMowerConnectionsList;
