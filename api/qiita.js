import axios from "axios";
import firebase from "~/plugins/firebase";
const qiita_api = process.env.FIREBASE_API;

export default {
  async getTagRankList() {
    const tagList = await axios.get(qiita_api + "fetchTagRankList");

    return Promise.resolve(tagList.data);
  },

  async getNewArticles() {
    const articles = await axios.get(qiita_api + "fetchNewArticles");

    return Promise.resolve(articles.data);
  },

  async getTrendArticles() {
    const articles = await axios.get(qiita_api + "fetchTrendArticles");

    return Promise.resolve(articles.data.articles)
  },

  getQiitaImageUrl() {
    const ref = firebase.storage().ref('/');

    return new Promise(async (resolve, reject) => {
      const darkImage = ref.child('qiita-effect-dark.png').getDownloadURL();
      const lightImage = ref.child('qiita-effect-light.png').getDownloadURL();

      const result = await Promise.all([darkImage, lightImage]);

      resolve(result);
    })
  },

  async searchTagCount(word) {
    try {
      const result = await axios.get(qiita_api + "searchTagCount", {
        params: {
          word: word
        }
      })

      if (result.data.status) {
        switch (result.data.status) {
          case 403:
            return Promise.reject("利用制限に達しました");
          case 404:
            return Promise.reject("そのタグは存在しません")
          default:
            return Promise.reject("エラーが発生しました")
        }
      } else {
        return Promise.resolve(result.data)
      }
    } catch (err) {
      return Promise.reject(err.message)
    }
  }
};
