const {
  fetchTagRankList,
  fetchNewArticles,
  fetchTrendArticles,
  trendArticlesAggregator,
  searchTagCount
} = require('./qiita'), {
  repoAggregate,
  fetchLanguageRankList,
  searchRepositoryCount,
  searchRepoRanking
} = require('./github.js');

exports.fetchTagRankList = fetchTagRankList
exports.fetchNewArticles = fetchNewArticles
exports.fetchTrendArticles = fetchTrendArticles
exports.repoAggregate = repoAggregate
exports.trendArticlesAggregate = trendArticlesAggregator
exports.fetchLanguageRankList = fetchLanguageRankList
exports.searchRepositoryCount = searchRepositoryCount
exports.searchTagCount = searchTagCount
exports.searchRepoRanking = searchRepoRanking
