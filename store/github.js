import Github from "../api/github";

export const state = () => ({
  loading: false,
  languageList: [],
  repoRankingList: [],
})

export const mutations = {
  setLanguageList(state, languages) {
    languages.sort(function (a, b) {
      return a.total_count > b.total_count ? -1 : 1;
    });
    state.languageList = languages;
  },

  pushRepoRanking(state, repoRanking) {
    state.repoRankingList.push(repoRanking);
  },

  setLoading(state, isLoading) {
    state.loading = isLoading;
  }
}

export const actions = {
  async loadLanguageList({
    commit
  }) {
    // GitHub APIからデータを取得
    const response = await Github.getLanguageRankList();

    // データをステートにセット
    commit('setLanguageList', response);

    return Promise.resolve();
  },

  async loadRepoRankingList({
    commit,
    state
  }) {
    const axiosArray = [];
    for (let i = 0; i < state.languageList.length; i++) {
      axiosArray.push(Github.searchRepoRanking(state.languageList[i].name));
    }

    const result = await Promise.all(axiosArray);
    for (let i = 0; i < result.length; i++) {
      try {
        commit("pushRepoRanking", result[i].repo.items);
      } catch (err) {
        // 何もしない
      }
    }
  }
}
