import {TextStories} from '@src/components/TextStories/index';
import {COLORS} from '@src/config/theme/colors';
import React from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const CategoryTab = () => {
  const renderItem = ({
    item,
  }: {
    item: {
      name: string;
      key: number;
    };
  }) => {
    return (
      <TouchableOpacity style={styles.viewItem}>
        <TextStories
          fontWeight="600"
          fontSize={16}
          margin={[0, 10]}
          textAlign="center">
          {item?.name}
        </TextStories>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlatList
        data={category}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{alignSelf: 'center'}}
        keyExtractor={item => `category${item?.key}`}
      />
    </View>
  );
};

export {CategoryTab};

const styles = StyleSheet.create({
  viewItem: {
    width: '47%',
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.BG_100,
    margin: 6,
    borderRadius: 7,
    justifyContent: 'center',
  },
});

const category = [
  {
    name: 'Truyện FULL',
    key: 1,
  },
  {
    name: 'Truyện Mới',
    key: 2,
  },
  {
    name: 'Truyện Mới Cập Nhật',
    key: 3,
  },
  {
    name: 'Truyện Đọc Nhiều',
    key: 4,
  },
  {
    name: 'Tiên Hiệp',
    key: 5,
  },
  {
    name: 'Kiếm Hiệp',
    key: 6,
  },
  {
    name: 'Ngôn Tình',
    key: 7,
  },
  {
    name: 'Đam Mỹ',
    key: 8,
  },
  {
    name: 'Quan Trường',
    key: 9,
  },
];
