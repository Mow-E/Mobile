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

function SettingsMainPage({
  navigation,
}: StackScreenProps<SettingsRoutes, 'SettingsMain'>): JSX.Element {
  const {t} = useTranslation();
  const styles = useStyles();

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
            item={<Text style={styles.textNormal}>last 24 hours</Text>}
            onSelectItem={() => navigation.navigate('SettingsTimeDuration')}
          />
        </View>
      </SectionWithHeading>
      <SectionWithHeading
        heading={t('routes.settings.settingsLanguage.heading')!}>
        <View style={styles.border}>
          <SubpageNavigationButton
            item={<Text style={styles.textNormal}>English</Text>}
            onSelectItem={() => navigation.navigate('SettingsLanguage')}
          />
        </View>
      </SectionWithHeading>
      <SectionWithHeading heading={t('routes.settings.settingsMain.appMode')!}>
        <ModeSelect
          activeMode={'auto'}
          setActiveMode={() => {}}
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
