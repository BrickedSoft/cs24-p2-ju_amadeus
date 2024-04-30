import ManageLandfill from "./manageLandfill";
import ManageSts from "./manageSts";

const Manager: React.FC<{ params: { userId: string } }> = ({ params }) => {
  return (
    <>
      <ManageSts params={params} />
      <ManageLandfill params={params} />
    </>
  );
};

export default Manager;
