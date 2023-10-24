import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { type RouterOutputs } from "~/utils/api";

dayjs.extend(relativeTime);
type PostWithUser = RouterOutputs["posts"]["getAll"][number];
export function PostView(props: PostWithUser) {
  const { post, author } = props;

  return (
    <div
      key={post.id}
      className="flex gap-3 border-b border-slate-700 p-4 hover:bg-[#101010]/30"
    >
      <Image
        className="h-10 w-10 rounded-full"
        src={author.imageUrl}
        width={64}
        height={64}
        alt={`profile image`}
      />
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-baseline gap-1 text-slate-300">
          <span className="font-bold">
            {`${author.firstName ?? ""} ${author.lastName ?? ""}`}
          </span>
          <span className="text-sm font-normal">{`@${author.userName}`}</span>
          <span className="text-sm font-normal">·</span>
          <span className="text-sm font-normal">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>

        <span className="text-xl">{post.content}</span>
      </div>
    </div>
  );
}