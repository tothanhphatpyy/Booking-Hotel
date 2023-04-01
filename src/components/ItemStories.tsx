import i18n from '@src/ultis/i18n';
import React, {FunctionComponent} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import dayjs from 'dayjs';
import {COLORS} from '@src/config/theme/colors';
import {TextStories} from './TextStories/index';

interface ItemStoriesProps {
  label?: string;
  category?: string;
  date?: string;
  chapterNumber?: number;
  image?: string;
  type?: 'full' | 'coming_out';
  onPress?: () => void;
}

export const ItemStories: FunctionComponent<ItemStoriesProps> = ({
  image,
  label,
  category,
  chapterNumber = 0,
  type,
  date = new Date(),
  onPress,
}) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage
        source={{
          uri: image,
        }}
        style={styles.image}
      />
      <View>
        <TextStories style={styles.label}>{label}</TextStories>
        <TextStories style={styles.text}>{category}</TextStories>
        <TextStories style={styles.text}>
          {`${chapterNumber} ${i18n.t('chapter')} -  ${
            type === 'full' ? i18n.t('full') : i18n.t('coming_out')
          }`}
        </TextStories>
        <TextStories style={styles.text}>
          {dayjs(date).format('HH:mm DD-MM-YYYY')}
        </TextStories>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: COLORS.PRIMARY_600,
    borderRadius: 7,
    marginVertical: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
  },
  label: {
    fontSize: 20,
    lineHeight: 24,
  },
  text: {
    fontSize: 12,
    color: COLORS.GRAY,
  },
});
