const {
  getTagRankList,
  getNewArticles,
  getTrendArticles,
  trendArticlesAggregator,
  searchTagCount
} = require('./qiita'), {
  repoAggregate,
  getLanguageRankList,
  searchRepositoryCount,
  searchRepoRanking
} = require('./github.js');

exports.getTagRankList = getTagRankList
exports.getNewArticles = getNewArticles
exports.getTrendArticles = getTrendArticles
exports.repoAggregate = repoAggregate
exports.trendArticlesAggregate = trendArticlesAggregator
exports.getLanguageRankList = getLanguageRankList
exports.searchRepositoryCount = searchRepositoryCount
exports.searchTagCount = searchTagCount
exports.searchRepoRanking = searchRepoRanking
