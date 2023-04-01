import {Platform} from 'react-native';
import {hasNotch} from 'rn-iphone-helper';

export const MARGIN_TOP_DEVICE =
  Platform.OS === 'android' ? 20 : hasNotch() ? 40 : 30;
