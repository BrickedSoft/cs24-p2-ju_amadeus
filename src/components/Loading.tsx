import Spinner from "./ui/spinner";

const Loading: React.FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Spinner size="xl" />
    </div>
  );
};

export default Loading;
