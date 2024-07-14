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
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4).max(20),
});
export default function Page() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  let router = useRouter();
  let {userInfo,setUserInfo } = useUserContext()
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null);
    setLoading(true);
    try {
      let response = await axiosInstance.post("/users/login", {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      console.log(response.data.user.email);
      console.log(userInfo,setUserInfo);
      
      
      console.log(response?.data?.success);
      
      if (response?.data?.success === true) {
       
        
      
        setUserInfo({
          email : response.data.user.email,
        
          
          name : response.data.user.name,
          isAuthenticated : true
        })

        router.push("/");
      }else{
        setError(response.data.error)
      }
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  }
  return (
    <div className="bg-black flex items-center justify-center min-h-screen   ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 lg:grid lg:grid-cols-2 lg:grid-rows-3 lg:grid-flow-row gap-8 "
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>Enter your email.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} />
                </FormControl>
                <FormDescription>Enter a password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p className=" text-red-500 ">{error && error}</p>
          <Button type="submit" disabled={loading} className="col-span-2">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
