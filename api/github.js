import axios from 'axios';
const github_api = process.env.GITHUB_API;

export default {
  async getLanguageRankList() {
    try {
      const languageRankList = await axios.get(github_api + "getLanguageRankList");
      return Promise.resolve(languageRankList.data);
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  },

  async searchRepositoryCount(language) {
    try {
      const repoCount = await axios.get(github_api + "searchRepositoryCount", {
        params: {
          word: language
        }
      })

      if (repoCount.data.status == 200) {
        return Promise.resolve(repoCount.data.total_count);
      } else {
        return Promise.reject(repoCount.data)
      }
    } catch (e) {
      return Promise.reject(e);
    }
  },

  async searchRepoRanking(language) {
    try {
      const response = await axios.get(github_api + "searchRepoRanking", {
        params: {
          language: language
        }
      })
      return Promise.resolve(response.data)
    } catch (err) {
      console.log(err.message)
    }
  }
}
