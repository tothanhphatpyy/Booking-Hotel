import {Button} from '@src/components/Button';
import {Container} from '@src/components/Container';
import {TextStories} from '@src/components/TextStories/index';
import {ScreensName, SearchRouteScreenProps} from '@src/routes/types';
import i18n from '@src/ultis/i18n';
import React from 'react';
import {View} from 'react-native';

const SearchScreen: React.FC<
  SearchRouteScreenProps<ScreensName.SearchScreen>
> = () => {
  return (
    <Container>
      <TextStories
        fontSize={18}
        lineHeight={24}
        color="PRIMARY"
        fontWeight="700"
        margin={[35, 0, 0, 10]}>
        {i18n.t('search')}
      </TextStories>
      <View>
        <Button label={i18n.t('search_advance')} type="transparent" />
      </View>
    </Container>
  );
};

export {SearchScreen};
