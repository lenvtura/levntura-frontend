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
import Link from "next/link";

export const GalleryForm = () => {
  const formSchema = z.object({
    name: z.string(),
    dateOfBirth: z.string(),
    phoneNo: z.string(),
    email: z.string(),
    program: z.string(),
    nationality: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
      phoneNo: "",
      email: "",
      program: "",
      nationality: "",
    },
  });

  return (
    <div className="flex flex-col gap-y-4">
      <form id="galleryForm" className="space-y-4">
        <Form {...form}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="Name" {...field} />
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
                      <SelectValue placeholder="Program Interested in" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Study & Travel">
                      Study & Travel
                    </SelectItem>
                    <SelectItem value="Work & Travel">Work & Travel</SelectItem>
                    <SelectItem value="Internship">Internship</SelectItem>
                    <SelectItem value="Counselor">Counselor</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input required placeholder="Nationality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
        <Button
          type="submit"
          className="w-full border-lev-black text-lev-black hover:bg-lev-black hover:text-white"
        >
          START NOW!
        </Button>
      </form>

      <Link
        href="/contact"
        className="uppercase typography-EB14 flex items-center justify-center mt-2 text-lev-green hover:text-lev-green-dark transition-colors"
      >
        CONTACT US
      </Link>
    </div>
  );
};

