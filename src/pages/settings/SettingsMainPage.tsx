import React from 'react';
import {Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import useStyles from '../../hooks/useStyles';
import SectionWithHeading from '../../components/common/SectionWithHeading';
import {SettingsRoutes} from '../navigation';
import spacing from '../../styles/spacing';
import SubpageNavigationButton from '../../components/common/SubpageNavigationButton';
import ModeSelect from '../../components/common/ModeSelect';
import LightModeIcon from '../../assets/icons/LightModeIcon';
import AutomaticLightDarkModeIcon from '../../assets/icons/AutomaticLightDarkModeIcon';
import DarkModeIcon from '../../assets/icons/DarkModeIcon';
import useShowablePathTimeDuration, {
  ShowablePathTimeDuration,
} from '../../hooks/useShowablePathTimeDuration';
import useAppColorMode from '../../hooks/useAppColorMode';

function SettingsMainPage({
  navigation,
}: StackScreenProps<SettingsRoutes, 'SettingsMain'>): JSX.Element {
  const {appColorMode, setAppColorMode} = useAppColorMode();
  const {t, i18n} = useTranslation();
  const styles = useStyles();
  const {timeDuration} = useShowablePathTimeDuration();

  let currentTimeDuration = '';
  switch (timeDuration) {
    case ShowablePathTimeDuration.h24:
      currentTimeDuration = t(
        'routes.settings.settingsTimeDurationDetails.last24Hours',
      )!;
      break;
    case ShowablePathTimeDuration.h12:
      currentTimeDuration = t(
        'routes.settings.settingsTimeDurationDetails.last12Hours',
      )!;
      break;
    case ShowablePathTimeDuration.h3:
      currentTimeDuration = t(
        'routes.settings.settingsTimeDurationDetails.last3Hours',
      )!;
      break;
  }

  let currentLanguage = '';
  switch (i18n.language) {
    case 'en':
      currentLanguage = t('routes.settings.settingsLanguageDetails.en')!;
      break;
    case 'de':
      currentLanguage = t('routes.settings.settingsLanguageDetails.de')!;
      break;
    case 'sv':
      currentLanguage = t('routes.settings.settingsLanguageDetails.sv')!;
      break;
  }

  return (
    <View
      style={[
        styles.flexColumn,
        {
          marginTop: spacing.xxl,
          marginHorizontal: spacing.l,
          gap: spacing.xl,
        },
      ]}>
      <SectionWithHeading
        heading={t('routes.settings.settingsTimeDuration.heading')!}>
        <View style={styles.border}>
          <SubpageNavigationButton
            item={<Text style={styles.textNormal}>{currentTimeDuration}</Text>}
            onSelectItem={() => navigation.navigate('SettingsTimeDuration')}
          />
        </View>
      </SectionWithHeading>
      <SectionWithHeading
        heading={t('routes.settings.settingsLanguage.heading')!}>
        <View style={styles.border}>
          <SubpageNavigationButton
            item={<Text style={styles.textNormal}>{currentLanguage}</Text>}
            onSelectItem={() => navigation.navigate('SettingsLanguage')}
          />
        </View>
      </SectionWithHeading>
      <SectionWithHeading heading={t('routes.settings.settingsMain.appMode')!}>
        <ModeSelect
          activeMode={appColorMode}
          setActiveMode={setAppColorMode}
          modes={[
            {name: 'light', display: <LightModeIcon />},
            {
              name: 'auto',
              display: <AutomaticLightDarkModeIcon />,
            },
            {name: 'dark', display: <DarkModeIcon />},
          ]}
        />
      </SectionWithHeading>
    </View>
  );
}

export default SettingsMainPage;
