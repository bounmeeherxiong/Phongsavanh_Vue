//State
export const state = () => ({
  categories: [],
  accountNames: [],
  allAccounts: {}
});
//Actions
export const actions = {
  async categories({ commit }) {
    this.$axios.get("/getCategory").then((response) => {
      commit("setCategory", response.data);
    });
  },
  async AccountName({ commit }) {
    this.$axios.get("/AccountName").then((response) => {
      commit("setAccountName", response.data);
    });
  },
  async allAccounts({ commit }) {
    this.$axios.get("/Allaccounts").then((response) => {
      commit("allAccounts", response.data);
    });
  },
  async CreateChartAccount({ dispatch }, form) {
    await this.$axios.post("/CreateChartAccount", form);
    dispatch("allAccounts");
  },
};
//Mutations
export const mutations = {
  setCategory(state, data) {
    state.categories = data;
  },
  setAccountName(state, data) {
    state.accountNames = data?.message;
  },
  allAccounts(state, data) {
    state.allAccounts = data;
  }
};
// Getters
export const getters = {};
