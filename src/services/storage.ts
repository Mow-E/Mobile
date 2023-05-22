import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a given value for a key in the apps storage.
 *
 * @param key string the key to save the value under.
 * @param value any the value to save.
 */
export async function store(key: string, value: any) {
  const valueToStore =
    typeof value === 'string' ? value : JSON.stringify(value);

  await AsyncStorage.setItem(key, valueToStore);
  console.debug(`'[storage] stored value ${value} for key ${key}`);
}

/**
 * Retrieves a stored value from the apps storage.
 *
 * @param key string the key the value is saved under.
 * @param defaultValue any the default value to use if no value is stored.
 * @param isStringValue boolean whether the retrieved value should be interpreted as a string value directly.
 *
 * @return Promise<any> the retrieved value.
 */
export async function get(
  key: string,
  defaultValue: any = null,
  isStringValue: boolean = false,
): Promise<any> {
  const value = await AsyncStorage.getItem(key);
  console.debug(`'[storage] read value ${value} for key ${key}`);

  if (value === null) {
    return defaultValue;
  }

  return isStringValue ? value : JSON.parse(value);
}
