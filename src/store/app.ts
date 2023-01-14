// Utilities
import { STATUS_CODES } from "http";
import { defineStore } from "pinia";
import { Account, API, Domain } from "./api/api";

export const useAppStore = defineStore("app", {
  state: () => ({
    api: new API(),
    isLoggedIn: false,
    _account: null as Account | null,
    _defaultDomain: null as Domain | null,
  }),
  actions: {
    async login(username: string, password: string) {
      this._account = await this.api.login(username, password);
      localStorage.setItem("api_key", this._account.apiKey);
    },
    async signup(username: string, password: string) {
      this._account = await this.api.signup(username, password);
      localStorage.setItem("api_key", this._account.apiKey);
    },
    async fetchLoggedInUser() {
      const apiKey = localStorage.getItem("api_key");
      if (!apiKey) {
        return;
      }
      this._account = await this.api.getAccount(apiKey);
    },
  },
  getters: {
    async account(): Promise<Account> {
      if (this._account) return this._account;
      const apiKey = localStorage.getItem("api_key");
      if (!apiKey) {
        return Promise.reject("Not logged in");
      }
      this._account = await this.api.getAccount(apiKey);
      return this._account;
    },
    async defaultDomain(): Promise<Domain> {
      if (this._defaultDomain) return this._defaultDomain;
      const acc = await this.account;
      if (!acc) return Promise.reject("Not logged in");
      return await this.api.getDomain(acc.defaultDomainId, acc.apiKey);
    },
  },
});
