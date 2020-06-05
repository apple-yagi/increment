import Qiita from '../api/qiita';

export const state = () => ({
  loading: false,
  tags: [],
  newArticles: [],
  trendArticles: [],
  lightImage: null,
  darkImage: null
})

export const mutations = {
  setQiitaInfo(state, payload) {
    const tags = payload[0],
      newArticles = payload[1],
      trendArticles = payload[2],
      darkImage = payload[3][0],
      lightImage = payload[3][1];

    // タグをVuex Stateに代入
    state.tags = tags

    // 新着記事の要素を決められた型にまとめる
    Object.keys(newArticles).forEach(key => {
      let article = {
        title: newArticles[key].title,
        tags: newArticles[key].tags,
        id: newArticles[key].id,
        likesCount: null,
        author: {
          profileImageUrl: newArticles[key].user.profile_image_url,
          name: newArticles[key].user.id
        }
      };
      state.newArticles.push(article);
    })

    // トレンド記事の要素を決められた型にまとめる
    Object.keys(trendArticles).forEach(key => {
      let article = {
        title: trendArticles[key].node.title,
        tags: null,
        id: trendArticles[key].node.uuid,
        likesCount: trendArticles[key].node.likesCount,
        author: {
          profileImageUrl: trendArticles[key].node.author.profileImageUrl,
          name: trendArticles[key].node.author.urlName
        }
      };
      state.trendArticles.push(article);
    });

    // Image URLをセット
    state.lightImage = lightImage;
    state.darkImage = darkImage;

    // loadingを解除
    state.loading = false;
    return Promise.resolve();
  },

  // loading開始
  setLoading(state, status) {
    state.loading = status;
  }
}

export const actions = {
  // トレンド記事を取得
  async loadArticles({
    commit
  }) {
    // loading開始
    commit('setLoading', true)

    const axiosArray = [];

    // Qiita APIからタグリストを取得
    axiosArray.push(Qiita.getTagRankList());

    // Qiita APIから新着記事を取得
    axiosArray.push(Qiita.getNewArticles());

    // Qiita Trend APIからトレンド記事を取得
    axiosArray.push(Qiita.getTrendArticles());

    // Qiita APIからロゴを取得
    axiosArray.push(Qiita.getQiitaImageUrl());

    // APIからレスポンスを受け取る
    const result = await Promise.all(axiosArray);

    await commit('setQiitaInfo', result);
    return Promise.resolve();
  }
}
