import NextImage from "next/image";

export const BackgroundImage = () => {
  return (
    <div className="absolute left-0 right-0 top-0 h-96">
      <NextImage src={`/images/bg-desktop-dark.jpg`} layout="fill" objectFit="cover" />
    </div>
  );
};
