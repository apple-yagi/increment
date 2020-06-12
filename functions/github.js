const functions = require('firebase-functions'),
  admin = require('./admin-setting.js'),
  axios = require('axios'),
  cors = require('cors')({
    origin: true,
  }),
  languageList = [
    'Java',
    'JavaScript',
    'C++',
    'C',
    'Python',
    'C#',
    'PHP',
    'Go',
    'TypeScript',
    'Ruby',
    'Swift',
    'Objective-C',
    'Kotlin',
    'Dart',
    'Rust',
    'Scala',
  ],
  github_api = "https://api.github.com/search/repositories";

const firestore = admin.firestore();

exports.fetchLanguageRankList = functions.https.onRequest(async (req, res) => {
  const githubRef = firestore.collection("github");
  const axiosArray = [];
  languageList.forEach((language) => {
    axiosArray.push(githubRef.doc(language).get());
  });

  const result = await Promise.all(axiosArray);

  let json = [];
  languageList.forEach((language, index) => {
    json.push({
      name: language,
      total_count: result[index].data().total_count
    });
  })

  cors(req, res, () => {
    res.status(200).json(json);
  })
})

exports.searchRepositoryCount = functions.https.onRequest(async (req, res) => {
  const language = req.query.word;

  try {
    const result = await axios.get(github_api, {
      params: {
        q: "language:" + language,
        per_page: 1
      },
      headers: {
        'Authorization': `token ${functions.config().github.key}`
      }
    })

    cors(req, res, () => {
      res.status(200).json({
        status: 200,
        total_count: result.data.total_count,
        word: language
      })
    })
  } catch (err) {
    console.log(err);

    cors(req, res, () => {
      res.status(200).json({
        status: 500,
        message: err.message,
        word: language
      })
    })
  }
})

exports.searchRepoRanking = functions.https.onRequest(async (req, res) => {
  const language = req.query.language;

  try {
    const result = await axios.get(github_api, {
      params: {
        q: "language:" + language,
        sort: "stars",
        order: "desc",
        per_page: 3
      },
      headers: {
        'Authorization': `token ${functions.config().github.key}`
      }
    });

    cors(req, res, () => {
      res.status(200).json({
        language: language,
        repo: result.data
      })
    })
  } catch (err) {
    console.log(err);
    cors(req, res, () => {
      res.status(200).json({
        status: err.response.status,
        message: err.message,
        language: language
      })
    })
  }
})

exports.repoAggregate = functions.pubsub.topic('github-repo-aggregate').onPublish(async (message) => {
  let axiosArray = [];
  languageList.forEach((language) => {
    axiosArray.push(axios.get(github_api, {
      params: {
        q: "language:" + language,
        per_page: 1
      },
      headers: {
        'Authorization': `token ${functions.config().github.key}`
      }
    }))
  })

  const result = await Promise.all(axiosArray)

  const githubRef = firestore.collection('github');
  let promiseArray = [];
  for (let i = 0; i < result.length; i++) {
    promiseArray.push(githubRef.doc(languageList[i]).set({
      total_count: result[i].data.total_count
    }))
  }

  await Promise.all(promiseArray);
})
