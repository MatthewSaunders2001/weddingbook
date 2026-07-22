import { forwardRef, useImperativeHandle, useRef } from "react";

export type CameraHandle = {
  open: () => void;
};

type CameraProps = {
  onPhotoSelected: (file: File) => void;
};

const Camera = forwardRef<CameraHandle, CameraProps>(
  ({ onPhotoSelected }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      open() {
        inputRef.current?.click();
      },
    }));

    return (
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onPhotoSelected(file);
          }
        }}
      />
    );
  }
);

export default Camera;