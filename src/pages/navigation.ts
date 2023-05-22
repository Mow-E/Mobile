import {MowerConnection} from '../hooks/useActiveMowerConnection';

/**
 * The root (main) routes of the application.
 */
export type RootRoutes = {
  /**
   * The map screen.
   */
  Map: undefined;
  /**
   * The mower connections screen.
   */
  MowerConnections: undefined;
  /**
   * The settings screen.
   */
  Settings: undefined;
  /**
   * The image history screen.
   */
  ImageHistory: undefined;
};

/**
 * The routes inside the `MowerConnections` root route.
 */
export type MowerConnectionsRoutes = {
  /**
   * The screen showing the available mower connections.
   */
  MowerConnectionsList: undefined;
  /**
   * The screen showing details of a specific mower connection.
   */
  MowerConnectionDetails: {connection: MowerConnection | null};
};

/**
 * The routes inside the "Settings" root route.
 */
export type SettingsRoutes = {
  /**
   * The screen showing the available settings.
   */
  SettingsMain: undefined;
  /**
   * The screen is showing the available time durations.
   */
  SettingsTimeDuration: undefined;
  /**
   * The screen is showing the available languages.
   */
  SettingsLanguage: undefined;
};
