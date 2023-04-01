import {ItemStories} from '@src/components/ItemStories';
import React from 'react';
import {View} from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import {ScreensName} from '@src/routes/types';

const UpdateTab = () => {
  const {navigate}: any = useNavigation();

  const onPressDetail = () => {
    navigate(ScreensName.DetailStoriesScreen);
  };

  return (
    <View style={{flex: 1, marginHorizontal: 10}}>
      <FlashList
        data={[1, 2, 3, 4, 5]}
        renderItem={({item, index}) => (
          <ItemStories
            key={`itemUpdate${index}`}
            onPress={onPressDetail}
            label="Một thời để nhớ"
            category="M MT"
            image="https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
          />
        )}
        keyExtractor={(_, index) => `update${index}`}
      />
    </View>
  );
};

export {UpdateTab};
