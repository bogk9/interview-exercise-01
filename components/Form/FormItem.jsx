"use client";
import { addItem } from "@/redux/actions/collection";
import { useDispatch } from "react-redux";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  IconButton,
} from "../Material";

export default function FormItem({ id, href }) {
  const dispatch = useDispatch();
  return (
    <Card className="min-w-[10rem] mt-10">
      <CardHeader className="relative h-24">
        <img src={href} alt="Image" className="w-full h-full" />
      </CardHeader>
      <CardBody className="p-2 text-center">
        <Typography variant="h4" color="blue-gray" className="mb-2">
          <IconButton
            onClick={() =>
              dispatch(
                addItem({
                  id,
                  title: `Body${Math.floor(Math.random() * 1000)}`,
                  href,
                })
              )
            }
          >
            <i className="fa-solid fa-plus"></i>
          </IconButton>
        </Typography>
      </CardBody>
    </Card>
  );
}
