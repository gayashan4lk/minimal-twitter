"use client";

import Image from "next/image";
import { api } from "~/utils/api";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type FormInput = {
  content: string;
};

type Props = {
  user: {
    imageUrl: string;
  };
};

export function CreatePostWizard({ user }: Props) {
  const ctx = api.useContext();

  const { mutateAsync, isLoading, isError, error } =
    api.posts.create.useMutation({
      async onSuccess() {
        await ctx.posts.getAll.invalidate();
        reset();
      },
      onError(error) {
        switch (error.data?.code) {
          case "TOO_MANY_REQUESTS":
            toast.error("Too many requests! Try again later.");
            break;
          case "UNAUTHORIZED":
            toast.error("Unauthorized!");
            break;
          default:
            toast.error("Failed to create post!");
        }

        console.error(error.message);
        reset();
      },
    });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    try {
      await mutateAsync(data);
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex w-full gap-3">
      <Image
        className="h-14 w-14 rounded-full"
        src={user.imageUrl}
        width={64}
        height={64}
        alt={`profile image`}
        priority={false}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO8IdP5HgAFvwJu/bU7LAAAAABJRU5ErkJggg=="
      />

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-row">
        <div className="flex w-full flex-col">
          <input
            placeholder="Type some emojis!"
            className="grow bg-transparent outline-none"
            {...register("content", {
              required: {
                value: true,
                message: "Emojis are required",
              },
            })}
            defaultValue=""
          />
          {errors.content && (
            <span className="text-sm text-red-500">
              {errors.content.message}
            </span>
          )}
        </div>
        {isLoading ? (
          <span className="justify-end">Loading...</span>
        ) : (
          <button
            type="submit"
            disabled={isLoading || Boolean(errors.content)}
            className="justify-end"
          >
            Post
          </button>
        )}
      </form>
    </div>
  );
}
