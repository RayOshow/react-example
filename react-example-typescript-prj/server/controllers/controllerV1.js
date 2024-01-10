const { categories } = require("../data/v3/categoryData");

const {
  selectProductsData,
  getProductMaxCount,
} = require("../db/sql/productsSql");
const { selectRankingsData } = require("../db/sql/rankingsSql");
const { selectProductDetail } = require("../db/sql/productDetailsSql");
const {
  selectPurchaseReviewData,
  getPurchaseRevieMaxCount,
} = require("../db/sql/purchaseReviewSql");

module.exports = {
  getCategories: (req, res) => {
    return res.json(categories);
  },
  // 상품 리스트
  getProducts: async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let categoryId = parseInt(req.query.category) || 0;

    // 입력 값 검증
    if ( page < 1 || limit < 1 || categoryId <0) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    let query = {};

    // 카테고리가 설정된 경우에만 카테고리 id를 설정 한다.
    if (categoryId > 0) {
      query["category.id"] = categoryId;
    }

    // 카테고리에 따른 상품 필터링
    const skip = (page - 1) * limit;
    let filteredProducts = await selectProductsData(query, skip, limit, {title: 1});

    // 최대 페이지 수와 총 항목 수 계산
    const totalItems = await getProductMaxCount(query);
    const maxPage = Math.ceil(totalItems / limit);

    // 응답 객체 생성
    const responseObject = {
      maxPage: maxPage,
      totalItems: totalItems,
      currentPage: page,
      currentLimit: limit,
      next: page < maxPage,
      items: filteredProducts,
    };

    return res.json(responseObject);
  },
  // 랭킹 데이터를 가져온다.
  getRankings: async (req, res) => {
    let categoryId = parseInt(req.query.category) || 0;

    // 입력 값 검증
    if ( categoryId <0) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    let query = {};

    if (categoryId > 0) {
      query["category.id"] = categoryId;
    }

    // 랭킹 데이터는 10개로 고정
    let rankingProducts = await selectRankingsData(query, 0, 10, {title: 1});

    // 응답 객체 생성
    const responseObject = {
      category: categoryId,
      items: rankingProducts,
    };

    return res.json(responseObject);
  },

  // 검색
  searchProducts: async (req, res) => {

    const searchText = req.query.query || null
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let categoryId = parseInt(req.query.category) || 0;

    //  값 검증
    if ( page < 1 || limit < 1 || categoryId < 0) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    // 가격 범위 필터
    let minPrice = req.query.minPrice;
    let maxPrice = req.query.maxPrice;

    // 할인율 범위 필터
    let minDiscount = req.query.minDiscount;
    let maxDiscount = req.query.maxDiscount;

    // 입력 값 검증
    const query = {};

    if (searchText !== null) {
      // 검색어 쿼리 추가
      query["$or"] = [
        // 대소문자 구분 없이 검색
        { title: new RegExp(searchText, "i") },
        { sub_title: new RegExp(searchText, "i") },
        { brand_name: new RegExp(searchText, "i") },
      ];
    } else {
      return res.status(404).json({ message: "No search Keyword" });
    }

    // 카테고리 선택
    if (categoryId > 0) {
      query["category.id"] = categoryId;
    }

    // 가격 범위 - 잘못 설정하면 그냥 사용하지 않는다.
    if ((minPrice && maxPrice) && !isNaN(minPrice) && !isNaN(maxPrice) && (parseInt(minPrice) < parseInt(maxPrice))) {
      query["price"] = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    }

    // 할인율 범위 - 잘못 설정하면 그냥 사용하지 않는다.
    if ((minDiscount && maxDiscount) && !isNaN(minDiscount) && !isNaN(maxDiscount) && (parseInt(minDiscount) < parseInt(maxDiscount))) {  
      query["discountPercentage"] = {
        $gte: parseInt(minDiscount),
        $lte: parseInt(maxDiscount),
      };
    }

    // 카테고리에 따른 상품 필터링
    const skip = (page - 1) * limit;
    // 제목순으로 정렬
    let filteredProducts = await selectProductsData(query, skip, limit, {title: 1});

    // 최대 페이지 수와 총 항목 수 계산
    const totalItems = await getProductMaxCount(query);
    const maxPage = Math.ceil(totalItems / limit);

    // 응답 객체 생성
    const responseObject = {
      maxPage: maxPage,
      totalItems: totalItems,
      currentPage: page,
      currentLimit: limit,
      next: page < maxPage,
      items: filteredProducts,
    };

    return res.json(responseObject);
  },

  // 상품 상세
  productDetail: async (req, res) => {
    let id = parseInt(req.params.productId);

    if(isNaN(id) || id < 1) {
      return res.status(400).json({ error: "Invalid page id." });
    }

    const query = {};
    query["id"] = id;

    const filteredProducts = await selectProductsData(query);
    const productDetail = await selectProductDetail(query);

    // 데이터는 배열 형태로 오기 때문에, 개수가 없으면 없다고 판단 한다.
    if (productDetail.length <= 0 || filteredProducts <= 0) {
      return res.status(404).json({ error: "Not Found" });
    }

    const responseObject = {
      id: productDetail[0].id,
      category: productDetail[0].category,
      like: productDetail[0].like,
      info: productDetail[0].info,
      purchaseStatus: productDetail[0].purchaseStatus,
      title: filteredProducts[0].title,
      subTitle: filteredProducts[0].subTitle,
      brandName: filteredProducts[0].brandName,
      price: filteredProducts[0].price,
      discountPercentage: filteredProducts[0].discountPercentage,
      discountPrice: filteredProducts[0].discountPrice,
      imageUrl: filteredProducts[0].imageUrl,
      brandImageUrl: filteredProducts[0].brandImageUrl,
    };

    return res.json(responseObject);
  },

  // 구매 이력
  getPurchaseReview: async (req, res) => {
    let id = parseInt(req.params.productId);
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    if(isNaN(id) || id < 1) {
      return res.status(400).json({ error: "Invalid page id" });
    }

    //  값 검증
    if ( page < 1 || limit < 1) {
      return res.status(400).json({ message: "Invalid page or limit values" });
    }

    const query = {};
    query["productId"] = id;

    const skip = (page - 1) * limit;
    const historyData = await selectPurchaseReviewData(query, skip, limit);

    // // 최대 페이지 수와 총 항목 수 계산
    const totalItems = await getPurchaseRevieMaxCount(query);
    const maxPage = Math.ceil(totalItems / limit);

    // 응답 객체 생성
    const responseObject = {
      maxPage: maxPage,
      totalItems: totalItems,
      currentPage: page,
      currentLimit: limit,
      next: page < maxPage,
      items: historyData,
    };
    return res.json(responseObject);
  },

  // 추천 
  getRecommendation: async (req, res) => {
    // 카테고리 값이 설정되어 있으면 가지고 옴.
    let categoryId = parseInt(req.query.category) || 0;
    const type = parseInt(req.query.type) || 1;

    let query = {};

    // 기본 타입은 좋아요 많은 순이다.

    let sort = {};

    // 추천의 기준(타입)을 정한다.
    if (type === 2) {
      // 만족도 순
      sort["purchaseStatus.satisfaction"] = -1;
    } else {
      // 좋아요 많은 순
      sort["like"] = -1;
    }

    if (categoryId > 0) {
      query["category.id"] = categoryId;
    }

    const productDetails = await selectProductDetail(query, 0, 10, sort);

    query = {};
    let selectedIds = [];
    productDetails.forEach((element) => {
      selectedIds.push(element.id);
    });

    query = { id: { $in: selectedIds } };

    let filteredProducts = await selectProductsData(query, 0, 10);

    const responseObject = {
      category: categoryId,
      type: 1,
      items: filteredProducts,
    };

    return res.json(responseObject);
  },

  // 상품기반 추천 - 끝자리 수 같은 데이터를 표시
  getRecommendationByProduct: async (req, res) => {
    const id = parseInt(req.params.productId);
    let query = {};
    const endDigit = (id+1) % 10;

    if(isNaN(id) || id < 1) {
      return res.status(400).json({ error: "Invalid page id" });
    }

    let allProducts = await selectProductsData(query, 0, 100);

    const filteredProducts = allProducts.filter((product) => {
      // product.id를 10으로 나눈 나머지가 endDigit와 같으면 true를 반환하여 해당 데이터를 유지
      return product.id % 10 === endDigit;
    });

    const responseObject = {
      items: filteredProducts,
    };

    return res.json(responseObject);
  },
};
