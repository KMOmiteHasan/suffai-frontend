import React, { useState } from "react";
import { Plus, Minus, Search } from "lucide-react";

const buttons = [
  "Wash and Iron",
  "Wash and Fold",
  "Ironing",
  "Dry Clean",
  "Shoe Clean",
  "Home Textile",
];

const cardItems = [
  { id: 1, name: "Shirt", imageUrl: "shirt.png" },
  { id: 2, name: "Pant", imageUrl: "pant.png" },
  { id: 3, name: "T-shirt", imageUrl: "tshirt.png" },
  { id: 4, name: "Salwar", imageUrl: "salwar.png" },
  { id: 5, name: "Shirt", imageUrl: "shirt.png" },
  { id: 6, name: "Pant", imageUrl: "pant.png" },
  { id: 7, name: "T-shirt", imageUrl: "tshirt.png" },
  { id: 8, name: "Salwar", imageUrl: "salwar.png" },
  { id: 9, name: "Shirt", imageUrl: "shirt.png" },
  { id: 10, name: "Pant", imageUrl: "pant.png" },
];

const PrepareBasket: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  const handleIncrement = (id: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleDecrement = (id: number) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 grid grid-cols-3 gap-2 w-full">
        {buttons.map((button, index) => (
          <button
            key={index}
            className="bg-blue-500 text-white py-4 px-4 text-4xl rounded-full"
          >
            {button}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="exploreStoreSearchContainer">
          <Search className="exploreStoreSearchBtn" size={30} />
          <input
            type="text"
            placeholder="Search"
            className="exploreStoreSearchField"
          />
        </div>
      </div>

      <h2 className="exploreStoreSubHeading mt-4 mb-8">Explore by category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {cardItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-2xl p-8 flex flex-col items-center"
          >
            <img
              src={`https://via.placeholder.com/300x200?text=${item.name}`}
              alt={item.name}
              className="mb-2 w-full rounded-2xl object-cover"
            />
            <div className="mb-2 text-4xl my-8">{item.name}</div>
            <div className="flex items-center">
              <button
                onClick={() => handleDecrement(item.id)}
                className="bg-gray-300 text-gray-700 p-2 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="mx-4 text-2xl">{counts[item.id] || 0}</span>
              <button
                onClick={() => handleIncrement(item.id)}
                className="bg-gray-300 text-gray-700 p-2 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrepareBasket
