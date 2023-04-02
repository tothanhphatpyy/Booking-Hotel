import {Container} from '@src/components/Container';
import FastImage from 'react-native-fast-image';
import {TextStories} from '@src/components/TextStories';
import {BookshelfRouteScreenProps, ScreensName} from '@src/routes/types';
import React from 'react';
import {useRequest} from 'ahooks';
import {demoGetApi} from '@src/services/api/demoGetApi';
import {MARGIN_TOP_DEVICE} from '@src/ultis/constants';

const BookshelfScreen: React.FC<
  BookshelfRouteScreenProps<ScreensName.BookshelfScreen>
> = () => {
  const {data, loading} = useRequest(async () => demoGetApi(), {
    debounceWait: 250,
  });
  console.log(
    '🚀 ~ file: index.tsx:14 ~ const{data,loading}=useRequest ~ data:',
    data,
  );

  if (loading) {
    // xử lý loading
    return <Container flex={1} background="RED_300" />;
  }

  return (
    <Container
      flex={1}
      background="WHITE"
      padding={[MARGIN_TOP_DEVICE, 0, 0, 0]}>
      <TextStories
        fontSize={16}
        lineHeight={20}>{`address: ${data?.data?.address}`}</TextStories>
      <TextStories>{`timezone: ${data?.data?.timezone}`}</TextStories>
      <FastImage
        source={{uri: data?.data?.favicon_url}}
        style={{width: 100, height: 100}}
      />
    </Container>
  );
};

export {BookshelfScreen};
