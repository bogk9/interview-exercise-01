"use client";
import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@/components/Material";

export default function InfoDialog() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <>
      <button
        className="flex items-center"
        onClick={handleOpen}
        variant="gradient"
      >
        <i className="text-3xl fa-solid fa-circle-info"></i>
      </button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>About this application</DialogHeader>
        <DialogBody divider>
          <p>A React app developed for a company&apos;s recruitment task.</p>
          <p> 🖼️ Framework: Next.js</p>
          <p>📚 Logic: React, Redux Toolkit, Redux Persist, React Hook Form</p>
          <p>🎨 Styling: Tailwind CSS, Material Tailwind, Anime.js</p>
          <p>🧑‍🎓 Repo: <a href="https://github.com/bogk9/interview-exercise-01.git">github.com/bogk9/interview-exercise-01.git</a></p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
