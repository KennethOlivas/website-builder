"use client";

import { ArrowUpIcon, ImagePlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { suggestions } from "@/constant/suggestion";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField, FormItem, Form } from "@/components/ui/form";
import { SignInButton } from "@clerk/nextjs";


const formSchema = z.object({
  prompt: z.string().min(10).max(500).nonempty(),
});

const InputSelectorIA = () => {
  const form = useForm({
    defaultValues: {
      prompt: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onClickSuggestion = (suggestion: string) => {
    form.setValue("prompt", suggestion, { shouldValidate: true });
  };

  return (
    <div>
      {/* input box */}
      <div className="w-full max-w-3xl p-5 border mt-5 rounded-2xl bg-background/70 backdrop-blur-md shadow-lg">
        <Form {...form}>
          <form>
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
              <Button variant="ghost" size="icon">
                <ImagePlusIcon />
              </Button>
              <SignInButton mode="modal" forceRedirectUrl="/workspace">
                <Button
                  disabled={
                    !form.formState.isValid || form.formState.isSubmitting
                  }
                  size="icon"
                  type="submit"
                >
                  <ArrowUpIcon />
                </Button>
              </SignInButton>
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
