import { useEffect } from 'react';

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ dialogRef, onClose, children }: Props) => {
  // restrict tab movements inside the modal.
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    const focusableElements = dialogElement.querySelectorAll<
      HTMLButtonElement | HTMLAnchorElement | HTMLInputElement
    >('button, [href], input');
    const firstElement = Array.from(focusableElements).at(0);
    const lastElement = Array.from(focusableElements).at(-1);

    const handleTabKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Tab') {
        const focusedElement = document.activeElement;

        if (focusedElement === lastElement && !e.shiftKey) {
          e.preventDefault();
          firstElement?.focus();
        }
        if (focusedElement === firstElement && e.shiftKey) {
          e.preventDefault();
          lastElement?.focus();
        }
      }
    };
    dialogElement.addEventListener('keydown', handleTabKeyDown);

    return () => dialogElement.removeEventListener('keydown', handleTabKeyDown);
  }, [dialogRef]);

  // call cleanup function when closing the modal.
  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    const handleBackdropClick = (e: MouseEvent) => {
      if (dialogElement.open && e.target === dialogElement) {
        onClose();
      }
    };
    const handleEscapeKeyDown = (e: KeyboardEvent) => {
      if (dialogElement.open && e.code === 'Escape') {
        onClose();
      }
    };

    dialogElement.addEventListener('click', handleBackdropClick);
    document.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      dialogElement.removeEventListener('click', handleBackdropClick);
      document.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, [dialogRef, onClose]);

  return (
    <dialog
      className="mx-4 mt-20 w-full max-w-lg divide-y divide-gray-200 rounded-xl bg-white xs:mx-auto"
      ref={dialogRef}
    >
      {children}
    </dialog>
  );
};

export default Modal;
