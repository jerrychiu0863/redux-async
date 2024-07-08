import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function Skeleton({ times }: { times: number }) {
  const boxes = Array(times).fill(0).map((_, i) => {
    return <div key={i} />
  })

  return boxes
}