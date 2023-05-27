import React, {useState} from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput as ReactTextInput,
  View,
} from 'react-native';
import EyeIcon from '../../assets/icons/EyeIcon';
import EyeOffIcon from '../../assets/icons/EyeOffIcon';
import {INFO_ICON_SIZE} from '../mower-connections/MowerConnectionInfoButton';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import useStyles from '../../hooks/useStyles';
import spacing from '../../styles/spacing';

/**
 * The props for <TextInput />.
 */
interface TextInputProps {
  /**
   * The value displayed in the field.
   */
  value: string;
  /**
   * Called when the input value changes.
   *
   * @param value string the new value.
   */
  onChange: (value: string) => void;
  /**
   * Optional placeholder to show in the field.
   */
  placeholder?: string;
  /**
   * Whether the field should be readonly (e.g. not editable or focusable).
   *
   * @default false
   */
  readonly?: boolean;
  /**
   * Whether the field should be treated as a password field, with a character mask for the input
   * and a show/hide button to show the value in clear text.
   *
   * @default false
   */
  passwordField?: boolean;
}

/**
 * A text input field that can also mask password values.
 *
 * Also see <ClearInputFocusOnPress /> for a handler to automatically loose focus if e.g. the page background is pressed.
 */
function TextInput({
  value,
  onChange,
  placeholder,
  readonly = false,
  passwordField = false,
}: TextInputProps): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const isInDarkMode = useIsInDarkMode();
  const styles = useStyles();

  return (
    <View style={[styles.border, componentStyles.container]}>
      <ReactTextInput
        secureTextEntry={passwordField && !passwordVisible}
        style={[componentStyles.label, styles.textNormal]}
        placeholder={placeholder}
        placeholderTextColor={styles.textInputPlaceholder.color}
        value={value}
        onChangeText={onChange}
        editable={!readonly}
        focusable={!readonly}
        clearButtonMode="always"
      />
      {passwordField && (
        <Pressable
          onPress={() => setPasswordVisible(prevState => !prevState)}
          testID="showHidePasswordButton"
          style={componentStyles.button}>
          {passwordVisible ? (
            <EyeOffIcon darkModeInverted={isInDarkMode} size={INFO_ICON_SIZE} />
          ) : (
            <EyeIcon darkModeInverted={isInDarkMode} size={INFO_ICON_SIZE} />
          )}
        </Pressable>
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
  },
  button: {
    justifyContent: 'center',
    padding: spacing.sm,
    textAlign: 'center',
  },
});

export default TextInput;
