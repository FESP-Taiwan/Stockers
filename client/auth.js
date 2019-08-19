// // @flow
// /* eslint no-restricted-globals: 0 */

// import EventEmitter from 'events';
// import debug from 'debug';

// const debugAuth = debug('NTCH:Auth');

// export const AuthState = {
//   INIT: 'AUTH/INIT',
//   GUEST: 'AUTH/GUEST',
//   LOGINED: 'AUTH/LOGINED',
// };

// export const AuthEvents = {
//   STATE_CHANGED: 'AE/STATE_CHANGED',
//   ACCESS_TOKEN_UPDATED: 'AE/ACCESS_TOKEN_UPDATED',
// };

// type AuthStateType = typeof AuthState.GUEST | typeof AuthState.LOGINED;

// class AuthStore extends EventEmitter {
//   static REFRESH_FREQUENCY = 1000 * 60 * 60 * 24

//   privateState: AuthStateType = AuthState.INIT

//   privateAccessTokem: ?string = null

//   refreshTokenInterval: ?IntervalID = null

//   constructor() {
//     super();

//     this.on(AuthEvents.STATE_CHANGED, () => {
//       if (this.state === AuthState.LOGINED) {

//       }
//     });

//   }

//   set state(newState: AuthStateType) {
//     this.privateState = newState;

//     this.emit(AuthEvents.STATE_CHANGE, newState);

//     debugAuth(`Auth State Changed ${newState}`);
//   }

//   get state() {
//     return this.privateState;
//   }

//   startRefreshToken() {
//     const refreshToken = localStorage.getItem('refreshToken');

//     if (refreshToken) {
//       this.refreshTokenInterval = setInterval(
//         () => this.Pag(refreshToken),
//         AuthStore.REFRESH_FREQUENCY,
//       );
//     }
//   }

//   stopRefreshToken() {
//     if (this.refreshTokenInterval) {
//       clearInterval(this.refreshTokenInterval);
//     }
//   }

//   bindClient(client) {
//     this.client = client;
//   }
// }

// const authStore = new AuthStore();

// authStore.setMaxListeners(300);

// export default authStore;
