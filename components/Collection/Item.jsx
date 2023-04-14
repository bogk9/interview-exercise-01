"use client";
import {
  editItemTitle,
  likeItem,
  removeItem,
} from "@/redux/actions/collection";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  IconButton,
  Popover,
  PopoverContent,
  PopoverHandler,
  Input,
} from "../Material";

function Edit({ id, title }) {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    dispatch(editItemTitle(id, data.name));
    setIsOpen(false);
  };

  return (
    <Popover
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
      handler={() => setIsOpen(true)}
      className="z-50"
      open={isOpen}
    >
      <PopoverHandler>
        <IconButton variant="gradient">
          <i className="fa-solid fa-pen-to-square"></i>
        </IconButton>
      </PopoverHandler>
      <PopoverContent className="z-50">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-2">
            <div className="relative flex w-full">
              <Input
                {...register("name", { required: true })}
                type="text"
                className="pr-20"
                defaultValue={title}
                placeholder="ex. Mars"
              />
              <Button
                size="sm"
                color="blue"
                disabled={errors?.searchTerm}
                className="!absolute right-1 top-1 rounded"
                type="submit"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                OK
              </Button>
            </div>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}

Edit.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default function Item({ id, title, href, isLiked }) {
  const dispatch = useDispatch();
  const handleDelete = () => dispatch(removeItem(id));
  const handleLike = () => dispatch(likeItem(id));

  return (
    <Card className="w-[48rem] mt-10">
      <CardHeader className="h-32 w-[9.5rem] ml-auto mr-auto">
        <img src={href} alt="profile-picture" className="w-full h-full" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <div className="flex justify-center gap-2">
          <IconButton color={isLiked ? "red" : "blue"} onClick={handleLike}>
            <i className="fas fa-heart" />
          </IconButton>
          <Edit id={id} title={title} />
          <IconButton onClick={handleDelete}>
            <i className="fa-sharp fa-solid fa-trash"></i>
          </IconButton>
        </div>
      </CardBody>
    </Card>
  );
}

Item.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
};
