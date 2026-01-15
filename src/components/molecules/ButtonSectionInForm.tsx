
import Button from "../atoms/Button";
import { useFormContext } from "react-hook-form";

// 1. Rename to PascalCase
interface ButtonConfig {
  name?: string;
  buttonClassName?: string;
  width: string;
  height: string;
  type: "save" | "cancel" | "edit";
}

interface ButtonSectionProps {
  buttonInSection: Array<ButtonConfig>;
  nextState?: Array<ButtonConfig>;
  isStateChanged?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
}

function ButtonSection({
  buttonInSection,
  onSave,
  onCancel,
  onEdit,
  isStateChanged = false, // Default to false to simplify logic
  nextState,
}: ButtonSectionProps) {
  
  const { formState } = useFormContext(); // Destructure for cleaner access

  // 2. Define handlers map
  const handlers: Record<ButtonConfig["type"], (() => void) | undefined> = {
    save: onSave,
    cancel: onCancel,
    edit: onEdit,
  };

  // 3. Logic to determine which buttons to render
  let activeButtons: Array<ButtonConfig> | undefined;

  if (!isStateChanged) {
    activeButtons = buttonInSection;
  } else if (isStateChanged && nextState) {
    activeButtons = nextState;
  } else {
    return null; // Handle the "else" case from your original code
  }

  // 4. centralized Disabled logic
  // Disable if: Not Dirty OR Not Valid OR Is Submitting
  const isSaveDisabled = !formState.isDirty || !formState.isValid || formState.isSubmitting;

  return (
    <div className="flex gap-4 p-2 border-2">
      {activeButtons.map((obj, index) => (
        <Button
          // Prefer a unique ID if available, but index is okay for static lists
          key={`${obj.name}-${index}`} 
          name={obj.name}
          typeOfButton={obj.type === "save" ? "submit" : "button"}
          buttonClassName={obj.buttonClassName}
          width={obj.width}
          height={obj.height}
          onClick={handlers[obj.type]}
          // 5. Apply fixed logic
          isDisabled={obj.type === "save" ? isSaveDisabled : false}
        />
      ))}
    </div>
  );
}

export default ButtonSection;