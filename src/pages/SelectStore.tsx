import React, { useState } from "react";
import { Star, SlidersHorizontal, MapPin, ChevronLeft } from "lucide-react";
import "../assets/css/selectStore.css";
import { Link } from "react-router-dom";

interface StoreData {
  name: string;
  address: string;
  category: string;
  rating: number;
  distance: number;
  expressLaundry: boolean;
  price: string;
}

const ExploreStores: React.FC = () => {
  const [stores, setStores] = useState<StoreData[]>([
    {
      name: "Store 1",
      address: "123 Main St",
      rating: 4.5,
      distance: 5,
      category: "Wash",
      expressLaundry: true,
      price: "200",
    },
    {
      name: "Store 2",
      address: "456 Elm St",
      rating: 3.8,
      distance: 20,
      category: "Wash",
      expressLaundry: false,
      price: "200",
    },
    {
      name: "Store 3",
      address: "456 Elm St",
      rating: 3.8,
      distance: 20,
      category: "Wash",
      expressLaundry: false,
      price: "200",
    },
    {
      name: "Store 4",
      address: "456 Elm St",
      rating: 3.8,
      distance: 20,
      category: "Wash",
      expressLaundry: false,
      price: "200",
    },
    {
      name: "Store 5",
      address: "456 Elm St",
      rating: 3.8,
      distance: 20,
      category: "Wash",
      expressLaundry: false,
      price: "200",
    },
    {
      name: "Store 6",
      address: "456 Elm St",
      rating: 3.8,
      distance: 20,
      category: "Wash",
      expressLaundry: false,
      price: "200",
    },
    // Add more dummy store data as needed
  ]);
  const [isSortingPopupOpen, setIsSortingPopupOpen] = useState<boolean>(false);


  const toggleSortingPopup = () => {
    setIsSortingPopupOpen(!isSortingPopupOpen);
  };

  // Function to handle sorting
  const handleSort = (option: string) => {
    let sortedStores: StoreData[] = [];

    switch (option) {
      case "Price: Low to High":
        sortedStores = stores.slice().sort((a, b) => a.rating - b.rating);
        break;
      case "Price: High to Low":
        sortedStores = stores.slice().sort((a, b) => b.rating - a.rating);
        break;
      case "Rating":
        sortedStores = stores.slice().sort((a, b) => b.rating - a.rating);
        break;
      case "Distance":
        sortedStores = stores.slice().sort((a, b) => b.rating - a.rating);
        break;
      default:
        sortedStores = stores; // Default to original order
    }

    // Update the stores state with sorted data
    setStores(sortedStores);

    // Close the sorting popup
    setIsSortingPopupOpen(false);
  };

  return (
    <main>
      <h1 className="flex items-center">
        <ChevronLeft size={34} className="mr-4" />
        Select store
      </h1>
      <div className="App">
        {/* Sort icon */}
        <div className="flex items-center justify-between py-4 mt-10 mb-4">
          <h2 className="exploreStoreSubHeading">Select store you want</h2>
          <SlidersHorizontal
            className="cursor-pointer"
            onClick={toggleSortingPopup}
            size={30}
          />
          {/* Sorting popup */}
          {isSortingPopupOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
              <ul className="divide-y divide-gray-200">
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("Price: Low to High")}
                >
                  <input type="radio" name="sorting" className="mr-2" />
                  Price: Low to High
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("Price: High to Low")}
                >
                  <input type="radio" name="sorting" className="mr-2" />
                  Price: High to Low
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("Rating")}
                >
                  <input type="radio" name="sorting" className="mr-2" />
                  Rating
                </li>
                <li
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort("Distance")}
                >
                  <input type="radio" name="sorting" className="mr-2" />
                  Distance
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* All stores section */}
        <div className="mt-8 grid grid-cols-3 gap-8 storeCardContainer">
          {stores.map((store, index) => (
            <Link to="/store-about" key={index} className="storeCard">
              <div className="storeCard-img">
                <img
                  src={`https://via.placeholder.com/300x200?text=${store.name}`}
                  alt={store.name}
                />
              </div>
              <div className="storeCard-body">
                <h2 className="text-lg font-semibold">{store.name}</h2>
                <h3 className="text-lg font-semibold storeCard-price">
                  ₹{store.price} /{" "}
                  <span className="text-2xl text-black">Starting</span>
                </h3>
                <p className="text-lg font-semibold">{store.category}</p>
                <p className="text-sm text-gray-600">{store.address}</p>
                <div className="flex items-center mt-2">
                  <Star size={20} className="text-yellow-500 mr-1" />
                  <span>{store.rating}</span>
                </div>
                <p className="flex items-center my-4">
                  <MapPin className="mr-2" />
                  {store.distance}km
                </p>
                <p>Express Laundry: {store.expressLaundry ? "Yes" : "No"}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ExploreStores;
