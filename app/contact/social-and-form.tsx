"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPinIcon } from "lucide-react";
import { SectionWrapper } from "../(home)/section-wrapper";
import { FacebookIcon } from "@/assets/icons/facebook";
import { InstagramIcon } from "@/assets/icons/instagram";
import { LinkedinIcon } from "@/assets/icons/linkedin";
import { WhatsappIcon } from "@/assets/icons/whatsapp";
import { YoutubeIcon } from "@/assets/icons/youtube";
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

const formSchema = z.object({
  name: z.string(),
  dateOfBirth: z.string(),
  phoneNo: z.string(),
  email: z.string(),
  program: z.string(),
});

export function SocialAndForm() {
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
    <SectionWrapper
      sectionColor="bg-lev-blue-dark py-0"
      className="overflow-visible h-screen flex items-center"
    >
      <div className="lg:flex items-center lg:gap-y-16 w-full space-y-12">
        {/* Social */}
        <div className="lg:w-1/2 lg:inline-flex space-y-12 lg:space-y-0">
          <article className="">
            <h1 className="typography-EB74 text-white leading-16">
              HELLO! <br /> LETS <br />
              <span className="text-lev-blue-light">START</span> <br /> FRESH &{" "}
              <br />
              NEW
            </h1>
          </article>

          <article className="text-white flex flex-col gap-4 ml-12 -mt-4 self-end">
            <div className="social_link_top">
              <h6 className="typography-R14">OUR SOCIALS</h6>
            </div>

            <div className="flex gap-4">
              <a
                href=""
                className="border border-white p-1.5 size-6 rounded-full flex items-center justify-center"
              >
                <WhatsappIcon className="size-6" />
              </a>
              <a
                href=""
                className="border border-white p-1.5 size-6 rounded-full flex items-center justify-center"
              >
                <InstagramIcon className="size-6" />
              </a>
              <a
                href=""
                className="border border-white p-1.5 size-6 rounded-full flex items-center justify-center"
              >
                <LinkedinIcon className="size-6" />
              </a>
              <a
                href=""
                className="border border-white p-1.5 size-6 rounded-full flex items-center justify-center"
              >
                <YoutubeIcon className="size-6" />
              </a>
              <a
                href=""
                className="border border-white p-1.5 size-6 rounded-full flex items-center justify-center"
              >
                <FacebookIcon className="size-6" />
              </a>
            </div>
          </article>
        </div>
        {/* Form */}
        <div className="lg:w-1/2 relative">
          <div className="flex flex-col items-center gap-12 absolute lg:-top-25">
            <div className="">
              <MapPinIcon className="text-lev-blue-light" size={100} />
            </div>

            <div className="flex flex-col gap-y-4 bg-white lg:w-3/5 p-6">
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
                          <Input
                            required
                            placeholder="Date of birth"
                            {...field}
                          />
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
                          <Input
                            required
                            placeholder="Phone number"
                            {...field}
                          />
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
                          <Input
                            required
                            type="email"
                            placeholder="Email"
                            {...field}
                          />
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
                            <SelectItem value="Video Editing">
                              Video Editing
                            </SelectItem>
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
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
