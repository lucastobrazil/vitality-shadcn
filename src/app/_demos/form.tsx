"use client"

import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/registry/vitality/ui/form"
import { Input } from "@/registry/vitality/ui/input"
import { Button } from "@/registry/vitality/ui/button"

export default function FormDemo() {
  const form = useForm({
    defaultValues: { username: "" },
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => alert(JSON.stringify(data)))} className="space-y-4 max-w-sm">
        <FormField
          control={form.control}
          name="username"
          rules={{ required: "Username is required", minLength: { value: 2, message: "At least 2 characters" } }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary">Submit</Button>
      </form>
    </Form>
  )
}
