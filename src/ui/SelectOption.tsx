import { Chart } from "./Chart";

interface SelectOptionProps {
  view: View;
  subTitle: string;
  data: number[];
  onClick: () => void;
}

const SelectOption = ({ subTitle, data, view, onClick }: SelectOptionProps) => {
  return (
    <button className="selectOption" onClick={onClick}>
      <div className="selectOptionTitle">
        <span>{view}</span>
        <span>{subTitle}</span>
      </div>
      <div className="selectOptionChart">
        <Chart data={data} maxPoints={10} selectedView={view} />
      </div>
    </button>
  );
};

export default SelectOption;
