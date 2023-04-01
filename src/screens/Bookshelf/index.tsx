import {BookshelfRouteScreenProps, ScreensName} from '@src/routes/types';
import React from 'react';
import {Text, View} from 'react-native';

const BookshelfScreen: React.FC<
  BookshelfRouteScreenProps<ScreensName.BookshelfScreen>
> = () => {
  return (
    <View>
      <Text>Books</Text>
    </View>
  );
};

export {BookshelfScreen};
