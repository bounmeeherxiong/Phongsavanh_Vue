//State
export const state=()=>({
  categories:[],
})
//Actions
export const actions={

  async categories({ commit }) {
    this.$axios.get("/getCategory").then((response) => {
      commit("setCategory", response.data);
    });
  },
}
//Mutations
export const mutations={
  setCategory(state,data){
    state.categories=data;
  }
}
// Getters
export const getters={};
