import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentsForm } from "./agent-form";

interface NewAgentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NewAgentDialog = ({
  open,
  onOpenChange,
}: NewAgentsDialogProps) => {
  return (
    <ResponsiveDialog
      title="New Agent"
      description="Create a new agent"
      open={open}
      onOpenChange={onOpenChange}
    >
      <AgentsForm
        onSuccess={() => onOpenChange(false)}
        onCancle={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};
