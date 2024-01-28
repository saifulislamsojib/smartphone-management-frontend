import { SmartPhone } from "@/types/smartphone.type";
import SingleSmartPhone from "./SingleSmartPhone";

type Props = {
  data: SmartPhone[];
  isFetching: boolean;
  openModal: (id: string) => void;
};

const SmartphoneList = ({ data, isFetching, openModal }: Props) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5 gap-4${
        isFetching ? " opacity-60" : ""
      }`}
    >
      {data.map((smartPhone) => (
        <SingleSmartPhone
          key={smartPhone._id}
          smartPhone={smartPhone}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default SmartphoneList;
