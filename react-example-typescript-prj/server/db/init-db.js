const { common, product } = require("../data/v3/productData");
const { ranking } = require("../data/v3/rankingData");
const { productDetail } = require("../data/v3/productDetailData");
const { purchaseReview } = require("../data/v3/purchaseReviewData");

const Datastore = require("nedb");

const productDb = new Datastore({
  filename: "db/data/product.db",
  autoload: true,
});

const rankingDb = new Datastore({
  filename: "db/data/ranking.db",
  autoload: true,
});
const productDetailDb = new Datastore({
  filename: "db/data/productDetail.db",
  autoload: true,
});
const purchaseReviewyDb = new Datastore({
  filename: "db/data/purchaseReview.db",
  autoload: true,
});

async function insertInitialData(db, data) {
  try {

    for (const item of data) {
      await insertData(db, item);
    }
  } catch (err) {
    console.error("Error inserting data:", err);
  }
}

function insertData(db, item) {
  return new Promise((resolve, reject) => {
    db.insert(item, (err, newDoc) => {
      if (err) {
        reject(err);
      } else {
        console.log("Data inserted:", newDoc);
        resolve();
      }
    });
  });
}

async function insertAllData() {
  try {
    await insertInitialData(productDb, product);
    await insertInitialData(rankingDb, ranking);
    await insertInitialData(productDetailDb, productDetail);
    await insertInitialData(purchaseReviewyDb, purchaseReview);
    console.log("모든 데이터가 성공적으로 삽입되었습니다.");
  } catch (error) {
    console.error("데이터 삽입 중 오류가 발생했습니다:", error);
  }
}

insertAllData();
