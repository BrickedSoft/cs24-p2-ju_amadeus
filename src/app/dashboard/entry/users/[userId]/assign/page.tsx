import ManageLandfill from "./ManageLandfill";
import ManageSts from "./ManageSts";

const Manager: React.FC<{ params: { userId: string } }> = ({ params }) => {
  return (
    <>
      <ManageSts params={params} />
      <ManageLandfill params={params} />
    </>
  );
};

export default Manager;
