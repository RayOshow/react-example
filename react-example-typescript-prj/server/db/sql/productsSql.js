const Datastore = require("nedb");
const productsDb = new Datastore({
  filename: "db/data/product.db",
  autoload: true,
});

module.exports = {
  selectProductsData: async (query = {}, skip = null, limit = null, sort={id:1}) => {
    console.log(query)
    return new Promise((resolve, reject) => {
      productsDb
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
  getProductMaxCount: async (query = {}) => {  
    return new Promise((resolve, reject) => {
      productsDb.count(query, (err, count) => {
        if (err) {
          reject(err);
        } else {          
          resolve(count);
        }
      });
    });
  },
};
