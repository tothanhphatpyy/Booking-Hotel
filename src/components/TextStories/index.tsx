import {COLORS} from '@src/config/theme/colors';
import {normalizeOptions, Spacing} from '@src/config/theme/utils';
import React, {ReactNode} from 'react';
import {StyleSheet, Text, TextProps, TextStyle, ViewStyle} from 'react-native';

type TextAlign = 'auto' | 'left' | 'right' | 'center' | 'justify';

interface TextStoriesProps extends TextProps {
  color?: keyof typeof COLORS;
  fontSize?: number;
  lineHeight?: number;
  textAlign?: TextAlign;
  margin?: Spacing;
  padding?: Spacing;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  children?: ReactNode;
}

export const TextStories: React.FC<TextStoriesProps> = ({
  textAlign,
  lineHeight,
  margin = 0,
  padding = 0,
  color = 'BLACK',
  fontWeight,
  children,
  fontSize = 14,
  ...props
}) => {
  const marginOption = normalizeOptions(margin);
  const paddingOption = normalizeOptions(padding);
  const _margin = ([top, right, bottom, left]: [
    number,
    number,
    number,
    number,
  ]): ViewStyle | TextStyle => {
    return {
      marginTop: top,
      marginBottom: bottom,
      marginLeft: left,
      marginRight: right,
    };
  };
  const _padding = ([top, right, bottom, left]: [
    number,
    number,
    number,
    number,
  ]): ViewStyle | TextStyle => {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
      fontSize: fontSize,
    };
  };
  const _styles = {
    ..._margin(marginOption),
    ..._padding(paddingOption),
    textAlign: textAlign,
    lineHeight: lineHeight,
    color: COLORS[color],
    fontWeight: fontWeight,
  };

  return (
    <Text
      style={StyleSheet.flatten([styles.default, _styles, props.style])}
      {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    color: COLORS.BLACK,
  },
});
