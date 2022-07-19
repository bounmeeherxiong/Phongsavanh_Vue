//State
export const state=()=>({
  accountNames: [],

})
//Actions
export const actions={

  async accountNames({ commit }){
    this.$axios.get("/AccountName").then((response)=>{
      commit("setAccountName",response.data)
    })
  }
}
//Mutations
export const mutations={
  setAccountName(state,data){
    state.accountNames=data?.message;
  }

}

//Getters
export const getters={};
