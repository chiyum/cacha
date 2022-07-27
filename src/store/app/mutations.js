const mutations = {
  "set/card"(state, payload) {
    state.card = payload;
    console.log(payload, "payload");
  },
};

export default mutations;
