import {COLORS} from '@src/config/theme/colors';
import {normalizeOptions, Spacing} from '@src/config/theme/utils';
import React from 'react';
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';

interface ContainerProps extends ViewProps, TouchableOpacityProps {
  children?: React.ReactNode;
  style?: StyleProp<any>;
  margin?: Spacing;
  padding?: Spacing;
  background?: keyof typeof COLORS;
  flex?: number;
  activePress?: boolean;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  width?: number;
  height?: number;
  borderRadius?: number;
}
export const Container: React.FC<ContainerProps> = ({
  children,
  style,
  margin,
  padding,
  background,
  flex,
  align,
  width,
  height,
  alignSelf,
  flexDirection,
  justify,
  activePress,
  borderRadius,
  onPress,
  ...props
}) => {
  const marginOption = normalizeOptions(margin || 0);
  const paddingOption = normalizeOptions(padding || 0);
  // const hitSlopOption = normalizeOptions(hitSlop);
  const _margin = ([top, right, bottom, left]: [
    number,
    number,
    number,
    number,
  ]): ViewStyle => {
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
  ]): ViewStyle => {
    return {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    };
  };

  const _styles = {
    ..._margin(marginOption),
    ..._padding(paddingOption),
    backgroundColor: background && COLORS[background],
    flex: flex,
    alignSelf: alignSelf,
    flexDirection: flexDirection,
    alignItems: align,
    justifyContent: justify,
    width,
    height,
    borderRadius: borderRadius,
  };

  if (activePress) {
    return (
      <TouchableOpacity
        {...props}
        onPress={onPress}
        // hitSlop={hitSlopStyle}
        style={StyleSheet.flatten([_styles, style])}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View {...props} style={StyleSheet.flatten([_styles, style])}>
      {children}
    </View>
  );
};
