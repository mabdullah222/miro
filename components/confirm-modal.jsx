"use client"
import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTrigger,AlertDialogTitle } from "./ui/alert-dialog";

export const ConfirmModal = ({
    children,
    onConfirm,
    disabled,
    header,
    description,
  }) => {
    const handleConfirm = () => {
      onConfirm();
    };
  
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          {children}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {header}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={disabled}
              onClick={handleConfirm}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };