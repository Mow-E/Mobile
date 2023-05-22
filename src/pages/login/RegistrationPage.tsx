import React, {useCallback, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import useStyles from '../../hooks/useStyles';
import useApiService, {NO_TOKEN} from '../../hooks/useApiService';
import useCurrentUser from '../../hooks/useCurrentUser';
import spacing from '../../styles/spacing';
import colors from '../../styles/colors';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
import MowEIcon from '../../assets/icons/MowEIcon';
import {useTranslation} from 'react-i18next';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import LoadingOverlay from '../../components/common/LoadingOverlay';

/**
 * The page for user registration.
 */
function RegistrationPage(): JSX.Element {
  const {setCurrentUser} = useCurrentUser();
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmedPassword] = useState('');
  const [registering, setRegistering] = useState<boolean>(false);
  const {register} = useApiService();
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();

  const isFormFilled =
    username.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const handleRegistration = useCallback(async () => {
    if (isFormFilled) {
      setRegistering(true);

      const token = await register(username, password);

      if (token !== NO_TOKEN) {
        setCurrentUser({authorizationToken: token});
      }

      setRegistering(false);
    }
  }, [register, username, password, setCurrentUser, isFormFilled]);

  return (
    <>
      <LoadingOverlay
        text={t('routes.login.loginMain.loggingInLabel')!}
        visible={registering}
      />
      <View style={[styles.flexColumn, componentStyles.pageContainer]}>
        <Text
          style={[
            componentStyles.welcomeText,
            isInDarkMode
              ? componentStyles.welcomeTextDarkMode
              : componentStyles.welcomeTextLightMode,
          ]}>
          {t('routes.login.loginRegister.welcomeText')}
        </Text>
        <SectionWithHeading
          heading={t('routes.login.loginRegister.usernameHeading')!}>
          <TextInput
            placeholder={t('routes.login.loginRegister.usernamePlaceholder')!}
            value={username}
            onChange={text => setUsername(text)}
          />
        </SectionWithHeading>
        <SectionWithHeading
          heading={t('routes.login.loginRegister.passwordHeading')!}>
          <TextInput
            placeholder={t('routes.login.loginRegister.passwordPlaceholder')!}
            passwordField
            value={password}
            onChange={text => setPassword(text)}
          />
        </SectionWithHeading>
        <SectionWithHeading
          heading={t('routes.login.loginRegister.confirmPasswordHeading')!}>
          <TextInput
            placeholder={
              t('routes.login.loginRegister.confirmPasswordPlaceholder')!
            }
            passwordField
            value={confirmPassword}
            onChange={text => setConfirmedPassword(text)}
          />
        </SectionWithHeading>
        <View style={componentStyles.registerButton}>
          <Button
            label={t('routes.login.loginRegister.registerButtonLabel')!}
            onPress={handleRegistration}
            color={isFormFilled ? 'secondary' : 'default'}
          />
        </View>
        <View style={componentStyles.mowEIcon}>
          <MowEIcon size={225} colored darkModeInverted={isInDarkMode} />
        </View>
      </View>
    </>
  );
}

/**
 * The individual styles for this component.
 */
const componentStyles = StyleSheet.create({
  pageContainer: {
    marginTop: spacing.xxl,
    marginHorizontal: spacing.l,
    gap: spacing.l,
  },
  welcomeText: {textAlign: 'center', fontSize: 20},
  welcomeTextLightMode: {color: colors.gray['950']},
  welcomeTextDarkMode: {color: colors.gray['50']},
  registerButton: {alignSelf: 'flex-end'},
  mowEIcon: {position: 'absolute', bottom: 0, alignSelf: 'center'},
});

export default RegistrationPage;
