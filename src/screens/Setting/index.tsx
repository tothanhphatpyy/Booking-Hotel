import {Container} from '@src/components/Container';
import {IconSvg} from '@src/components/IconSvg';
import {ItemContainer} from '@src/components/ItemContainer/index';
import {TextStories} from '@src/components/TextStories/index';
import {ScreensName, SettingRouteScreenProps} from '@src/routes/types';
import {MARGIN_TOP_DEVICE} from '@src/ultis/constants';
import React from 'react';
import {Image, ScrollView, StyleSheet} from 'react-native';

const SettingScreen: React.FC<
  SettingRouteScreenProps<ScreensName.SettingScreen>
> = () => {
  return (
    <Container flex={1} padding={[0, 16]} background="WHITE">
      <ScrollView bounces={false}>
        <ItemContainer style={styles.header}>
          <Image
            style={styles.image}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/2232/2232688.png',
            }}
          />
          <TextStories fontSize={20} margin={[20, 0, 0, 0]}>
            Truyện ABC
          </TextStories>
        </ItemContainer>
        {menuSetting.map(item => (
          <Container
            flexDirection="row"
            align="center"
            activePress
            key={`setting${item?.key}`}
            background="BG_100"
            margin={[10, 0]}
            borderRadius={8}
            padding={10}>
            <IconSvg name="upload" size={20} />
            <TextStories margin={[0, 0, 0, 10]}>{item?.name}</TextStories>
          </Container>
        ))}
      </ScrollView>
    </Container>
  );
};

export {SettingScreen};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
  },
  header: {
    alignItems: 'center',
    padding: 26,
    marginTop: MARGIN_TOP_DEVICE,
  },
});

const menuSetting = [
  {
    name: 'Thông tin',
    key: 1,
  },
  {
    name: 'Hướng dẫn sử dung',
    key: 2,
  },
  {
    name: 'Đánh giá ứng dụng',
    key: 3,
  },
  {
    name: 'Gửi email yêu cầu trợ giúp',
    key: 4,
  },
  {
    name: 'Điều khoản sử dụng và vấn đề bản quyền',
    key: 5,
  },
];
