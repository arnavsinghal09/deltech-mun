import React from "react";

const FeaturedBlogs = () => {
  return (
    <div className="max-w-7xl py-20 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Latest Insights
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore thought-provoking articles written by our members on global
          affairs and diplomacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-lg transition"
          >
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={`https://source.unsplash.com/random/100x100?portrait,${i}`}
                alt="Author"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Head Delegate</p>
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              The Future of International Diplomacy in a Digital Age
            </h3>
            <p className="text-gray-600 mb-4">
              Exploring how technology is reshaping diplomatic relations and
              global governance...
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">5 min read</span>
              <button className="text-blue-600 font-medium hover:text-blue-700">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedBlogs;
