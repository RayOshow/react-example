const fs = require('fs');

// 각 점수 대 별로 3개의 문장을 조합하여 리뷰 생성
const ratingSentences = {
  1: [
      "구매를 후회하고 있습니다.",
      "돈이 아까워요.",
      "제품 퀄리티가 많이 떨어집니다.",
      "다시는 구매하지 않을 것 같아요.",
      "기대하진 말아야겠어요.",
      "평가가 너무 높았나봐요.",
      "사진과는 다르게 보여요.",
      "색상이나 텍스처가 이상해요.",
      "배송이 너무 느렸습니다.",
      "고객 서비스에 불만이 있어요."
  ],
  2: [
      "그냥 그래요.",
      "다른 제품이 더 좋을 것 같아요.",
      "중간 이상의 퀄리티는 아니에요.",
      "뭔가 빠진 느낌이 드네요.",
      "재구매의사는 없습니다.",
      "설명대로 작동하지 않아요.",
      "사용하기 불편해요.",
      "조금 실망스럽습니다.",
      "제품이 고장 났어요.",
      "설명서가 불친절해요."
  ],
  3: [
      "그저 그렇습니다.",
      "보통입니다.",
      "다른 제품도 고려해봐야겠어요.",
      "그럭저럭 사용하고 있어요.",
      "중간 정도의 만족도입니다.",
      "특별한 감정은 없네요.",
      "가격 대비 괜찮아요.",
      "약간의 불만은 있습니다.",
      "다시 구매하진 않을 것 같아요.",
      "평범한 제품이에요."
  ],
  4: [
      "만족합니다.",
      "다음에도 구매하고 싶어요.",
      "제품이 생각보다 좋네요.",
      "가격 대비 훌륭해요.",
      "퀄리티가 상당히 좋습니다.",
      "제품 설명이 정확해요.",
      "사용하기 편리합니다.",
      "배송이 빨랐어요.",
      "고객 서비스도 만족스럽습니다.",
      "색상과 디자인이 이쁩니다."
  ],
  5: [
      "아주 좋아요!",
      "완벽합니다!",
      "매우 만족하며 사용중입니다.",
      "누구에게나 추천하고 싶어요.",
      "5점을 주고 싶은 제품이에요.",
      "퀄리티, 가격 모두 만족!",
      "가장 좋은 선택이었어요.",
      "다음에도 이 제품만 구매할 것 같아요.",
      "제품 사용 후 기분이 좋아요.",
      "사진이나 설명 그대로의 제품입니다."
  ]
};

/**
 * 점수에 맞는 문장을 3개 조합한다.
 */
const getRandomRatingContent = (rating) => {
  let selectedRating;

  // 1~2점 : 나쁜 평
  // 3점 : 보통 평
  // 4~5점 : 좋은 평
  if (rating === 1 || rating === 2) {
      selectedRating = ratingSentences[1].concat(ratingSentences[2]);
  } else if (rating === 3) {
      selectedRating = ratingSentences[3];
  } else {
      selectedRating = ratingSentences[4].concat(ratingSentences[5]);
  }

  /* 
     Math.random()은 0~1.0 사이의 값, 0.5에서 빼게 되면 음수 or 양수가 매번 바뀌게 된다.
   */
  const shuffledSentences = selectedRating.sort(() => 0.5 - Math.random());
  return shuffledSentences.slice(0, 3).join(' ');
};

// 아이디 조합기
const generatePrRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  // 최소 아이디 수는 4
  const finalLength = Math.max(4, length);
  let result = '';
  for (let i = 0; i < finalLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

const generatePrRandomData = (start, end) => {
  const data = [];

  for (let i = start; i <= end; i++) {
      const rating = Math.floor(Math.random() * 5) + 1;  // 1~5
      const productId = Math.floor(Math.random() * 100) + 1;  // 1~100
      const writerLength = Math.floor(Math.random() * 10) + 1; // 0~10
      const writer = generatePrRandomString(writerLength);  // 랜덤 0~14자리 숫자+영문
      const content = getRandomRatingContent(rating);

      data.push({
          id: i,
          productId,
          rating,
          writer,
          content
      });
  }

  return data;
};

// 1개 상품 당 100개 씩 총 10000개
const writeData = generatePrRandomData(1,10000);

// json 형태로 만들되, 다만 key는 문자열 형태로 두지 않는다.
const jsonString = JSON.stringify(writeData, null, 2);
const formattedString = jsonString.replace(/"([^"]+)":/g, '$1:');
const exportString = `module.exports = {\n  purchaseReview: ${formattedString}\n};`;

// 파일에 저장
fs.writeFileSync('../purchaseReviewData.js', exportString);

