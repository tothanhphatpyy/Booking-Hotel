export const PATH = {
  app: '/v1/app',

  // USER_API_KEY
  login: '/login',
  list_user: '/list-user',

  // LOCATION_API_KEY
  list_location: '/location',
  

  // HOTEL_API_KEY
  list_hotel: '/list-hotel',
  hotel_byId: '/list-hotel?hotelID=',
  hotel_by_locationId: '/list-hotel/',
  
  // ORDER_API_KEY
  add_oder: '/add-oder',
  list_oder: '/list-oder',
  oder_byId: '/list-oder?oderID=',
  oder_byUser: '/list-oder-by-user/',

  //FAVORITE_ROOM_KEY
  add_favorite_room_byUser: '/add-room-favorite',
  list_favorite_room_byUser: '/room-favorite-by-user?userID=',
  delete_favorite_room_byUser: '/delete-room-favorite',
};
