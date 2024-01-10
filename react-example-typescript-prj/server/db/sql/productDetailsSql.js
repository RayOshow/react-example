const Datastore = require("nedb");

const productDetailsDb = new Datastore({
  filename: "db/data/productDetail.db",
  autoload: true,
});

module.exports = {
  selectProductDetail: async (query = {}, skip = 0, limit = 1, sort={}) => {
    console.log(sort)
    return new Promise((resolve, reject) => {
      productDetailsDb
        .find(query, { _id: 0 })  
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
