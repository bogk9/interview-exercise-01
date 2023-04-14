"use client";
import { fetchImages } from "@/redux/actions/search";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
  IconButton,
} from "../Material";
import Skeleton from "./Skeletons";
import anime from "animejs";
import FormItem from "./FormItem";

export default function Form() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const [currentPage, setCurrentPage] = useState(0);
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const itemsPerPage = 2;
  const maxPage = Math.ceil(search.results.length / itemsPerPage);
  const translateX = `-${currentPage * (100 / itemsPerPage)}%`;

  const onSubmit = (data) => {
    dispatch(fetchImages(data.searchTerm));
  };

  const handleNextPage = () => {
    if (currentPage < maxPage - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (visible) {
      const element = elementRef.current;

      anime({
        targets: element,
        opacity: [0, 1],
        scale: [0.5, 2],
        duration: 500,
        marginLeft: "2rem",
        marginTop: "2rem",
        easing: "easeOutSine",
        visible: true,
        keyframes: [
          { maxWidth: 0, duration: 100 },
          { maxWidth: "50%", duration: 200 },
          { maxWidth: "100%", duration: 200 },
        ],
      });
    }
  }, [visible]);

  return (
    <div
      ref={elementRef}
      className={`relative ${
        visible ? "visible" : "invisible"
      } max-w-0 opacity-[0.8] form-container`}
    >
      <div className="flex justify-center ml-0 scale-[0.5]">
        <Card className="bg-gray-200 w-96 ">
          <CardHeader
            variant="gradient"
            color="blue"
            className="grid mb-4 h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Form
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col h-full gap-2 overflow-hidden text-center">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-2">
                <div className="relative flex w-full">
                  <Input
                    {...register("searchTerm", { required: true })}
                    type="text"
                    className="pr-20"
                    placeholder="ex. Venus"
                  />
                  <Button
                    size="sm"
                    color="blue"
                    disabled={errors?.searchTerm}
                    className="!absolute right-1 top-1 rounded"
                    type="submit"
                  >
                    Search
                  </Button>
                </div>
                <Typography>
                  {search.error || errors?.searchTerm || ""}
                </Typography>
              </div>
            </form>
            <div className="relative flex-1 overflow-hidden">
              <div
                className="flex flex-1 gap-2 mt-1 mb-1 transition-transform duration-300"
                style={{ transform: `translateX(${translateX})` }}
              >
                {search.results.length === 0 && (
                  <Skeleton animated={search.loading} />
                )}
                {search.results.map((result, index) => (
                  <FormItem
                    id={result.id}
                    href={
                      Array.isArray(result?.links)
                        ? result?.links[0]?.href
                        : result?.links?.href
                    }
                    title={result?.data[0]?.title}
                    key={index}
                  />
                ))}
              </div>
            </div>
            <div className="flex justify-between gap-4">
              <Button onClick={handlePrevPage} disabled={currentPage === 0}>
                <i className="fa-solid fa-left-long"></i>
              </Button>
              <Button
                onClick={handleNextPage}
                disabled={currentPage === maxPage - 1}
              >
                <i className="fa-solid fa-right-long"></i>
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <button
        className={`absolute visible text-black bg-white pl-8 pr-8 pt-6 pb-6 rounded-[50%] z-50 bottom-[90%] left-[-2.55rem] md:bottom-[45%] lg:bottom-[45%] xl:bottom-[45%] 2xl:bottom-[45%] lg:left-3 xl:left-3 2xl:left-3 ${
          visible ? "hidden" : ""
        }`}
        onClick={() => setVisible(true)}
      >
        <i className="fa-solid fa-plus"></i>
      </button>
    </div>
  );
}
