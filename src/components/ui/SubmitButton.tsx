import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { UpdateIcon } from "@radix-ui/react-icons";

const SubmitButton: React.FC<{
  label: string;
  disabled: boolean;
  variant?: "default" | "secondary";
}> = ({ label, disabled, variant = "default" }) => {
  const { pending } = useFormStatus();

  const style = {
    secondary: "",
    default:
      "text-sm font-medium  text-gray-500 text-left rounded-[8px] p-2 px-3 bg-gray-200 hover:text-white hover:bg-black",
  };

  return (
    <Button
      aria-disabled={pending}
      disabled={pending || disabled}
      type="submit"
      variant={variant === "secondary" ? "default" : null}
      className={style[variant]}
    >
      {pending ? <UpdateIcon className="mx-4 h-4 w-4 animate-spin" /> : label}
    </Button>
  );
};

export default SubmitButton;
