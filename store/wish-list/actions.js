export async function fetchWishLists({ commit }) {
  await this.$axios.get('/wish-lists', { handleError: false }).then((res) => {
    commit('setWishLists', res.data)
  })
}

export async function findWishList({ commit }, { id }) {
  return await this.$axios.get(`/wish-lists/${id}`).then((res) => {
    return res.data
  })
}

export async function addProductsToWishList({ commit }, { wishList, ids }) {
  return await this.$axios
    .post(`/wish-lists/${wishList.id}/items`, {
      ids,
    })
    .then((res) => {
      commit('updateWishList', res.data)
      return res.data
    })
}

export async function createWishList({ commit }, { name, privacy }) {
  return await this.$axios
    .post('/wish-lists/', { name, privacy })
    .then((res) => {
      commit('addWishList', res.data)
      return res.data
    })
}

export async function editWishList({ commit }, { id, name }) {
  return await this.$axios
    .put(`/wish-lists/${id}`, {
      name,
    })
    .then((res) => {
      return res.data
    })
}

export async function deleteWishList({ commit }, { id }) {
  return await this.$axios
    .delete(`/wish-lists/${id}`)
    .then((res) => {
      return res.data
    })
}

export async function removeProductsFromWishList(
  { commit },
  { wishList, ids }
) {
  await this.$axios
    .delete(`/wish-lists/${wishList.id}/items`, {
      data: { ids },
    })
    .then((res) => {
      commit('updateWishList', res.data)
      return res.data
    })
}

export async function updateWishListPrivacy({ commit }, { wishList, privacy }) {
  await this.$axios
    .put(`/wish-lists/${wishList.id}`, {
      privacy,
    })
    .then((res) => {
      commit('updatePrivacy', { wishList, privacy })
    })
}

export async function fetchWishListItems(
  { commit },
  { wishList, page, category, perPage }
) {
  return await this.$axios
    .get(`/wish-lists/${wishList.id}/items`, {
      params: {
        page,
        category,
        per_page: perPage,
      },
    })
    .then((res) => {
      return res.data
    })
}

export async function moveWishListItems(
  { commit },
  { wishList, ids, targetId }
) {
  return await this.$axios.put(`/wish-lists/${wishList.id}/items`, {
    ids,
    wish_list_id: targetId,
  })
}
export function clearWishListItems({ commit }){
  commit('setWishLists', [])
}
