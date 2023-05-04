import {NativeStackScreenProps} from '@react-navigation/native-stack';

export enum ScreensName {
  /* Screen */
  //screen in OnBoarding
  OnBoardingScreen = 'OnBoardingScreen',

  //screens in Auth
  SignUpScreen = 'SignUpScreen',
  SignInScreen = 'SignInScreen',
  OtpPhoneScreen = 'OtpPhoneScreen',
  ConfirmPasswordScreen = 'ConfirmPasswordScreen',
  RegistrationInfoUser = 'RegistrationInfoUser',
  RegistrationInfoUserScreen = 'RegisterPhoneScreen',

  //screens in Tab
  BookshelfScreen = 'BookshelfScreen',
  CommunityScreen = 'CommunityScreen',
  HomeScreen = 'HomeScreen',
  SearchScreen = 'SearchScreen',
  DetailStoriesScreen = 'DetailStoriesScreen',
  SettingScreen = 'SettingScreen',

  //screens in InsideApp
  RoomOfLocationScreen = 'RoomOfLocationScreen',

  /* Route */
  //route in Auth
  OnBoardingRoute = 'OnBoardingRoute',
  AuthRoute = 'AuthRoute',
  SignInRoute = 'SignInRoute',
  
  //route in Tabs
  TabRoute = 'TabRoute',
  HomeRoute = 'HomeRoute',
  SearchRoute = 'SearchRoute',
  BookshelfRoute = 'BookshelfRoute',
  CommunityRoute = 'CommunityRoute',
  SettingRoute = 'SettingRoute',

  //route in InsideApp
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

export type OnBoardingStackScreenParams = {
  [ScreensName.OnBoardingScreen]: undefined;
};

export type OnBoardingRouteScreenProps<T extends keyof OnBoardingStackScreenParams> =
  NativeStackScreenProps<OnBoardingStackScreenParams, T>;

export type SignInStackScreenParams = {
  [ScreensName.SignInScreen]: undefined;
  [ScreensName.OtpPhoneScreen]: undefined;
  [ScreensName.ConfirmPasswordScreen]: undefined;
  [ScreensName.RegistrationInfoUserScreen]: undefined;
};

export type SignInRouteScreenProps<T extends keyof SignInStackScreenParams> =
  NativeStackScreenProps<SignInStackScreenParams, T>;

export type AuthStackScreenParams = {
  [ScreensName.SignUpScreen]: undefined;
  [ScreensName.SignInRoute]: undefined;
};

export type AuthRouteScreenProps<T extends keyof AuthStackScreenParams> =
  NativeStackScreenProps<AuthStackScreenParams, T>;

export type TabStackScreenParams = {
  [ScreensName.HomeRoute] : undefined;
  [ScreensName.CommunityRoute] : undefined;
  [ScreensName.SearchRoute] : undefined;
  [ScreensName.BookshelfRoute] : undefined;
  [ScreensName.SettingRoute] : undefined;
}

export type TabRouteScreenProps<T extends keyof TabStackScreenParams> =
  NativeStackScreenProps<TabStackScreenParams, T>;

export type InsideStackScreenParams = {
  [ScreensName.RoomOfLocationScreen] : undefined;
  
}
  
export type InsideRouteScreenProps<T extends keyof InsideStackScreenParams> =
  NativeStackScreenProps<InsideStackScreenParams, T>;

export type RootStackScreensParams = {
  [ScreensName.OnBoardingRoute]: undefined;
  [ScreensName.AuthRoute]: undefined;
  [ScreensName.TabRoute]: undefined;
  [ScreensName.InsideRoute]: undefined;
};

export type RootRouteScreenProps<T extends keyof RootStackScreensParams> =
  NativeStackScreenProps<RootStackScreensParams, T>;
