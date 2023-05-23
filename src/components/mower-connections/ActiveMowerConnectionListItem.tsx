import MowerConnectionListItem from './MowerConnectionListItem';
import React, {useCallback} from 'react';
import useActiveMowerConnection from '../../hooks/useActiveMowerConnection';
import MowerConnection from '../../models/MowerConnection';

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
    activeConnection && onOpenConnectionInfo(activeConnection);
  }, [activeConnection, onOpenConnectionInfo]);

  return (
    <MowerConnectionListItem
      item={activeConnection}
      showInfoButton
      onOpenInfo={handleOpenInfo}
      infoTestID="openActiveConnectionInfo"
    />
  );
}

export default ActiveMowerConnectionListItem;
