"use client";

import useGetFrameDetails from "@/api/frames/useGetFrameDetails";
import useGenerateContentMutation from "@/api/ai-model/useGenerateContentMutation";
import { Message, MessageAvatar, MessageContent } from "../ui/message";
import { ArrowUpIcon, ImagePlusIcon } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem } from "../ui/form";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";

type ChatSectionProps = {
  frameId: string;
  projectId: string;
};

export default function ChatSection({ frameId, projectId }: ChatSectionProps) {
  const { user } = useUser();
  const { data } = useGetFrameDetails({ frameId, projectId });
  const { mutate: generateContent, isPending } = useGenerateContentMutation();

  const form = useForm({
    defaultValues: {
      prompt: "",
    },
  });

  const messages = data?.chatMessages || [];
  console.log("Frame details data:", data);

  const onSubmit = (formData: { prompt: string }) => {
    if (!formData.prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    generateContent(
      { prompt: formData.prompt },
      {
        onSuccess: (response) => {
          console.log("Generated content:", response.text);
          toast.success("Content generated successfully!");
          form.reset();
        },
      }
    );
  };

  return (
    <div className="w-96 shadow h-[92vh] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-3 flex flex-col">
        {messages.length === 0 ? (
          <p className="p-2 text-accent-foreground text-center">No messages</p>
        ) : (
          messages.map((message, index) => (
            <Message from={message.role} key={index}>
              <MessageAvatar
                src={user?.imageUrl || ""}
                name={user?.fullName || ""}
              />
              <MessageContent>{message.content}</MessageContent>
            </Message>
          ))
        )}
      </div>

      <div className="p-4 border-t flex items-center gap-2 w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="Describe your page design..."
                    className="w-full resize-none h-24 flex-1"
                    disabled={isPending}
                  />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center mt-4">
              <Button
                variant="ghost"
                size="icon"
                disabled={isPending}
                type="button"
              >
                <ImagePlusIcon />
              </Button>

              <Button
                disabled={!form.formState.isValid || isPending}
                size="icon"
                type="submit"
                icon={<ArrowUpIcon />}
              />
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
