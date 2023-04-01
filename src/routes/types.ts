import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreensName {
  BookshelfScreen = 'BookshelfScreen',
  CommunityScreen = 'CommunityScreen',
  HomeScreen = 'HomeScreen',
  SearchScreen = 'SearchScreen',
  DetailStoriesScreen = 'DetailStoriesScreen',
  SettingScreen = 'SettingScreen',

  HomeRoute = 'HomeRoute',
  SearchRoute = 'SearchRoute',
  BookshelfRoute = 'BookshelfRoute',
  CommunityRoute = 'CommunityRoute',
  SettingRoute = 'SettingRoute',
  InsideRoute = 'InsideRoute',
}
export type BookshelfStackScreensParams = {
  [ScreensName.BookshelfScreen]: undefined;
};

export type BookshelfRouteScreenProps<
  T extends keyof BookshelfStackScreensParams,
> = NativeStackScreenProps<BookshelfStackScreensParams, T>;

export type CommunityStackScreensParams = {
  [ScreensName.CommunityScreen]: undefined;
};

export type CommunityRouteScreenProps<
  T extends keyof CommunityStackScreensParams,
> = NativeStackScreenProps<CommunityStackScreensParams, T>;

export type HomeStackScreensParams = {
  [ScreensName.HomeScreen]: undefined;
};

export type HomeRouteScreenProps<T extends keyof HomeStackScreensParams> =
  NativeStackScreenProps<HomeStackScreensParams, T>;

export type SearchStackScreensParams = {
  [ScreensName.SearchScreen]: undefined;
};

export type SearchRouteScreenProps<T extends keyof SearchStackScreensParams> =
  NativeStackScreenProps<SearchStackScreensParams, T>;

export type SettingStackScreensParams = {
  [ScreensName.SettingScreen]: undefined;
};

export type SettingRouteScreenProps<T extends keyof SettingStackScreensParams> =
  NativeStackScreenProps<SettingStackScreensParams, T>;

export type RootStackScreensParams = {
  [ScreensName.DetailStoriesScreen]: undefined;
  [ScreensName.CommunityRoute]: undefined;
  [ScreensName.SearchRoute]: undefined;
  [ScreensName.BookshelfRoute]: undefined;
  [ScreensName.HomeRoute]: undefined;
  [ScreensName.SettingRoute]: undefined;
};

export type RootRouteScreenProps<T extends keyof RootStackScreensParams> =
  NativeStackScreenProps<RootStackScreensParams, T>;
