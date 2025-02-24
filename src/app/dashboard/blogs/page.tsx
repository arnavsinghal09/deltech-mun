import React from "react";
import BlogList from "../../../components/custom/BlogList";
import SearchInputField from "../../../components/custom/SearchInputField";
import { SelectDropdown } from "../../../components/custom/SelectDropdown";


export default function BlogListingPage() {
  const options = [
    { label: "Most Popular", value: "mostPopular" },
    { label: "Most Recent", value: "mostRecent" },
  ];
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto px-4 py-8">
        <div className="text-4xl font-bold mb-8 text-center">Our Blog</div>
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <SearchInputField />
          <SelectDropdown options={options} value="" placeholder="Sort according to..."/>
        </div>
        <BlogList />
      </div>
    </div>
  );
}
