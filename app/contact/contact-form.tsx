"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/design-system/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/design-system/form";
import { Input } from "@/design-system/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/design-system/select";

export const ContactForm = () => {
  const formSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    phoneNo: z.string(),
    email: z.string(),
    program: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      phoneNo: "",
      email: "",
      program: "",
    },
  });
  return (
    <div className="flex flex-col gap-y-4 max-w-md bg-white p-6">
      <h2 className="typography-S34 w-5/6">
        LITTLE EFFORT, ULTIMATE EXPERIENCE.
      </h2>

      <form id="loginForm" className="contactForm space-y-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="Date of birth" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phoneNo"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="program"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Computer Science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Graphic Design">
                      Graphic Design
                    </SelectItem>
                    <SelectItem value="Video Editing">Video Editing</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button type="submit" className="w-full">
          Start Now!
        </Button>
      </form>

      <div className="success-message hidden" id="successMessage">
        Form submitted successfully!
      </div>

      <a
        href=""
        className="uppercase typography-EB14 flex items-center justify-center mt-5 text-lev-red mix-blend-difference"
      >
        Contact US
      </a>
    </div>
  );
};
