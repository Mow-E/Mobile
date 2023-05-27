import React, {PropsWithChildren, useCallback} from 'react';
import {Pressable, TextInput, ViewProps} from 'react-native';

/**
 * A wrapping view that clears all text input focus on press.
 */
function ClearInputFocusOnPress({
  children,
  ...props
}: PropsWithChildren<ViewProps>): JSX.Element {
  const clearInputFocus = useCallback(() => {
    const currentlyFocusedInput = TextInput.State.currentlyFocusedInput();

    if (currentlyFocusedInput !== null) {
      TextInput.State.blurTextInput(currentlyFocusedInput);
    }
  }, []);

  return (
    <Pressable onPress={clearInputFocus} {...props}>
      {children}
    </Pressable>
  );
}

export default ClearInputFocusOnPress;
