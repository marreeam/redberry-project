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
        className="w-[100px] h-[100px] rounded-full border border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50"
        onClick={handleChooseClick}
      >
        {avatar ? (
          <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
        ) : (
          <img src="/svg/camera.svg" className="w-6 h-6 text-gray-400"  alt="Unpload avatar"/>
        )}
      </div>

      <div className="flex  gap-3.5">
        <button
          type="button"
          onClick={handleChooseClick}
          className="font-normal text-[#3E424A] text-[14px] leading-[100%] tracking-[0%] text-center"
        >
          Upload new
        </button>
        {avatar && (
          <button
            type="button"
            onClick={handleRemove}
            className="font-normal text-[#3E424A] text-[14px] leading-[100%] tracking-[0%] text-center"
          >
             Remove
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
