import React, { useState } from "react";
import { Search, Filter, Star, SlidersHorizontal, MapPin } from "lucide-react";
import "../assets/css/exploreStore.css";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [distance, setDistance] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [expressLaundry, setExpressLaundry] = useState("");
  const [stores, setStores] = useState<StoreData[]>([
    { name: "Store 1", address: "123 Main St", rating: 4.5, distance: 5, category: "Wash", expressLaundry: true, price: "200"},
    { name: "Store 2", address: "456 Elm St", rating: 3.8, distance: 20, category: "Wash", expressLaundry: false, price: "200"},
    { name: "Store 3", address: "456 Elm St", rating: 3.8, distance: 20, category: "Wash", expressLaundry: false, price: "200"},
    { name: "Store 4", address: "456 Elm St", rating: 3.8, distance: 20, category: "Wash", expressLaundry: false, price: "200"},
    { name: "Store 5", address: "456 Elm St", rating: 3.8, distance: 20, category: "Wash", expressLaundry: false, price: "200"},
    { name: "Store 6", address: "456 Elm St", rating: 3.8, distance: 20, category: "Wash", expressLaundry: false, price: "200"},
    // Add more dummy store data as needed
  ]);
  const [isSortingPopupOpen, setIsSortingPopupOpen] = useState<boolean>(false);

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating === selectedRating ? null : rating);
  };

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      // Check if the current star should be filled
      const filled = i <= rating;
      stars.push(
        <Star
          key={i}
          size={20}
          className={`cursor-pointer ${
            filled ? "text-yellow-500" : "text-black"
          }`}
          onClick={() => handleStarClick(i)}
        />
      );
    }
    return stars;
  };

  const handleExpressLaundryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpressLaundry(event.target.value);
  };

  const handleFilterApply = () => {
    setIsFilterOpen(false);

    // Filter stores based on selected filters
    let filteredStores = [...stores];

    // Filter by distance
    filteredStores = filteredStores.filter((store) => {
      // Convert distance to meters if needed (1 km = 1000 meters)
      const distanceInMeters = distance * 1000;
      // Implement distance filter logic here
      // For example, if the store's distance is less than or equal to the selected distance
      return store.distance <= distanceInMeters;
    });

    // Filter by category
    if (selectedCategory) {
      filteredStores = filteredStores.filter((store) => {
        // Implement category filter logic here
        // For example, if the store's category matches the selected category
        return store.category === selectedCategory;
      });
    }

    // Filter by rating
    if (selectedRating !== null) {
      filteredStores = filteredStores.filter((store) => {
        // Implement rating filter logic here
        // For example, if the store's rating is greater than or equal to the selected rating
        return store.rating >= selectedRating;
      });
    }

    // Filter by express laundry
    if (expressLaundry !== "") {
      filteredStores = filteredStores.filter((store) => {
        // Implement express laundry filter logic here
        // For example, if the store offers express laundry and the selected option is 'Yes'
        return store.expressLaundry === (expressLaundry === "Yes");
      });
    }

    // Update the stores state with filtered data
    setStores(filteredStores);
  };

  const handleFilterReset = () => {
    setDistance(0);
    setSelectedCategory(null);
    setSelectedRating(null);
    setExpressLaundry("");
  };

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
    <div className="App">
      {/* Search bar */}
      <div className="flex items-center justify-between py-4">
        <div className="exploreStoreSearchContainer">
          <Search className="exploreStoreSearchBtn" size={30} />
          <input
            type="text"
            placeholder="Search"
            className="exploreStoreSearchField"
          />
        </div>
        <Filter
          className="cursor-pointer"
          size={30}
          onClick={handleFilterClick}
        />
      </div>

      {/* Filter popup */}
      {isFilterOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Filter</h2>
            <div className="mb-4">
              <label htmlFor="distanceFromUser" className="block mb-1">
                Distance (km)
              </label>
              <input
                type="range"
                min={0}
                max={10}
                id="distanceFromUser"
                value={distance}
                onChange={handleDistanceChange}
                className="w-full"
              />
            </div>
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-2">
                Filter by Category:
              </h2>
              <div className="flex items-center">
                {[
                  "Wash and Iron",
                  "Wash and Fold",
                  "Ironing",
                  "Dry Clean",
                  "Shoe Clean",
                  "Home textile",
                ].map((category, index) => (
                  <label key={index} className="mr-4 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => handleCategoryFilter(category)}
                      className="mr-1"
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
            <div className="py-4">
              <h2 className="text-lg font-semibold mb-2">Filter by Rating:</h2>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((rating, index) => (
                  <div
                    key={index}
                    className="mr-4 cursor-pointer"
                    onClick={() => handleRatingFilter(rating)}
                  >
                    {renderStars(rating)}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Express Laundry</label>
              <select
                value={expressLaundry}
                onChange={handleExpressLaundryChange}
                className="w-full border border-gray-300 rounded-lg py-1 px-2 focus:outline-none"
              >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleFilterReset}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Reset
              </button>
              <button
                onClick={handleFilterApply}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explore by category section */}
      <h2 className="exploreStoreSubHeading mt-8">Explore by category</h2>
      <div className="grid grid-cols-3 gap-8 mt-8 exploreCatCards">
        {[
          "Wash and Iron",
          "Wash and Fold",
          "Ironing",
          "Dry Clean",
          "Shoe Clean",
          "Home Textile",
        ].map((category, index) => (
          <div key={index} className="exploreCatCard">
            <h3 className="">{category}</h3>
            <img
              src={`https://via.placeholder.com/300x200?text=${category}`}
              alt={category}
              className=""
            />
          </div>
        ))}
      </div>

      {/* Sort icon */}
      <div className="flex items-center justify-between py-4 mt-10 mb-4">
        <h2 className="exploreStoreSubHeading">all Stores</h2>
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
          <div key={index} className="storeCard">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreStores;
