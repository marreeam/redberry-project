import React, { useRef, useState, ChangeEvent } from "react";
import { ImageIcon, X } from "lucide-react";

interface AvatarPickerProps {
  onChange?: (base64: string | null, file: File | null) => void;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ onChange }) => {
  const [avatar, setAvatar] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setAvatar(result);
        onChange?.(result, file); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChooseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; 
      fileInputRef.current.click();
    }
  };

  const handleRemove = () => {
    setAvatar(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onChange?.(null, null);
  };

  return (
    <div className="flex items-center gap-4">
      <div
        className="w-16 h-16 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50"
        onClick={handleChooseClick}
      >
        {avatar ? (
          <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
        ) : (
          <ImageIcon className="w-6 h-6 text-gray-400" />
        )}
      </div>

      <div className="flex flex-col gap-1">
        <button
          type="button"
          onClick={handleChooseClick}
          className="text-blue-600 hover:underline text-sm"
        >
          Choose Picture
        </button>
        {avatar && (
          <button
            type="button"
            onClick={handleRemove}
            className="text-red-500 hover:underline text-sm flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Remove
          </button>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AvatarPicker;
