import { useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";

type ExpandablePanelProps = {
  header: JSX.Element;
  children: React.ReactNode;
}

function ExpandablePanel({ header, children }: ExpandablePanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePanel = () => {
    setIsExpanded(isExpanded => !isExpanded)
  }

  return (
    <div className="mb-2 border rounded">
      <div className="flex p-2 justify-between items-center ">
        <div className="flex flex-row items-center">
          {header}
        </div>
        <div className="cursor-pointer" onClick={handlePanel}>
          {isExpanded ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
      {isExpanded && <div className="p-2 border-t">{children}</div>}
    </div>
  )
}

export default ExpandablePanel;