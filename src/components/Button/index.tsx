import React from 'react';
import {
  TouchableOpacityProps,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {TextStories} from '../TextStories/index';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '@src/config/theme/colors';

interface ButtonProps extends TouchableOpacityProps {
  label?: string | undefined;
  type?: 'gradient' | 'transparent';
  colors?: Array<string>;
  width?: number;
  height?: number;
  colorText?: keyof typeof COLORS;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  colors,
  label,
  height = 40,
  width = 150,
  colorText,
  ...props
}) => {
  const stylesOption = {
    height: height,
    width: width,
  };

  if (type === 'transparent') {
    return (
      <TouchableOpacity
        style={StyleSheet.flatten([
          styles.btnDefault,
          styles.transparent,
          stylesOption,
        ])}
        {...props}>
        <TextStories color={colorText || 'GRAY'}>{label}</TextStories>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([
        styles.btnDefault,
        styles.gradient,
        stylesOption,
      ])}
      {...props}>
      <LinearGradient
        colors={colors || ['#79D3F2', '#1291D2']}
        style={StyleSheet.flatten([
          styles.linearGradient,
          styles.btnDefault,
          {width: width},
        ])}>
        <TextStories color={colorText || 'WHITE'}>{label}</TextStories>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDefault: {
    alignSelf: 'center',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparent: {
    borderColor: COLORS.PRIMARY,
    borderWidth: 0.6,
  },
  gradient: {},
});
