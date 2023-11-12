import Image from "next/image";

type Props = {
  imageUrl: string;
  size?: number;
  borderStyles?: string;
};
export default function ProfileImage({
  imageUrl,
  size = 48,
  borderStyles,
}: Props) {
  return (
    <Image
      className={`rounded-full ${borderStyles}`}
      src={imageUrl}
      width={size}
      height={size}
      alt="profile image"
      priority={false}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8IdP5HgAFvwJu/bU7LAAAAABJRU5ErkJggg=="
    />
  );
}
