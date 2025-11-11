"use client";

import { ArrowUpIcon, ImagePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/constant/suggestion";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, Form } from "@/components/ui/form";
import { SignInButton, useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { promptSchema } from "@/schema/promptSchema";
import useCreateProjectMutation from "@/api/projects/useCreateProjectMutation";

const InputSelectorIA = () => {
  const { mutateAsync: createProject, isPending } = useCreateProjectMutation();
  const router = useRouter();
  const user = useUser();
  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(promptSchema),
  });

  const onClickSuggestion = (suggestion: string) => {
    form.setValue("prompt", suggestion, { shouldValidate: true });
  };

  const createNewProject = async (data: z.infer<typeof promptSchema>) => {
    try {
      const res = await createProject({ prompt: data.prompt });
      console.log("Project created:", res);
      // Handle success (e.g., navigate to the new project)
      //navigate  to workspace playground
      router.push(
        `/playground/${res.projectResult.projectId}?frameId=${res.frameResult.frameId}`
      );
    } catch (error) {
      toast.error("An error occurred while creating the project.");
      console.error(error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div>
      {/* input box */}
      <div className="w-full max-w-3xl p-5 border mt-5 rounded-2xl bg-background/70 backdrop-blur-md shadow-lg">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(createNewProject)}>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    placeholder="Describe your page design..."
                    className="w-full h-24 focus:outline-none focus:ring-0 resize-none border-none shadow-none focus-visible:ring-0"
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
              {user.isSignedIn ? (
                <>
                  <Button
                    disabled={!form.formState.isValid}
                    size="icon"
                    type="submit"
                    isLoading={isPending}
                    icon={<ArrowUpIcon />}
                  />
                </>
              ) : (
                <SignInButton mode="modal" forceRedirectUrl="/workspace">
                  <Button
                    disabled={!form.formState.isValid}
                    size="icon"
                    type="button"
                    icon={<ArrowUpIcon />}
                    isLoading={isPending}
                  />
                </SignInButton>
              )}
            </div>
          </form>
        </Form>
      </div>

      {/* Suggestions */}
      <div className="mt-4 flex gap-3 flex-wrap justify-center max-w-3xl mx-auto">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="default"
            onClick={() => onClickSuggestion(suggestion.prompt)}
          >
            <suggestion.icon />
            {suggestion.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default InputSelectorIA;
