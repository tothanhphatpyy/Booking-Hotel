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
  HomeScreen = 'HomeScreen',
  FavoriteScreen = 'FavoriteScreen',
  OderScreen = 'OderScreen',
  ChatScreen = 'ChatScreen',
  SettingScreen = 'SettingScreen',

  //screens in InsideApp
  RoomOfLocationScreen = 'RoomOfLocationScreen',
  RoomInfoScreen = 'RoomInfoScreen',
  ConfirmRoomScreen  = 'ConfirmRoomScreen',

  //screens in BecomeOwner
  BecomeOwnerScreen = 'BecomeOwner',
  RegisHotelScreen = 'RegisHotelScreen',
  //DashboardOwner
  DashboardOwnerScreen = 'DashboardOwnerScreen',

  /* Route */
  //route in Auth
  OnBoardingRoute = 'OnBoardingRoute',
  AuthRoute = 'AuthRoute',
  SignInRoute = 'SignInRoute',
  
  //route in Tabs
  TabRoute = 'TabRoute',
  HomeRoute = 'HomeRoute',
  FavoriteRoute = 'FavoriteRoute',
  OderRoute = 'OderRoute',
  ChatRoute = 'ChatRoute',
  SettingRoute = 'SettingRoute',

  //route in InsideApp
  InsideRoute = 'InsideRoute',
  OwnerRoute = 'OwnerRoute',
  
}

export type HomeStackScreensParams = {
  [ScreensName.HomeScreen]: undefined;
};

export type HomeRouteScreenProps<T extends keyof HomeStackScreensParams> =
  NativeStackScreenProps<HomeStackScreensParams, T>;

export type FavoriteStackScreensParams = {
  [ScreensName.FavoriteScreen]: undefined;
};

export type FavoriteRouteScreenProps<T extends keyof FavoriteStackScreensParams> =
  NativeStackScreenProps<FavoriteStackScreensParams, T>;

export type OderStackScreensParams = {
  [ScreensName.OderScreen]: undefined;
};

export type OderRouteScreenProps<T extends keyof OderStackScreensParams> =
  NativeStackScreenProps<OderStackScreensParams, T>;

export type ChatStackScreensParams = {
  [ScreensName.ChatScreen]: undefined;
};

export type ChatRouteScreenProps<T extends keyof ChatStackScreensParams> =
  NativeStackScreenProps<ChatStackScreensParams, T>;

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
  [ScreensName.FavoriteRoute] : undefined;
  [ScreensName.OderRoute] : undefined;
  [ScreensName.ChatRoute] : undefined;
  [ScreensName.SettingRoute] : undefined;
}

export type TabRouteScreenProps<T extends keyof TabStackScreenParams> =
  NativeStackScreenProps<TabStackScreenParams, T>;

export type InsideStackScreenParams = {
  [ScreensName.RoomOfLocationScreen] : undefined;
  [ScreensName.RoomInfoScreen] : undefined;
  [ScreensName.ConfirmRoomScreen] : undefined;
}
  
export type InsideRouteScreenProps<T extends keyof InsideStackScreenParams> =
  NativeStackScreenProps<InsideStackScreenParams, T>;

  export type OwnerStackScreenParams = {
    [ScreensName.BecomeOwnerScreen] : undefined;
    [ScreensName.RegisHotelScreen] : undefined;
    [ScreensName.DashboardOwnerScreen] : undefined;
  }
    
  export type OwnerRouteScreenProps<T extends keyof OwnerStackScreenParams> =
    NativeStackScreenProps<OwnerStackScreenParams, T>;

export type RootStackScreensParams = {
  [ScreensName.OnBoardingRoute]: undefined;
  [ScreensName.AuthRoute]: undefined;
  [ScreensName.TabRoute]: undefined;
  [ScreensName.InsideRoute]: undefined;
  [ScreensName.OwnerRoute]: undefined;
};

export type RootRouteScreenProps<T extends keyof RootStackScreensParams> =
  NativeStackScreenProps<RootStackScreensParams, T>;
