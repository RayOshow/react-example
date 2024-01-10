module.exports = {
  categories: {
    product: [
      {
        id: 1,
        category: "Clothing",
        title: "의류",
        imageUrl:
          "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 2,
        category: "Pet",
        title: "반려동물",
        imageUrl:
          "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&q=80&w=1886&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 3,
        category: "Glasses",
        title: "안경",
        imageUrl:
          "https://images.unsplash.com/photo-1614715838608-dd527c46231d?auto=format&fit=crop&q=80&w=1588&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
      {
        id: 4,
        category: "Shoes",
        title: "신발",
        imageUrl:
          "https://images.unsplash.com/photo-1619646176605-b7417fb53b1e?auto=format&fit=crop&q=80&w=1587&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      },
    ],
    searchFilter: {
      price: [
        {
          id: 1,
          min: 1,
          max: 200000 - 1,
        },
        {
          id: 2,
          min: 200000,
          max: 400000 - 1,
        },
        {
          id: 3,
          min: 400000,
          max: 1000000 - 1,
        },
        {
          id: 4,
          min: 1000000,
          max: 9999999999,
        },
      ],
      discount: [        
        {
          id: 1,
          min: 1,
          max: 25 - 1,
        },
        {
          id: 2,
          min: 25,
          max: 50 - 1,
        },
        {
          id: 3,
          min: 50,
          max: 75 - 1,
        },
        {
          id: 4,
          min: 75,
          max: 100,
        },
      ],
    },
    recomType: [
      {
        id: 1,
        // 구매 많은 순
        type: "purchase",
      },
      {
        id: 2,
        // 좋아요 많은 순
        type: "discount",
      },
    ],
    ageType: [
      {
        id: 1,
        type: "type1",
        description: "~18세"
      },
      {
        id: 2,
        type: "type2",
        description: "19~28세"
      },
      {
        id: 3,
        type: "type3",
        description: "29~38세"
      },
      {
        id: 4,
        type: "type4",
        description: "39~48세"
      },
      {
        id: 5,
        type: "type5",
        description: "49세~"
      },
    ]
  },
};
