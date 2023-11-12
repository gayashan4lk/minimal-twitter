import Image from "next/image";

type Props = {
  imageUrl: string;
  size?: number;
};
export default function ProfileImage({ imageUrl, size = 48 }: Props) {
  return (
    <Image
      className="rounded-full"
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
