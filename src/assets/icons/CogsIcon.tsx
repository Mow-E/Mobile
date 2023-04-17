import * as React from 'react';
import Svg, {SvgProps, G, Path, Circle} from 'react-native-svg';
import {ColorValue} from 'react-native';
import IconProps from './IconProps';
import colors from '../../styles/colors';

/**
 * The (extended) properties for the cogs icon.
 */
type SvgComponentProps = Omit<SvgProps, 'fill'> & {
  /**
   * The primary color of the large cog, used for its outer part.
   */
  largeCogOuterColor: ColorValue;
  /**
   * The secondary color of the large cog, used for its inner part.
   */
  largeCogInnerColor: ColorValue;
  /**
   * The primary color of the small cog, used for its outer part.
   */
  smallCogOuterColor: ColorValue;
  /**
   * The secondary color of the small cog, used for its inner part.
   */
  smallCogInnerColor: ColorValue;
};

const SvgComponent = (props: SvgComponentProps) => (
  <Svg
    width={24}
    height={24}
    viewBox="0 0 93.189667 77.828133"
    fill="none"
    {...props}>
    <G transform="translate(-10.054149,3.8823558)">
      <Path
        d="m 73.9453,41.8314 c 0.0224,4.2392 -0.7992,8.4404 -2.4168,12.3588 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="M 10.0574,42.4559 C 9.9965,38.1869 10.7919,33.949 12.3966,29.9926 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 41.5173,10.0579 c 4.2417,-0.06413 8.4536,0.7172 12.3901,2.2984 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 64.7984,64.3778 c -2.9808,3.0368 -6.5382,5.4474 -10.4634,7.0905 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="M 42.4911,73.942 C 38.2364,74.0074 34.0115,73.2221 30.0644,71.6323 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 19.1765,19.6477 c 2.9509,-3.0131 6.4692,-5.4121 10.3519,-7.0585 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="M 19.753,64.926 C 16.699,61.9625 14.268,58.4188 12.6025,54.5028 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 64.2213,19.049 c 3.037,2.9405 5.4602,6.4544 7.1292,10.3383 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 66.8511,52.1248 c -1.3189,3.2373 -3.2576,6.1856 -5.7071,8.6794 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 17.0638,32.0866 c 1.4802,-3.7235 3.7756,-7.0682 6.7175,-9.7886 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="M 32.0175,66.9085 C 28.7728,65.6082 25.8134,63.6864 23.3056,61.2512 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 51.9545,17.0802 c 3.2462,1.2967 6.2078,3.2152 8.7182,5.6476 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 52.5127,66.6895 c -3.2162,1.3695 -6.6689,2.0973 -10.1642,2.1427 L 42,42 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 31.4596,17.3222 c 3.2147,-1.373 6.6666,-2.1047 10.1618,-2.1541 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="M 17.371,52.6537 C 15.9551,49.3804 15.2058,45.8576 15.1671,42.2913 L 42,41.9999 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Path
        d="m 66.617,31.3187 c 1.4486,3.3385 2.203,6.9368 2.2173,10.576 L 42,42.0001 Z"
        fill={props.largeCogOuterColor}
        stroke={props.largeCogOuterColor}
      />
      <Circle
        cx={42}
        cy={42}
        r={19.1675}
        fill={props.largeCogInnerColor}
        stroke={props.largeCogInnerColor}
      />
    </G>
    <G transform="translate(-67.398892,-32.326699)">
      <Path
        d="m 160.58824,55.403007 c 0.0162,3.0784 -0.5804,6.1293 -1.7551,8.9748 l -21.4433,-8.8524 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 114.19346,55.856407 c -0.0443,-3.1001 0.53336,-6.1776 1.6987,-9.0507 l 21.49768,8.7196 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 137.03934,32.329347 c 3.0802,-0.04654 6.1389,0.52087 8.9975,1.66913 l -8.647,21.52693 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 153.94584,71.776007 c -2.1646,2.2052 -4.748,3.9558 -7.5984,5.149 l -8.9576,-21.3996 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 137.74644,78.721407 c -3.0897,0.0475 -6.1578,-0.5228 -9.0241,-1.6773 l 8.6675,-21.5187 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 120.81564,39.293407 c 2.1429,-2.1881 4.6978,-3.9302 7.5174,-5.12584 l 9.0568,21.35774 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 121.23424,72.174107 c -2.2177,-2.1521 -3.9831,-4.7255 -5.19257,-7.5693 l 21.34817,-9.0794 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 153.52674,38.858607 c 2.2054,2.1353 3.9652,4.6872 5.1772,7.5076 l -21.3141,9.1592 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 155.43644,62.877907 c -0.9578,2.3508 -2.3656,4.4919 -4.1444,6.3029 l -13.9022,-13.6554 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 119.28144,48.326407 c 1.0749,-2.704 2.7418,-5.1329 4.8782,-7.1084 l 13.2302,14.3073 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 130.14064,73.613807 c -2.3563,-0.9443 -4.5054,-2.3399 -6.3265,-4.1083 l 13.5757,-13.9801 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 144.61874,37.428907 c 2.3573,0.9417 4.508,2.3349 6.3311,4.1012 l -13.56,13.9953 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 145.02404,73.454707 c -2.3355,0.9945 -4.8429,1.523 -7.3811,1.556 l -0.2531,-19.4853 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 129.73554,37.604607 c 2.3344,-0.9971 4.8412,-1.5285 7.3794,-1.5643 l 0.2749,19.485 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 119.50454,63.262007 c -1.0283,-2.3771 -1.5724,-4.9353 -1.6005,-7.5251 l 19.4858,-0.2116 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Path
        d="m 155.26644,47.768707 c 1.052,2.4244 1.5998,5.0374 1.6102,7.6802 l -19.4868,0.0765 z"
        fill={props.smallCogOuterColor}
        stroke={props.smallCogOuterColor}
      />
      <Circle
        cx={137.38985}
        cy={55.525406}
        r={13.9192}
        fill={props.smallCogInnerColor}
        stroke={props.smallCogInnerColor}
      />
    </G>
  </Svg>
);

/**
 * An icon that shows some cogs.
 * Used as the main icon for the settings section(s).
 */
function CogsIcon({
  size = 24,
  colored = false,
  darkModeInverted = false,
}: IconProps): JSX.Element {
  const strokeColor = darkModeInverted
    ? colors.gray['300']
    : colors.gray['950'];

  const largeCogOuterColoredFillColor = darkModeInverted
    ? colors.secondary.light
    : colors.secondary.dark;
  const largeCogOuterGrayscaleFillColor = darkModeInverted
    ? colors.gray['300']
    : colors.gray['700'];
  const largeCogOuterFillColor = colored
    ? largeCogOuterColoredFillColor
    : largeCogOuterGrayscaleFillColor;

  const largeCogInnerColoredFillColor = darkModeInverted
    ? colors.secondary.dark
    : colors.secondary.light;
  const largeCogInnerGrayscaleFillColor = darkModeInverted
    ? colors.gray['400']
    : colors.gray['300'];
  const largeCogInnerFillColor = colored
    ? largeCogInnerColoredFillColor
    : largeCogInnerGrayscaleFillColor;

  const smallCogOuterColoredFillColor = darkModeInverted
    ? colors.primary.light
    : colors.primary.dark;
  const smallCogOuterGrayscaleFillColor = darkModeInverted
    ? colors.gray['50']
    : colors.gray['400'];
  const smallCogOuterFillColor = colored
    ? smallCogOuterColoredFillColor
    : smallCogOuterGrayscaleFillColor;

  const smallCogInnerColoredFillColor = darkModeInverted
    ? colors.primary.dark
    : colors.primary.light;
  const smallCogInnerGrayscaleFillColor = darkModeInverted
    ? colors.gray['500']
    : colors.gray['300'];
  const smallCogInnerFillColor = colored
    ? smallCogInnerColoredFillColor
    : smallCogInnerGrayscaleFillColor;

  return (
    <SvgComponent
      height={size}
      width={size}
      stroke={strokeColor}
      largeCogOuterColor={largeCogOuterFillColor}
      largeCogInnerColor={largeCogInnerFillColor}
      smallCogOuterColor={smallCogOuterFillColor}
      smallCogInnerColor={smallCogInnerFillColor}
    />
  );
}

export default CogsIcon;
