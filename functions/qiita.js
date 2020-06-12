const functions = require("firebase-functions"),
  admin = require('./admin-setting.js'),
  axios = require("axios"),
  cors = require("cors")({
    origin: true
  }),
  qiita_url = "https://qiita.com/api/v2/",
  qiita_trend_api = "https://qiita-api.netlify.app/.netlify/functions/trend";

const firestore = admin.firestore();

exports.fetchTagRankList = functions.https.onRequest(async (req, res) => {
  try {
    const tagList = await axios.get(qiita_url + "tags", {
      params: {
        sort: "count"
      }
    });

    cors(req, res, () => {
      res.status(200).json(tagList.data);
    });
  } catch (err) {
    cors(req, res, () => {
      res.status(200).json(err.message);
    });
  }
});

exports.fetchNewArticles = functions.https.onRequest(async (req, res) => {
  try {
    const newArticles = await axios.get(qiita_url + "items", {
      params: {
        page: 1,
        per_page: 20
      }
    });

    cors(req, res, () => {
      res.status(200).json(newArticles.data);
    });
  } catch (err) {
    cors(req, res, () => {
      res.status(200).json(err.message);
    });
  }
});

exports.fetchTrendArticles = functions.https.onRequest(async (req, res) => {
  const qiitaRef = firestore.collection("qiita").doc("trend-articles");
  qiitaRef
    .get()
    .then(doc => {
      if (!doc.exists) {
        console.log("No such trend articles");
        cors(req, res, () => {
          res.status(200).json({
            message: "No such trend articles"
          });
        });
      } else {
        cors(req, res, () => {
          res.status(200).json(doc.data());
        });
      }
    })
    .catch(err => {
      console.log("Error getting trend articles");
      cors(req, res, () => {
        res.status(200).json({
          message: err.message
        });
      });
    });
});

exports.trendArticlesAggregator = functions.pubsub
  .topic("trend-articles-aggregate")
  .onPublish(async message => {
    const qiitaRef = firestore.collection("qiita");
    try {
      const response = await axios.get(qiita_trend_api);
      qiitaRef.doc("trend-articles").set({
        articles: response.data
      });
    } catch (err) {
      console.log(err.message);
      qiitaRef.doc("trend-articles-error").set({
        error_status: err.code,
        error_message: err.message
      });
    }
  });

exports.searchTagCount = functions.https.onRequest(async (req, res) => {
  const word = req.query.word;
  const axiosArray = [];
  try {
    axiosArray.push(axios.get(qiita_url + "tags/" + word));
    axiosArray.push(axios.get(qiita_url + "items", {
      params: {
        page: 1,
        per_page: 20,
        query: "tag:" + word
      }
    }))

    const result = await Promise.all(axiosArray)

    cors(req, res, () => {
      res.status(200).json({
        tagInfo: result[0].data,
        articles: result[1].data
      })
    })

  } catch (err) {
    cors(req, res, () => {
      res.status(200).json({
        status: err.response.status,
        message: err.message,
        searchWord: word
      })
    })
  }
})
