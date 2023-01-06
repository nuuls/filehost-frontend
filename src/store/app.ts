// Utilities
import { defineStore } from "pinia";
import { API } from "./api/api";

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

export interface Account {
  id: number;
  username: string;
  apiKey: string;
}
