import { createStore } from 'vuex';

const types = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_USER: 'SET_USER' 
};

const state = () => ({ // 使用函数返回状态对象是 Vuex 4 的推荐做法
  isAuthenticated: false,
  user: {}
});

const getters = {
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  [types.SET_USER](state, user){ 
    state.user = user || {}; // 如果 user 是 falsy 值，则赋值为空对象
  }
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user); // 传递 user 数据给 mutation
  },
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null)
  }
};

// 由于没有提到 modules，所以这里不包含 modules
export default createStore({
  state,
  getters,
  mutations,
  actions
});
