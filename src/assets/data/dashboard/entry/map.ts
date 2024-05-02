import { instruction } from "@allTypes";
import {
  ArrowTurnLeft,
  ArrowTurnRight,
  ArrowSlightLeft,
  ArrowSlightRight,
  ArrowStraight,
  Destination,
  ArrowLeft,
  ArrowRight,
  ArrowSharpLeft,
  ArrowSharpRight,
  RoundAbout,
} from "@icons";

export const instructionIcon: instruction[] = [
  {
    instructions: [
      "head south",
      "head north",
      "head east",
      "head west",
      "continue straight",
    ],
    icon: ArrowStraight,
  },
  {
    instructions: ["turn left"],
    icon: ArrowTurnLeft,
  },
  {
    instructions: ["turn right"],
    icon: ArrowTurnRight,
  },
  {
    instructions: ["slight left"],
    icon: ArrowSlightLeft,
  },
  {
    instructions: ["slight right"],
    icon: ArrowSlightRight,
  },
  {
    instructions: ["arrive at"],
    icon: Destination,
  },
  { instructions: ["keep left"], icon: ArrowLeft },
  { instructions: ["keep right"], icon: ArrowRight },
  { instructions: ["sharp left"], icon: ArrowSharpLeft },
  { instructions: ["sharp right"], icon: ArrowSharpRight },
  { instructions: ["roundabout"], icon: RoundAbout },
];
