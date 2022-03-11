import data from "bootstrap/js/src/dom/data";

export const state = () =>({
  roomTypes: [],
  roomInfo: {}
})

export const getters = {
  getRoomTypes: state => state.roomTypes,
  getRoomInfo: state => state.roomInfo
}

export const mutations = {
  setRoomTypes(state,roomTypes){
    state.roomTypes = roomTypes
  },
  setRoomInfo(state, roomInfo){
    state.roomInfo = roomInfo
  }
}

export const actions = {
  async fetchRooTypes({ commit }){
    await this.$api.getRoomTypes.get()
      .then(res =>{
        commit('setRoomTypes', res)
        console.log(res)
      })
  },

  async fetchRoomInfo({commit}, {id}){
    await this.$api.getRoom.get({params:{id}})
      .then(res =>{
        console.log(res)
      })
  },

  async addRoom({commit},{id,data}){
    await this.$api.creatingRoom.post({params:{id}, body:data})
      .then(res =>{
        console.log(res)
      })
  }
}
