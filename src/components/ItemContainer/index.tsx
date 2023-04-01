import {COLORS} from '@src/config/theme/colors';
import React from 'react';
import {View, StyleSheet, StyleProp} from 'react-native';

interface ItemContainerProps {
  children: React.ReactNode;
  style?: StyleProp<any>;
}

export const ItemContainer: React.FunctionComponent<ItemContainerProps> = ({
  children,
  style,
}) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.PRIMARY_600,
    borderRadius: 7,
    marginVertical: 5,
  },
});
