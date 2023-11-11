export const useUserDataStore = defineStore('user', {
    state: () => ({ name: 'Brock Lesnar', emailAddress: 'brockLesnarIsCool@aol.com' }),
    getters: {
      doubleCount: (state) => state.count * 2,
    },
    actions: {
      handleLogin() {
        this.count++
      },
    },
  })