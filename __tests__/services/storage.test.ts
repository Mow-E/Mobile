import AsyncStorage from '@react-native-async-storage/async-storage';
import {get, store} from '../../src/services/storage';

describe('storage', () => {
  it('stores string data', async () => {
    let storedKey: string | null = null;
    let storedItem: any | null = null;
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockImplementation(async (key: string, value: any) => {
        storedKey = key;
        storedItem = value;
      });

    await store('foo', 'bar');

    expect(storedKey).toBe('foo');
    expect(storedItem).toBe('bar');
  });

  it('stores object data', async () => {
    let storedKey: string | null = null;
    let storedItem: any | null = null;
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockImplementation(async (key: string, value: any) => {
        storedKey = key;
        storedItem = value;
      });

    await store('foo', {bar: 'baz'});

    expect(storedKey).toBe('foo');
    expect(storedItem).toBe(JSON.stringify({bar: 'baz'}));
  });

  it('gets string data', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(async () => 'bar');
    expect(await get('foo', null, true)).toBe('bar');
  });

  it('gets object data', async () => {
    jest
      .spyOn(AsyncStorage, 'getItem')
      .mockImplementation(async () => JSON.stringify({bar: 'baz'}));
    expect(await get('foo', null, false)).toStrictEqual({bar: 'baz'});
  });

  it('gets default value if no data is stored for key', async () => {
    jest.spyOn(AsyncStorage, 'getItem').mockImplementation(async () => null);
    expect(await get('foo', 'bar')).toStrictEqual('bar');
  });
});
