import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import useStyles from '../../hooks/useStyles';
import useApiService, {NO_TOKEN} from '../../hooks/useApiService';
import useCurrentUser from '../../hooks/useCurrentUser';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import spacing from '../../styles/spacing';
import MowEIcon from '../../assets/icons/MowEIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {LoginRoutes} from '../navigation';
import {useTranslation} from 'react-i18next';
import useIsInDarkMode from '../../hooks/useIsInDarkMode';
import colors from '../../styles/colors';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import ClearInputFocusOnPress from '../../components/common/ClearInputFocusOnPress';

/**
 * The page for user login.
 */
function LoginMainPage({
  navigation,
}: StackScreenProps<LoginRoutes, 'LoginMain'>): JSX.Element {
  const {setCurrentUser} = useCurrentUser();
  const styles = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  const {login} = useApiService();
  const {t} = useTranslation();
  const isInDarkMode = useIsInDarkMode();

  const isFormFilled = username.length > 0 && password.length > 0;

  const handleLogin = useCallback(async () => {
    if (!isFormFilled) {
      return;
    }

    setLoggingIn(true);

    const token = await login(username, password);

    if (token !== NO_TOKEN) {
      setCurrentUser({authorizationToken: token});
    }

    setLoggingIn(false);
  }, [login, username, password, setCurrentUser, isFormFilled]);

  return (
    <>
      <LoadingOverlay
        text={t('routes.login.loginMain.loggingInLabel')!}
        visible={loggingIn}
      />
      <ClearInputFocusOnPress
        style={[styles.flexColumn, componentStyles.pageContainer]}>
        <Text
          style={[
            componentStyles.welcomeText,
            isInDarkMode
              ? componentStyles.welcomeTextDarkMode
              : componentStyles.welcomeTextLightMode,
          ]}>
          {t('routes.login.loginMain.welcomeText')}
        </Text>
        <SectionWithHeading
          heading={t('routes.login.loginMain.usernameHeading')!}>
          <TextInput
            placeholder={t('routes.login.loginMain.usernamePlaceholder')!}
            value={username}
            onChange={text => setUsername(text)}
          />
        </SectionWithHeading>
        <SectionWithHeading
          heading={t('routes.login.loginMain.passwordHeading')!}>
          <TextInput
            placeholder={t('routes.login.loginMain.passwordPlaceholder')!}
            passwordField
            value={password}
            onChange={text => setPassword(text)}
          />
        </SectionWithHeading>
        <View style={componentStyles.loginButton}>
          <Button
            label={t('routes.login.loginMain.loginButtonLabel')!}
            onPress={handleLogin}
            color={isFormFilled ? 'secondary' : 'default'}
          />
        </View>
        <View style={componentStyles.footer}>
          <View style={componentStyles.mowEIcon}>
            <MowEIcon size={225} colored darkModeInverted={isInDarkMode} />
          </View>
          <Button
            label={t('routes.login.loginMain.registrationLinkText')!}
            onPress={() => navigation.navigate('LoginRegister')}
            color="secondary"
            fullWidth
          />
        </View>
      </ClearInputFocusOnPress>
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
  loginButton: {alignSelf: 'flex-end'},
  mowEIcon: {alignSelf: 'center'},
  footer: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    marginBottom: spacing.l,
    width: '100%',
  },
});

export default LoginMainPage;
