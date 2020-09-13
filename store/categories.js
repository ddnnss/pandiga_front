export const state = () => ({
  categories:[]
})

export const mutations= {
  setCategories(state,categories){
    state.categories = categories
  }
}

export const actions = {
  async fetchCategories({commit}){
    try{
      const categories_data = await this.$axios.get('/api/v1/technique/categories/')
      commit('setCategories',categories_data.data)
    } catch (e) {
      throw e
    }
  }
}

export const getters ={
  categories: s => s.categories
}
