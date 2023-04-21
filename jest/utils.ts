import * as useIsInDarkMode from '../src/hooks/useIsInDarkMode';

export function setToDarkMode(): void {
  jest.spyOn(useIsInDarkMode, 'default').mockImplementation(() => true);
}
