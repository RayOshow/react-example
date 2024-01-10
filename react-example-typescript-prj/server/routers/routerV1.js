const {
  getCategories,
  getProducts,
  getRankings,
  searchProducts,
  productDetail,
  getPurchaseReview,
  getRecommendation,
  getRecommendationByProduct,
} = require("../controllers/controllerV1");
const express = require("express");
const router = express.Router();
 
// 상품 리스트를 가져 온다.
router.get("/products", async (req, res) => {
  try {
    await getProducts(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 랭킹 리스트를 가져 온다. 
router.get("/ranking", async (req, res) => {
  try {
    await getRankings(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 검색
router.get("/search", async (req, res) => {
  try {
    await searchProducts(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 상품 상세
router.get("/detail/:productId", async (req, res) => {
  try {
    await productDetail(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 구매리뷰 가져오기
router.get("/purchase/review/:productId", async (req, res) => {
  try {
    await getPurchaseReview(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//추천 상품 리스트
router.get("/recommendation", async (req, res) => {
  try {
    await getRecommendation(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//상품 기반 추천
router.get("/recommendation/:productId", async (req, res) => {
  try {
    await getRecommendationByProduct(req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 카테고리 정보
router.get("/categories", getCategories);

module.exports = router;

// 스웨거 정보
/**
 * @swagger
 * tags:
 *  - name: V1
 *    description: V1 API 버전에 대한 엔드포인트들입니다.
 * paths:
 *   /api/v1/categories:
 *     get:
 *       tags:
 *         - v1
 *       summary: 모든 카테고리 목록 조회
 *       produces:
 *         - application/json
 *       responses:
 *         200:
 *           description: 웹 서비스에서 사용 될 카테고리의 모든 목록을 가져 옵니다.
 *           content:
 *             application/json:
 *               example:
 *                {
 *                    "product": [
 *                        {
 *                            "id": 1,
 *                            "category": "Clothing",
 *                            "title": "의류",
 *                            "imageUrl": "https://images.unsplash.com/photo-1522273500616-6b4757e4c184?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
 *                        },
 *                        {
 *                            "id": 2,
 *                            "category": "Pet",
 *                            "title": "반려동물",
 *                            "imageUrl": "https://images.unsplash.com/photo-1618598827591-696673ab0abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1587&q=80"
 *                        },
 *                        {
 *                            "id": 3,
 *                            "category": "Glasses",
 *                            "title": "안경",
 *                            "imageUrl": "https://images.unsplash.com/photo-1517602302552-471fe67acf66?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80"
 *                        },
 *                        {
 *                            "id": 4,
 *                            "category": "Shoes",
 *                            "title": "신발",
 *                            "imageUrl": "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80"
 *                        }
 *                    ],
 *                    "searchFilter": {
 *                        "price": [
 *                            {
 *                                "id": 1,
 *                                "min": 1,
 *                                "max": 199999
 *                            },
 *                            {
 *                                "id": 2,
 *                                "min": 200000,
 *                                "max": 399999
 *                            },
 *                            {
 *                                "id": 3,
 *                                "min": 400000,
 *                                "max": 999999
 *                            },
 *                            {
 *                                "id": 4,
 *                                "min": 1000000,
 *                                "max": 9999999999
 *                            }
 *                        ],
 *                        "discount": [
 *                            {
 *                                "id": 0,
 *                                "min": 0,
 *                                "max": 0
 *                            },
 *                            {
 *                                "id": 1,
 *                                "min": 1,
 *                                "max": 24
 *                            },
 *                            {
 *                                "id": 2,
 *                                "min": 25,
 *                                "max": 49
 *                            },
 *                            {
 *                                "id": 3,
 *                                "min": 50,
 *                                "max": 74
 *                            },
 *                            {
 *                                "id": 4,
 *                                "min": 75,
 *                                "max": 100
 *                            }
 *                        ]
 *                    },
 *                    "recomType": [
 *                        {
 *                            "id": 1,
 *                            "type": "purchase"
 *                        },
 *                        {
 *                            "id": 2,
 *                            "type": "discount"
 *                        }
 *                    ],
 *                    "ageType": [
 *                           {
 *                               "id": 1,
 *                               "type": "type1",
 *                               "description": "~18세"
 *                           },
 *                           {
 *                               "id": 2,
 *                               "type": "type2",
 *                               "description": "19~28세"
 *                           },
 *                           {
 *                               "id": 3,
 *                               "type": "type3",
 *                               "description": "29~38세"
 *                           },
 *                           {
 *                               "id": 4,
 *                                "type": "type4",
 *                               "description": "39~48세"
 *                           },
 *                           {
 *                               "id": 5,
 *                               "type": "type5",
 *                               "description": "49세~"
 *                           }
 *                       ]
 *                }
 *   /api/v1/products:
 *     get:
 *       tags:
 *         - v1
 *       summary: 전체 상품 조회
 *       description: 페이지와 제한 개수에 따른 페이징 처리된 상품 목록을 가져옵니다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: page
 *           in: query
 *           description: 조회할 페이지 번호. 제공되지 않으면 기본값은 1입니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 1
 *           example: 1
 *         - name: limit
 *           in: query
 *           description: 페이지당 가져올 상품의 수. 제공되지 않으면 기본값은 10입니다. 
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 10
 *           example: 10
 *         - name: category
 *           in: query
 *           description: 카테고리 id. 해당 카테고리에 해당하는 제품만 반환됩니다. 없으면 전체 상품 입니다.
 *           required: false
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                {
 *                  "maxPage": 34,
 *                  "totalItems": 100,
 *                  "currentPage": 1,
 *                  "currentLimit": 3,
 *                  "next": true,
 *                  "items": [
 *               {
 *                 "id": 1,
 *                 "type": "Clothing",
 *                 "title": "PALESTIME 후드",
 *                 "subTitle": null,
 *                 "brandName": null,
 *                 "price": 135000,
 *                 "discountPercentage": 35,
 *                 "discountPrice": 87750,
 *                 "imageUrl": "https://images.unsplash.com/photo-1620767462938-c08d893e96ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
 *                 "brandImageUrl": null,
 *                 "category": {
 *                  "id": 1,
 *                  "category": "Clothing"
 *                 }
 *                },
 *                {
 *                  "id": 2,
 *             "type": "Clothing",
 *           "title": "Polraroid 320 티셔츠",
 *           "subTitle": null,
 *           "brandName": null,
 *           "price": 9900,
 *           "discountPercentage": 5,
 *           "discountPrice": 9900,
 *           "imageUrl": "https://images.unsplash.com/photo-1527181467037-80564ba4ac51?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
 *           "brandImageUrl": null,
 *           "category": {
 *               "id": 1,
 *               "category": "Clothing"
 *           }
 *       },
 *       {
 *           "id": 3,
 *           "type": "Clothing",
 *           "title": "남성 가을 점퍼 사파리 바람막이점퍼",
 *           "subTitle": null,
 *           "brandName": null,
 *           "price": 39000,
 *           "discountPercentage": 25,
 *           "discountPrice": 29250,
 *           "imageUrl": "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1590&q=80",
 *           "brandImageUrl": null, 
 *           "category": {
 *               "id": 1,
 *               "category": "Clothing"
 *                     }
 *                 }
 *             ]
 *                }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page or limit values:
 *                   summary: Invalid page or limit values
 *                   value:
 *                     message: 'Invalid page or limit values'
 *
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/ranking:
 *     get:
 *       tags:
 *         - v1
 *       summary: 랭킹 상품 조회
 *       description: 카테고리별 or 전체 10개의 랭킹 상품을 가져 옵니다. 
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: category
 *           in: query
 *           description: 카테고리 id. 해당 카테고리에 해당하는 제품만 반환됩니다.
 *           required: false
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 {
 *                 "category": 4,
 *                 "items": [
 *                   {
 *                      상품 리스트 : "전체 상품 조회를 참조하세요."
 *                   }
 *                 ]
 *                }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page or limit values:
 *                   summary: Invalid page or limit values
 *                   value:
 *                     message: 'Invalid page or limit values'
 *
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/search:
 *     get:
 *       tags:
 *         - v1
 *       summary: 검색 상품 조회
 *       description: 검색어가 제목에 포함된 상품 리스트를 보여줍니다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: query
 *           in: query
 *           description: 검색어.
 *           required: true
 *           schema:
 *             type: string
 *         - name: page
 *           in: query
 *           description: 조회할 페이지 번호. 제공되지 않으면 기본값은 1입니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 1
 *           example: 1
 *         - name: limit
 *           in: query
 *           description: 페이지당 가져올 상품의 수. 제공되지 않으면 기본값은 10입니다. 
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 10
 *           example: 10
 *         - name: category
 *           in: query
 *           description: 카테고리 id. 해당 카테고리에 해당하는 제품만 반환됩니다. 없으면 전체 상품 입니다.
 *           required: false
 *           schema:
 *             type: integer
 *         - name: minPrice
 *           in: query
 *           description: 필터 가격 범위를 설정한다. minPrice, maxPrice 둘다 설정 되어야하며, 잘못 설정되면 적용되지 않습니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 0
 *             maximum: 10000000000

 *         - name: maxPrice
 *           in: query
 *           description: 필터 가격 범위를 설정한다. minPrice, maxPrice 둘다 설정 되어야하며, 잘못 설정되면 적용되지 않습니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             maximum: 10000000000 

 *         - name: minDiscount
 *           in: query
 *           description: 필터 할인 범위를 설정한다. minDiscount, maxDiscount 둘다 설정 되어야하며, 잘못 설정되면 적용되지 않습니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 0
 *             maximum: 100 

 *         - name: maxDiscount
 *           in: query
 *           description: 필터 할인 범위를 설정한다. minDiscount, maxDiscount 둘다 설정 되어야하며, 잘못 설정되면 적용되지 않습니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             maximum: 100 

 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 {
 *                   "maxPage": 2,
 *                   "totalItems": 20,
 *                   "currentPage": 1,
 *                   "currentLimit": 10,
 *                   "next": true,
 *                 "items": [
 *                   {
 *                      상품 리스트 : "전체 상품 조회를 참조하세요."
 *                   }
 *                 ]
 *                }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page or limit values:
 *                   summary: Invalid page or limit values
 *                   value:
 *                     message: 'Invalid page or limit values'
 *         '404':
 *           description: NoSearchKeyword
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'No search Keyword',
 *                   }
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/detail/{id}:
 *     get:
 *       tags:
 *         - v1
 *       summary: 상품 상세 조회
 *       description: 상품 상세 정보를 가져 옵니다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: 상품 아이디.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                {
 *                 "id": 1,
 *                 "category": {
 *                   "id": 1,
 *                   "category": "Clothing"
 *                 },
 *                 "like": 146155,
 *                 "info": "<h1>PALESTIME 후드</h1> <p>초보자도 스타일링하기 쉬운 아이템입니다.</p> <p>언제나 트렌디하게 연출 가능한 제품입니다.</p> <p>다가오는 시즌에 필수로 갖춰야 할 아이템입니다.</p> <p>다양한 코디에 활용하기 좋은 유니버설한 디자인입니다.</p> <p>세련된 무드를 연출하는 데 필수품입니다.</p> <p>심플하면서도 세련된 디자인으로 다양한 스타일에 매칭이 가능합니다.</p> <p>부드러운 소재가 피부에 닿는 순간의 기분 좋은 느낌을 줍니다.</p>",
 *                 "purchaseStatus": {
 *                   "totalSales": 147723,
 *                   "satisfaction": "3.5",
 *                   "age": {
 *                     "type1": 4,
 *                     "type2": 60,
 *                     "type3": 18,
 *                     "type4": 16,
 *                     "type5": 2
 *                   },
 *                   "gender": {
 *                     "man": 18,
 *                     "woman": 82
 *                   }
 *                 },
 *                 "title": "PALESTIME 후드",
 *                 "subTitle": null,
 *                 "brandName": null,
 *                 "price": 135000,
 *                 "discountPercentage": 35,
 *                 "discountPrice": 87750,
 *                 "imageUrl": "https://images.unsplash.com/photo-1620767462938-c08d893e96ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
 *                 "brandImageUrl": null
 *               }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page id:
 *                   summary: Invalid page id
 *                   value:
 *                     message: 'Invalid page id'
 *         '404':
 *           description: NotFound
 *           content:
 *             application/json:
 *               examples:
 *                Not found product:
 *                  summary: Not found product
 *                  value:
 *                    message: 'Not found product'
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/purchase/review/{id}:
 *     get:
 *       tags:
 *         - v1
 *       summary: 상품 구매 리뷰 조회
 *       description: 상품 구매 리뷰 조회 정보를 가져 옵니다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: 상품 아이디.
 *           required: true
 *           schema:
 *             type: integer
 *         - name: page
 *           in: query
 *           description: 조회할 페이지 번호. 제공되지 않으면 기본값은 1입니다.
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 1
 *           example: 1
 *         - name: limit
 *           in: query
 *           description: 페이지당 가져올 상품의 수. 제공되지 않으면 기본값은 10입니다. 
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             default: 10
 *           example: 10
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 {
 *                   "maxPage": 37,
 *                   "totalItems": 109,
 *                   "currentPage": 1,
 *                   "currentLimit": 3,
 *                   "next": true,
 *                   "items": [
 *                     {
 *                       "id": 24,
 *                       "productId": 1,
 *                       "rating": 4,
 *                       "writer": "AS68",
 *                       "content": "사진이나 설명 그대로의 제품입니다. 가격 대비 훌륭해요. 사용하기 편리합니다."
 *                     },
 *                     {
 *                       "id": 119,
 *                       "productId": 1,
 *                       "rating": 2,
 *                       "writer": "fGWwLOySr",
 *                       "content": "다시는 구매하지 않을 것 같아요. 재구매의사는 없습니다. 구매를 후회하고 있습니다."
 *                     },
 *                     {
 *                       "id": 150,
 *                       "productId": 1,
 *                       "rating": 3,
 *                       "writer": "if8ETUt",
 *                       "content": "약간의 불만은 있습니다. 가격 대비 괜찮아요. 그저 그렇습니다."
 *                     }
 *                   ]
 *                 }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page or limit values or id:
 *                   summary: Invalid page or limit values / Invalid page id
 *                   value:
 *                     message: 'Invalid page or limit values / Invalid page id'
 *         '404':
 *           description: NotFound
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Not found product',
 *                   }
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/recommendation:
 *     get:
 *       tags:
 *         - v1
 *       summary: 추천 상품 조회
 *       description: 10개의 추천 상품을 가져 옵니다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: category
 *           in: query
 *           description: 카테고리 id. 해당 카테고리에 해당하는 제품만 반환됩니다. 없으면 전체 상품 입니다.
 *           required: false
 *           schema:
 *             type: integer
 *         - name: type
 *           in: query
 *           description: 추천 타입 1. 좋아요 순 2. 만족도 순 .
 *           required: false
 *           schema:
 *             type: integer
 *             minimum: 1
 *             maximum: 2
 *             default: 1
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 {
 *                   "category": 2,
 *                   "type": 1,
 *                  "items": [
 *                   {
 *                      상품 리스트 : "전체 상품 조회를 참조하세요."
 *                   }
 *                 ]
 *                }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid page or limit values:
 *                   summary: Invalid page or limit values
 *                   value:
 *                     message: 'Invalid page or limit values'
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 *   /api/v1/recommendation/{id}:
 *     get:
 *       tags:
 *         - v1
 *       summary: 상품 기반 추천 상품 리스트
 *       description: 상품 기반 추천 상품 리스트 10를 가져 온다.
 *       produces:
 *         - application/json
 *       parameters:
 *         - name: id
 *           in: path
 *           description: 상품 아이디.
 *           required: true
 *           schema:
 *             type: integer
 *       responses:
 *         '200':
 *           description: Successful operation
 *           content:
 *             application/json:
 *               example:
 *                 {
 *                   "category": 2,
 *                   "type": 1,
 *                  "items": [
 *                   {
 *                      상품 리스트 : "전체 상품 조회를 참조하세요."
 *                   }
 *                 ]
 *                }
 *         '400':
 *           description: Bad request
 *           content:
 *             application/json:
 *               examples:
 *                 Invalid id values:
 *                   summary: Invalid id
 *                   value:
 *                     message: 'Invalid id'
 *         '404':
 *           description: NotFound
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Not found product',
 *                   }
 *         '500':
 *           description: InternalServerError
 *           content:
 *             application/json:
 *               example:
 *                   {
 *                      message: 'Internal Server Error',
 *                   }
 */

