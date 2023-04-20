import MowerConnectionListItem from './MowerConnectionListItem';
import React, {useCallback} from 'react';
import useActiveMowerConnection, {
  MowerConnection,
} from '../../hooks/useActiveMowerConnection';

/**
 * The properties for <ActiveMowerConnectionListItem />.
 */
interface ActiveMowerConnectionListItemProps {
  /**
   * Called when the connection info of the active mower connection should be opened.
   *
   * @param connection the current active mower connection.
   */
  onOpenConnectionInfo: (connection: MowerConnection) => void;
}

/**
 * A <MowerConnectionListItem /> with the current active mower connection.
 */
function ActiveMowerConnectionListItem({
  onOpenConnectionInfo,
}: ActiveMowerConnectionListItemProps): JSX.Element {
  const {activeConnection} = useActiveMowerConnection();

  const handleOpenInfo = useCallback(() => {
    if (activeConnection) {
      onOpenConnectionInfo(activeConnection);
    }
  }, [activeConnection, onOpenConnectionInfo]);

  return (
    <MowerConnectionListItem
      item={activeConnection}
      onOpenInfo={handleOpenInfo}
    />
  );
}

export default ActiveMowerConnectionListItem;
