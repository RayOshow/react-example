const Datastore = require("nedb");

const rankingDb = new Datastore({
  filename: "db/data/ranking.db",
  autoload: true,
});

module.exports = {
  selectRankingsData: async (query = {}, skip = null, limit = null, sort={id:1}) => {
    return new Promise((resolve, reject) => {
      rankingDb
        .find(query , { _id: 0 })
        .sort(sort)        
        .skip(skip)
        .limit(limit)
        .exec((err, docs) => {
          if (err) {
            console.error("Error selecting data:", err);
            reject(err); // 에러 발생 시 reject 호출
          } else {
            resolve(docs); // 데이터 조회 성공 시 resolve 호출
          }
        });
    });
  },
  
};
