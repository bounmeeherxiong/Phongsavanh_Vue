// State
export const state = () => ({
  categories: [],
  types: [],
});

// Actions
export const actions = {
  async categories({ commit }) {
    this.$axios.get("/getCategory").then((response) => {
      commit("setItem", response.data);
    });
  },
  async types({ commit }) {
    this.$axios.get("/getType").then((response) => {
      commit("setType", response.data);
    });
  },
  async createCategory({ dispatch }, form) {
    await this.$axios.post("/Create_Category", form);
    dispatch("categories");
  },

};
// Mutations
export const mutations = {
  setItem(state, data) {
    state.categories = data;
  },
  setType(state, data) {
    state.types = data;
  },
};

// Getters
export const getters = {};
