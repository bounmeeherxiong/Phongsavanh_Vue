// State
export const state = () => ({
  detail_categories: [],
  categories:[],
});
// Actions
export const actions = {
  async detail_categories({ commit }) {
    this.$axios.get("/getCategoryDetail").then((response) => {
      commit("setItem", response.data);
    });
  },
  async categories({ commit }) {
    this.$axios.get("/getCategory").then((response) => {
      commit("setCategories", response.data);
    });
  },
  async createDetailCategories({ dispatch }, form) {
    await this.$axios.post("/Create_Detail_Category", form);
    dispatch("detail_categories");
  },
};

// Mutations
export const mutations = {
  setItem(state, data) {
    state.detail_categories = data;
  },
  setCategories(state,data){
    state.categories=data
  }
};

// Getters
export const getters = {};
