async function getPuchaseData (req, res) {
  const naverProduct = await axios
    .get(`https://openapi.naver.com/v1/search/shop.json`, {
      params: {
        query: '신발 shopping',
        display: 25,
        filter: 'naverpay',
      },
      headers: {
        'X-Naver-Client-Id': '',
        'X-Naver-Client-Secret': '',
      },
    })
    .then((res) => {
      const fetchData = res.data.items;
      console.log(fetchData[0])

      const products = fetchData.map((product, index) => {
        const schema = {
          id: index+76,
          type: 'Shoes',
          title: product.title,
          sub_title: null,
          brand_name: null,
          price: product.lprice,
          discountPercentage:
            discountPercentageArr[Math.floor(Math.random() * discountPercentageArr.length)],
          image_url: product.image,
          link: product.link,
          brand_image_url: null,
          category: { id: 4, category: 'Shoes' },
        };
        return schema;
      });
      return products;
    });

    console.log(naverProduct)

  return res.json(naverProduct);
}