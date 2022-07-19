// State
export const state = () => ({
  categories: [],
  types: [],
  categoryDetail: [],
  parents: []

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
  async categoryDetails({ commit }) {
    this.$axios.get("/getCategoryDetail").then((response) => {
      commit("categoryDetail", response.data);
    });
  },
  async allParents({ commit }, id) {
    this.$axios.get(`/all-parents/${id}`).then((response) => {
      commit("parents", response.data);
    });
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
  categoryDetail(state, data) {
    state.categoryDetail = data;
  },
  parents(state, data) {
    const dataReverse = data?.message?.reverse();
    state.parents = dataReverse;
  }
};

// Getters
export const getters = {};
