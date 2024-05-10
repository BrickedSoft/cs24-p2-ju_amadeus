import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { UpdateIcon } from "@radix-ui/react-icons";

const SubmitButton: React.FC<{
  label: string;
  disabled?: boolean;
  variant?: "default" | "secondary";
  isLoading?: boolean;
  rounded?: boolean;
}> = ({ label, disabled, variant = "default", isLoading, rounded = false }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      aria-disabled={pending || isLoading}
      disabled={pending || isLoading || disabled}
      type="submit"
      variant={variant === "secondary" ? "submit" : "default"}
      rounded={rounded}
      size="sm"
    >
      {pending || isLoading ? (
        <UpdateIcon className="mx-4 h-4 w-4 animate-spin" />
      ) : (
        label
      )}
    </Button>
  );
};

export default SubmitButton;
