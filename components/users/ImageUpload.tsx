import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useCallback, useState } from "react";

interface ImageUploadProps {
  label: string;
  value?: string;
  disabled: boolean;
  onChange: (base64: string) => void;
}

export default function ImageUpload({
  label,
  value,
  disabled,
  onChange,
}: ImageUploadProps) {
  const handleChange = useCallback(
    (base64: string) => {
      onChange(base64);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (files: any) => {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        handleChange(event.target.result);
      };

      reader.readAsDataURL(file);
    },
    [handleChange]
  );

  return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <Input
        type="file"
        disabled={disabled}
        name={label}
        id={label}
        accept="image/*"
        onChange={(e) => handleDrop(e.target.files)}
      />
    </div>
  );
}
