"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "../Material";
import Item from "./Item";

export default function Collection() {
  const collection = useSelector((state) => state.collection.items);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const maxPage = Math.ceil(collection.length / itemsPerPage);
  const translateX = `-${2 * currentPage * (100 / itemsPerPage)}%`;

  const handleNextPageClick = () => {
    if (currentPage < maxPage - 1) setCurrentPage(currentPage + 1);
  };

  const handlePrevPageClick = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    if (currentPage > maxPage - 1) setCurrentPage(maxPage - 1);
  }, [currentPage, maxPage]);

  return (
    <div className="flex justify-center lg:h-[32rem] z-[70]">
      <Card className="bg-gray-200 w-[27rem]">
        <CardHeader
          variant="gradient"
          color="blue"
          className="grid mb-4 h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Collection
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col h-full gap-2 overflow-hidden text-center">
          <div className="relative flex-1 overflow-hidden">
            <div
              className="flex gap-2 mt-1 mb-1 transition-transform duration-300"
              style={{ transform: `translateX(${translateX})` }}
            >
              {collection.map((item, index) => (
                <Item
                  id={item.id}
                  title={item.title}
                  href={item.href}
                  isLiked={item.isLiked}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between gap-4">
            <Button
              onClick={handlePrevPageClick}
              disabled={currentPage === 0 || maxPage === 0}
            >
              <i className="fa-solid fa-left-long"></i>
            </Button>
            <Button
              onClick={handleNextPageClick}
              disabled={currentPage === maxPage - 1}
            >
              <i className="fa-solid fa-right-long"></i>
            </Button>
          </div>
        </CardBody>
        <CardFooter
          divider
          className="flex items-center justify-between py-3 border-t-gray-300"
        >
          <Typography variant="small">
            {collection.length || "no"} items
          </Typography>
          <Typography variant="small" color="gray" className="flex gap-1">
            page {maxPage ? currentPage + 1 : "0"} of {maxPage}
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

Collection.propTypes = {
  collection: PropTypes.shape({
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        isLiked: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
};
