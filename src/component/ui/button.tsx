import React from 'react';

interface PrimaryButtonProps{
    onSubmit?:() =>void;
    text:String;

 }

const PrimaryButton: React.FC<PrimaryButtonProps> = ({onSubmit,text}) => {
  return (

    <button onClick={onSubmit? onSubmit: ()=>{}} className='bg-[#FF4000] text-white p-2 w-full rounded-[10px] hover:bg-[#e63a00] transition '>{text}</button>
  )
}

export default PrimaryButton;