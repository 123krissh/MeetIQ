import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { MeetingsForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialVaues: MeetingGetOne;
}

export const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialVaues,
}: UpdateMeetingsDialogProps) => {
  const router = useRouter();
  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingsForm
        onSuccess={() => onOpenChange(false)}
        onCancle={() => onOpenChange(false)}
        initialValues={initialVaues}
      />
    </ResponsiveDialog>
  );
};
