"use client";
import React, { useState } from "react";
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
import axiosInstance from "@/axios-api/config";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/context/user.context";
import { Textarea } from "@/components/ui/textarea";
const formSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(20),
  image: z.instanceof(File, { message: "Picture must be a file" })
});
export default function Page() {
    const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      
    },
  });
  let router = useRouter();
  let {userInfo,setUserInfo } = useUserContext()
  // 2. Define a submit handler.
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
    form.setValue("image", selectedFile); // Manually set the file value in the form
  };
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setLoading(true);
  try {
    console.log(values);
   // send form data
   const form = new FormData();
   form.append('title', values.title);
   form.append('content', values.content);
   form.append('image', values.image);
   let response = await axiosInstance.post('/blogs/createBlog', form)
   console.log(response);
   if(response?.data?.success) {
            router.push('/')
   }
   
  } catch (error : any) {
    setError(error.message)
  }
    setLoading(false);
  }
  return (
    <div className="bg-black flex items-center justify-center min-h-screen   ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-[80%] lg:grid-cols-1 lg:grid-rows-3 lg:grid-flow-row gap-8 "
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>Your blog title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="express your title" {...field} />
                </FormControl>
                <FormDescription>Blog content</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input type="file" onChange={handleFileChange} />
                </FormControl>
                <FormDescription>Select a picture for your blog</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className=" text-red-500 ">{error && error}</p>
          <Button type="submit" disabled={loading} className="col-span-2">
            upload Blog
          </Button>
        </form>
      </Form>
    </div>
  );
}
