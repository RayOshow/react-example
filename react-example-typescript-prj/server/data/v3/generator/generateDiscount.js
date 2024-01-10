const fs = require("fs");
const { product } = require("../productData");

product.forEach((ele) => {
  if (
    typeof ele.discountPercentage === "number" &&
    ele.discountPercentage >= 0
  ) {
    ele["discountPrice"] = Math.floor(
      ele.price - (ele.price * ele.discountPercentage) / 100,
    );
  }
});

// json 형태로 만들되, 다만 key는 문자열 형태로 두지 않는다.
const jsonString = JSON.stringify(product, null, 2);
const formattedString = jsonString.replace(/"([^"]+)":/g, "$1:");
const exportString = `module.exports = {\n  product: ${formattedString}\n};`;

// 파일에 저장
fs.writeFileSync("../productData.js", exportString);
