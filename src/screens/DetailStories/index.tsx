import {Button} from '@src/components/Button';
import {Container} from '@src/components/Container';
import {ItemContainer} from '@src/components/ItemContainer';
import {TextStories} from '@src/components/TextStories/index';
import {COLORS} from '@src/config/theme/colors';
import {RootRouteScreenProps, ScreensName} from '@src/routes/types';
import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Rating} from 'react-native-ratings';

const Item = ({
  content,
  label,
  color,
}: {
  content?: string;
  label?: string;
  color?: keyof typeof COLORS;
}) => {
  return (
    <View>
      <TextStories margin={[6, 0]} color="GRAY">
        {`${label}: `}
        <TextStories fontWeight="500" color={color}>
          {content}
        </TextStories>
      </TextStories>
    </View>
  );
};
const DetailStoriesScreen: React.FC<
  RootRouteScreenProps<ScreensName.DetailStoriesScreen>
> = ({navigation}) => {
  const onPressBack = () => {
    navigation.goBack();
  };

  const onFinishRating = () => {};

  return (
    <Container flex={1} background="WHITE">
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <ItemContainer style={styles.align}>
          <FastImage
            source={{
              uri: 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80',
            }}
            style={styles.image}
          />
          <TextStories fontSize={24} lineHeight={28} margin={[16, 0, 0, 0]}>
            Cuoc song
          </TextStories>
        </ItemContainer>
        <ItemContainer>
          {array.map((item, index) => (
            <Item
              key={`item${index}`}
              label={item?.label}
              content={item?.content}
              color={[0, 1].includes(index) ? 'PRIMARY' : 'BLACK'}
            />
          ))}
        </ItemContainer>
        <ItemContainer>
          <TextStories color="GRAY" margin={[0, 0, 10, 30]} fontSize={12}>
            Nhấn vào ngôi sao để chọn
          </TextStories>
          <View style={styles.row}>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={25}
              ratingBackgroundColor="#1291D2"
              ratingColor="#1291D2"
              onFinishRating={onFinishRating}
            />
            <Button label="Gửi" width={100} height={30} />
          </View>
        </ItemContainer>
        <Button label="Đọc truyện" type="transparent" />
        <ItemContainer>
          <View style={styles.viewComment}>
            <TextStories fontWeight="500">Các chương mới nhất</TextStories>
            <Pressable>
              <TextStories fontSize={12} color="PRIMARY" fontWeight="500">
                xem tất cả
              </TextStories>
            </Pressable>
          </View>
          {[1, 2, 3, 4, 5].map((item, index) => (
            <TouchableOpacity key={`chaps${index}`} style={styles.theChap}>
              <TextStories color="GRAY">{`Chuơng ${index + 1}: Phiên ngoại ${
                index + 2
              }`}</TextStories>
            </TouchableOpacity>
          ))}
        </ItemContainer>
        <ItemContainer style={styles.viewComment}>
          <TextStories fontWeight="500">Các bình luận</TextStories>
          <Pressable>
            <TextStories fontSize={12} color="PRIMARY" fontWeight="500">
              xem tất cả
            </TextStories>
          </Pressable>
        </ItemContainer>
        <Pressable onPress={onPressBack}>
          <ItemContainer style={[styles.align, styles.btnBack]}>
            <TextStories fontSize={12} color="PRIMARY" fontWeight="500">
              Quay lại
            </TextStories>
          </ItemContainer>
        </Pressable>
      </ScrollView>
    </Container>
  );
};

export {DetailStoriesScreen};

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  align: {
    alignItems: 'center',
  },
  scroll: {
    paddingHorizontal: 12,
  },
  viewComment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnBack: {
    marginHorizontal: '20%',
  },
  theChap: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

const array = [
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Tác giả',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Thể loại',
  },
  {
    content: '29',
    label: 'Chương',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Trạng thái',
  },
  {
    content: '6',
    label: 'Đọc',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Đề cử',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Đánh giá',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Đăng',
  },
  {
    content: 'Lạc Lạc Tà Thiên',
    label: 'Cập nhật',
  },
];
