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
    async login(username: string, password: string) {
      this.account = await this.api.login(username, password);
      localStorage.setItem("api_key", this.account.apiKey);
    },
    async signup(username: string, password: string) {
      this.account = await this.api.signup(username, password);
      localStorage.setItem("api_key", this.account.apiKey);
    },
    async fetchLoggedInUser() {
      const apiKey = localStorage.getItem("api_key");
      if (!apiKey) {
        return;
      }
      this.account = await this.api.getAccount(apiKey);
    },
  },
});
