import React from 'react';
import useApiService, {NO_TOKEN} from '../../src/hooks/useApiService';
import {render} from '@testing-library/react-native';
import {ErrorStateContext} from '../../src/hooks/useErrorState';
import {mockFetch} from '../../jest/utils';
import MowerHistoryEvent from '../../src/models/MowerHistoryEvent';
import CurrentUser from '../../src/models/CurrentUser';
import {CurrentUserContext} from '../../src/hooks/useCurrentUser';
import MowerHistoryEventMowerState from '../../src/models/MowerHistoryEventMowerState';

async function renderWithLogin(): Promise<{
  loginResult: string | null;
  errorState: string | null;
}> {
  let loginResult: string | null = null;
  let errorState: string | null = null;

  return new Promise(resolve => {
    const TestComponent = () => {
      const apiService = useApiService();
      apiService.login('foo', 'bar').then(value => {
        loginResult = value;
        resolve({loginResult, errorState});
      });
      return <></>;
    };

    render(
      <ErrorStateContext.Provider
        value={{
          errorState,
          setErrorState: newState => {
            errorState = newState;
          },
        }}>
        <TestComponent />
      </ErrorStateContext.Provider>,
    );
  });
}

async function renderWithRegistration(): Promise<{
  registerResult: string | null;
  errorState: string | null;
}> {
  let registerResult: string | null = null;
  let errorState: string | null = null;

  return new Promise(resolve => {
    const TestComponent = () => {
      const apiService = useApiService();
      apiService.register('foo', 'bar').then(value => {
        registerResult = value;
        resolve({registerResult, errorState});
      });
      return <></>;
    };

    render(
      <ErrorStateContext.Provider
        value={{
          errorState,
          setErrorState: newState => {
            errorState = newState;
          },
        }}>
        <TestComponent />
      </ErrorStateContext.Provider>,
    );
  });
}

async function renderWithGetMowerHistory(
  currentUser: CurrentUser | null = null,
): Promise<{
  mowerHistoryResult: MowerHistoryEvent[];
  errorState: string | null;
}> {
  let mowerHistoryResult: MowerHistoryEvent[] = [];
  let errorState: string | null = null;

  return new Promise(resolve => {
    const TestComponent = () => {
      const apiService = useApiService();
      apiService.getMowerHistory().then(value => {
        mowerHistoryResult = value;
        resolve({mowerHistoryResult, errorState});
      });
      return <></>;
    };

    render(
      <CurrentUserContext.Provider
        value={{currentUser, setCurrentUser: () => {}}}>
        <ErrorStateContext.Provider
          value={{
            errorState,
            setErrorState: newState => {
              errorState = newState;
            },
          }}>
          <TestComponent />
        </ErrorStateContext.Provider>
      </CurrentUserContext.Provider>,
    );
  });
}

function createEvent(
  customEventDetails: Partial<MowerHistoryEvent>,
): MowerHistoryEvent {
  return {
    imageId: null,
    extra: '',
    mowerId: 'foo',
    sessionId: 42,
    source: 'api',
    state: MowerHistoryEventMowerState.Working,
    time: 42,
    x: 0,
    y: 0,
    z: 0,
    ...customEventDetails,
  };
}

describe('useApiService', () => {
  it('performs login with valid credentials', async () => {
    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve({status: 'successful', token: 'token'}),
      }),
    );

    const {loginResult, errorState} = await renderWithLogin();

    expect(loginResult).toBe('token');
    expect(errorState).toBeNull();
  });

  it('throws error at login with invalid credentials', async () => {
    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve({status: 'error', message: 'Unauthorized'}),
      }),
    );

    const {loginResult, errorState} = await renderWithLogin();

    expect(loginResult).toBe(NO_TOKEN);
    expect(errorState).toContain('Unauthorized');
  });

  it('throws error at login if fetch has error', async () => {
    mockFetch(() => {
      throw new Error('foo is the error here');
    });

    const {loginResult, errorState} = await renderWithLogin();

    expect(loginResult).toBe(NO_TOKEN);
    expect(errorState).toContain('foo is the error here');
  });

  it('performs registration with valid credentials', async () => {
    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve({status: 'successful', token: 'token'}),
      }),
    );

    const {registerResult, errorState} = await renderWithRegistration();

    expect(registerResult).toBe('token');
    expect(errorState).toBeNull();
  });

  it('throws error at registration with invalid credentials', async () => {
    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve({status: 'error', reason: 'Unauthorized'}),
      }),
    );

    const {registerResult, errorState} = await renderWithRegistration();

    expect(registerResult).toBe(NO_TOKEN);
    expect(errorState).toContain('Unauthorized');
  });

  it('throws error at registration if fetch has error', async () => {
    mockFetch(() => {
      throw new Error('foo is the error here');
    });

    const {registerResult, errorState} = await renderWithRegistration();

    expect(registerResult).toBe(NO_TOKEN);
    expect(errorState).toContain('foo is the error here');
  });

  it('gets mower history when logged in', async () => {
    const events: MowerHistoryEvent[] = [
      createEvent({}),
      createEvent({}),
      createEvent({}),
      createEvent({}),
    ];

    mockFetch(() =>
      Promise.resolve({
        json: () => Promise.resolve(events),
      }),
    );

    const {mowerHistoryResult, errorState} = await renderWithGetMowerHistory({
      authorizationToken: 'token',
    });

    expect(errorState).toBeNull();
    expect(mowerHistoryResult).toHaveLength(events.length);
    expect(mowerHistoryResult).toStrictEqual(events);
  });
});
