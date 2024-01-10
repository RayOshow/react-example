const { product } = require("../productData");

const fs = require('fs');

const randomSelectRange = (start, end, num) => {
  const rangeArray = [];
  for (let i = start; i <= end; i++) {        
      rangeArray.push(product[i]);
  }

  const randomSelected = [];
  for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * rangeArray.length);
      randomSelected.push(rangeArray.splice(randomIndex, 1)[0]);
  }

  return randomSelected;
};

const newArray = [
  ...randomSelectRange(0, 24, 10),
  ...randomSelectRange(25, 49, 10),
  ...randomSelectRange(50, 74, 10),
  ...randomSelectRange(75, 99, 10)
];

function shuffleArray(array) {
  
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

shuffleArray(newArray);

// json 형태로 만들되, 다만 key는 문자열 형태로 두지 않는다.
const jsonString = JSON.stringify(newArray, null, 2);
const formattedString = jsonString.replace(/"([^"]+)":/g, '$1:');
const exportString = `module.exports = {\n  ranking: ${formattedString}\n};`;

// 파일에 저장
fs.writeFileSync('../rankingData.js', exportString);