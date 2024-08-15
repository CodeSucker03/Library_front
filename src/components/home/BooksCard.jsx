import React from "react";
import BookSingleCard from "./BookSingleCard";
const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 pt-24">
      {books.map((item) => (
       <BookSingleCard key={item.ISBN} book={item}></BookSingleCard>
      //  <BookSingleCard key={item._id} book={item}></BookSingleCard>
      ))}
    </div>
  );
};

export default BooksCard;
