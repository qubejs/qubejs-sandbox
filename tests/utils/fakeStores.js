const fakeStore = {
  add: () => {}
};

const userStore = {
  ...fakeStore,
  isLoggedIn: () => false
};

const stores = {
  userStore: userStore,
  commonStore: fakeStore,
  authStore: fakeStore
};

export default stores;
