import { Part1 } from "./Part1";
import { Part2 } from "./Part2";
import { Part3 } from "./Part3";

export default function Content({parts}) {
  return (
    <div>
        <Part1 part={parts[0]} />
        <Part2 part={parts[1]} />
        <Part3 part={parts[2]} />
    </div>
  )
}