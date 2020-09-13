export const state = () => ({
  cities:[]
})

export const mutations= {
  setCities(state,cities){
    state.cities = cities
  }
}

export const actions = {
  async fetchCities({commit}){
    try{
      const data = await this.$axios.get('/api/v1/city/all/')
      commit('setCities',data.data)
    } catch (e) {
      throw e
    }
  }
}

export const getters ={
  cities: s => s.cities
}
