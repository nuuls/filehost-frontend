// Utilities
import { defineStore } from "pinia";
import { Account, API } from "./api/api";

export const useAppStore = defineStore("app", {
  state: () => ({
    api: new API(),
    isLoggedIn: false,
    account: null as Account | null,
  }),
  actions: {
    async login() {
      this.account = {
        id: 1,
        username: "nuuls",
        apiKey: "test",
      };
    },
    async signup(username: string, password: string) {
      this.account = await this.api.signup(username, password);
    },
  },
});
