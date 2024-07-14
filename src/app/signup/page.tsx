"use client";
import React from "react";
import {useState} from 'react'
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
import { Label } from "@/components/ui/label";
import axiosInstance from "@/axios-api/config";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  username: z.string().min(2).max(50),
  displayName: z.string().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(4).max(20),

  
});
export default function Page() {

    
    const [error, setError] = useState(null)
    const [loading,setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      displayName: "",
      email: "",
      password: "",

    },
  });
 let router = useRouter()
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError(null)
    setLoading(true)
    console.log(values);

    try {
      
    
     let response = await axiosInstance.post('/users/signUp',{
        name: values.username,
        displayName: values.displayName,
        email: values.email,
        password: values.password,
     
      })

      console.log(response);
      if (response.data.success) {
router.push('/login')
      }
      
    } catch (error : any) {
      setError(error.message)
    }
    setLoading(false)
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
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="userName" {...field} />
                </FormControl>
                <FormDescription>
                  This is your user name it is unique to you.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="displayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Display Name</FormLabel>
                <FormControl>
                  <Input placeholder="Display Name" {...field} />
                </FormControl>
                <FormDescription>This is your display Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
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
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>Enter a password.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        
           <p className=" text-rose-500 ">{error && error}</p>  {/*show error message */}
          <Button type="submit" disabled={loading} className='col-span-2'>Sign up</Button>
        </form>
      </Form>
    </div>
  );
}
