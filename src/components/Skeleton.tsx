import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function Skeleton({ times, className }: { times: number, className: string }) {
  const boxes = Array(times).fill(0).map((_, i) => {
    const outerClasses = twMerge(classNames(
      'relative',
      'overflow-hidden',
      'bg-gray-200',
      'rounded',
      'mb-2.5',
      className
    ));
    const innerClasses = twMerge(classNames(
      'animate-shimmer',
      'absolute',
      'inset-0',
      '-translate-x-full',
      'bg-gradient-to-r',
      'from-gray-200',
      'via-white',
      'to-gray-200'
    ))
    return (
      <div key={i} className={outerClasses}>
        <div className={innerClasses} />
      </div>
    )
  })
  return boxes
}