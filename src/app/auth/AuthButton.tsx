import Checkmark from "@components/Checkmark";
import { Button } from "@components/ui/button";
import Spinner from "@components/ui/spinner";

type Props = {
  isSubmitting: boolean;
  success: boolean | undefined;
  title: string;
};

const AuthButton: React.FC<Props> = ({ isSubmitting, success, title }) => {
  return (
    <Button type="submit" size={"lg"} className="self-stretch">
      {isSubmitting || success === undefined ? (
        <Spinner />
      ) : success === true ? (
        <Checkmark />
      ) : success === undefined ? null : (
        title
      )}
    </Button>
  );
};

export default AuthButton;
