import {Container} from '@src/components/Container';
import {TextStories} from '@src/components/TextStories/index';
import {COLORS} from '@src/config/theme/colors';
import i18n from '@src/ultis/i18n';
import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {CategoryTab} from './Category';
import {FullTab} from './Full';
import {UpdateTab} from './Update';
import {YourTab} from './Your';
import {MARGIN_TOP_DEVICE} from '@src/ultis/constants';
import {HomeRouteScreenProps, ScreensName} from '@src/routes/types';

const renderScene = SceneMap({
  category: CategoryTab,
  full: FullTab,
  update: UpdateTab,
  your: YourTab,
});

const HomeScreen: React.FC<
  HomeRouteScreenProps<ScreensName.HomeScreen>
> = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'category', title: 'Danh mục'},
    {key: 'full', title: 'Đã full'},
    {key: 'update', title: 'Update'},
    {key: 'your', title: 'Của bạn'},
  ]);

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={{backgroundColor: COLORS.WHITE}}
        tabStyle={styles.tabBar}
        contentContainerStyle={{height: 40}}
        renderLabel={({route, focused, color}) => (
          <TextStories
            fontSize={16}
            fontWeight="700"
            color="PRIMARY"
            textAlign="center">
            {route.title}
          </TextStories>
        )}
      />
    );
  };

  return (
    <Container flex={1} background="WHITE">
      <TextStories style={styles.home}>{i18n.t('home')}</TextStories>
      <View style={{flex: 1}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
      </View>
    </Container>
  );
};

export {HomeScreen};

const styles = StyleSheet.create({
  home: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    marginTop: MARGIN_TOP_DEVICE,
    marginLeft: 10,
  },
  indicator: {
    backgroundColor: COLORS.PRIMARY,
    marginLeft: 10,
    width: 50,
    height: 3,
    borderRadius: 20,
  },
  tabBar: {
    width: 100,
    alignItems: 'flex-start',
  },
});
