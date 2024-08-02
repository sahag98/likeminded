"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { useState } from "react";

const professions = [
  { label: "Social Media Influencer", value: "si" },
  { label: "Software Engineer", value: "se" },
  { label: "Artist", value: "ar" },
  { label: "Photographer", value: "pr" },
  { label: "Creator", value: "pt" },
  { label: "Founder", value: "fr" },
  { label: "Other", value: "or" },
] as const;

const denomination = [
  { label: "Pentecostal", value: "pl" },
  { label: "Presbyterian", value: "pn" },
  { label: "Catholic", value: "cc" },
  { label: "Orthodox", value: "ox" },
  { label: "Baptist", value: "bt" },
  { label: "Non-denominational", value: "nl" },
  { label: "Other", value: "or" },
] as const;

const lookingfor = [
  { label: "Social Media Influencer", value: "si" },
  { label: "Software Engineer", value: "se" },
  { label: "Artist", value: "ar" },
  { label: "Photographer", value: "pr" },
  { label: "Creator", value: "pt" },
  { label: "Founder", value: "fr" },
  { label: "Other", value: "or" },
] as const;

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  denomination: z.string({
    required_error: "Please select your denomination.",
  }),
  professions: z.string({
    required_error: "Please select your profession.",
  }),
  lookingfor: z.string({
    required_error: "Please select what you're looking for.",
  }),
});

export function ProfileSetupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [popoverOpen, setPopoverOpen] = useState(false);
  const [lookingpopoverOpen, setLookingPopoverOpen] = useState(false);
  const [denominationpopoverOpen, setDenominationPopoverOpen] = useState(false);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("data", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="denomination"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Your denomination</FormLabel>
              <Popover
                open={denominationpopoverOpen}
                onOpenChange={setDenominationPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      onClick={() => setDenominationPopoverOpen(true)}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? denomination.find(
                            (denomination) => denomination.value === field.value
                          )?.label
                        : "Select denomination"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {denomination.map((denomination) => (
                          <CommandItem
                            value={denomination.label}
                            key={denomination.value}
                            onSelect={() => {
                              form.setValue("denomination", denomination.value);
                              setDenominationPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                denomination.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {denomination.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="professions"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Your profession</FormLabel>
              <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      onClick={() => setPopoverOpen(true)}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? professions.find(
                            (profession) => profession.value === field.value
                          )?.label
                        : "Select profession"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {professions.map((profession) => (
                          <CommandItem
                            value={profession.label}
                            key={profession.value}
                            onSelect={() => {
                              form.setValue("professions", profession.value);
                              setPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                profession.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {profession.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lookingfor"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>What you&apos;re looking for</FormLabel>
              <Popover
                open={lookingpopoverOpen}
                onOpenChange={setLookingPopoverOpen}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      onClick={() => setLookingPopoverOpen(true)}
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? lookingfor.find(
                            (profession) => profession.value === field.value
                          )?.label
                        : "Select profession"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandList>
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {lookingfor.map((profession) => (
                          <CommandItem
                            value={profession.label}
                            key={profession.value}
                            onSelect={() => {
                              form.setValue("lookingfor", profession.value);
                              setLookingPopoverOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                profession.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {profession.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
