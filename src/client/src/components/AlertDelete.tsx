import {
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
  header: string;
  body: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  deleteAction: () => Promise<void>;
}

function AlertDelete({
  header,
  body,
  isOpen,
  onOpen,
  onClose,
  deleteAction,
}: Props) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{header}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{body}</AlertDialogBody>
          <AlertDialogFooter>
            <Button colorScheme="red" onClick={deleteAction}>
              Si
            </Button>
            <Button ref={cancelRef} ml={3} onClick={onClose}>
              No
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default AlertDelete;
