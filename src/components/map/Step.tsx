"use client";

import { useRef, useState } from "react";
import { motion, useScroll } from "framer-motion";
import _ from "lodash";

import { Step as StepType } from "@allTypes";
import { instructionIcon } from "@assets/data/dashboard/entry/map";
import { Clock, Distance } from "@icons";

type Props = {
  step: StepType;
  last: boolean;
  destination: string;
};

const Step: React.FC<Props> = ({ step, last, destination }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 0.9", "1 0.9"],
  });
  const [firstRender, setFirstRender] = useState(true);

  scrollYProgress.on("change", (latest) => {
    if (firstRender && latest > 0)
      setTimeout(() => {
        setFirstRender(false);
      }, 150);
  });

  return (
    <motion.div
      ref={ref}
      className="relative group grid grid-cols-[auto_1fr] grid-rows-1 gap-x-4 py-8"
      initial="hidden"
      animate={scrollYProgress.get() > 0 ? "visible" : "hidden"}
    >
      <div className="z-40">
        <figure>
          <svg
            height={75}
            width={75}
            viewBox="0 0 100 100"
            transform="rotate(-90)"
          >
            <motion.circle
              cx={75}
              cy={50}
              r={10}
              className="group-odd:fill-red-500 group-even:fill-green-500 group-[:nth-of-type(3n)]:fill-yellow-500"
              variants={
                firstRender
                  ? timelineCircleVariantsOnce
                  : timelineCircleVariants
              }
            ></motion.circle>
          </svg>
        </figure>
      </div>

      <div className="flex flex-col gap-1.5 pt-2">
        <div className="flex gap-2 items-center">
          {instructionIcon.map((item, index) =>
            _.some(item.instructions, (instruction) =>
              step.instruction.toLowerCase().includes(instruction)
            ) ? (
              <item.icon key={index} />
            ) : null
          )}
          <div className="text-medium font-medium">
            {last ? (
              <div>
                <p>{`Arrive at ${destination}`}</p>
              </div>
            ) : (
              <p>{step.instruction}</p>
            )}
          </div>
        </div>

        <div className="pl-7 flex flex-col gap-1 text-small">
          {last ? (
            <p className="capitalize">
              {step.instruction.split("Arrive at").at(-1)}
            </p>
          ) : null}

          {step.duration && step.distance ? (
            <>
              <div className="flex gap-1 items-center">
                <Distance className="h-4 w-4" />
                <div className="flex gap-1">
                  <span className="font-medium capitalize">Distance:</span>
                  <span>
                    {step.distance > 1000
                      ? `${(step.distance / 1000).toFixed(2)} km`
                      : `${step.distance} m`}
                  </span>
                </div>
              </div>

              <div className="flex gap-1 items-center">
                <Clock className="h-4 w-4" />
                <div className="flex gap-1">
                  <span className="font-medium capitalize">Duration:</span>
                  <span>{`${step.duration / 60 > 1 ? `${Math.floor(step.duration / 60)} hr` : ""} ${step.duration % 60 > 1 ? `${Math.floor(step.duration % 60)} min` : ""}`}</span>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default Step;

const timelineCircleVariantsOnce = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 650,
      damping: 60,
      mass: 8,
    },
  },
};

const timelineCircleVariants = {
  hidden: {
    opacity: 1,
    scale: 1,
  },
  visible: {
    opacity: 1,
    scale: [1.5, 1],
    transition: {
      type: "spring",
      stiffness: 650,
      damping: 80,
      mass: 15,
    },
  },
};
