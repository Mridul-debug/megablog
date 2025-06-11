import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        if (post) {
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

            if (file) {
                appwriteService.deleteFile(post.featuredImage);
            }

            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }
        } else {
            const file = await appwriteService.uploadFile(data.image[0]);

            if (file) {
                 const fileId = file.$id;

    const postPayload = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        status: data.status,
        featuredImage: fileId,
        userId: userData.$id
    };

    const dbPost = await appwriteService.createPost(postPayload);

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    return (
       <form
  onSubmit={handleSubmit(submit)}
  className="flex flex-col lg:flex-row gap-6 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md transition-all"
>
  {/* Main Content Area */}
  <div className="lg:w-2/3 space-y-4">
    <Input
      label="Title :"
      placeholder="Title"
      className="mb-2"
      {...register("title", { required: true })}
    />

    <Input
      label="Slug :"
      placeholder="Slug"
      className="mb-2"
      {...register("slug", { required: true })}
      onInput={(e) => {
        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
      }}
    />

    <div className="mb-2">
      <RTE
        label="Content :"
        name="content"
        control={control}
        defaultValue={getValues("content")}
      />
    </div>
  </div>

  {/* Sidebar Area */}
  <div className="lg:w-1/3 space-y-4">
    <Input
      label="Featured Image :"
      type="file"
      accept="image/png, image/jpg, image/jpeg, image/gif"
      className="mb-2"
      {...register("image", { required: !post })}
    />

    {post && (
      <div className="w-full">
        <img
          src={appwriteService.getFilePreview(post.featuredImage)}
          alt={post.title}
          className="rounded-md shadow"
        />
      </div>
    )}

    <Select
      options={["active", "inactive"]}
      label="Status"
      className="mb-2"
      {...register("status", { required: true })}
    />

    <Button
      type="submit"
      bgColor={post ? "bg-green-500" : "bg-blue-600"}
      className="w-full text-white hover:opacity-90 hover:scale-[1.02] transition-all duration-200"
    >
      {post ? "Update" : "Submit"}
    </Button>
  </div>
</form>

    );
}