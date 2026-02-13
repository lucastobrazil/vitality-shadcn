"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/registry/vitality/ui/card"
import { Button } from "@/registry/vitality/ui/button"

export default function CardDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic with all sections</p>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card description goes here.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Card content with some example text to show the layout.</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button variant="primary">Save</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">With image</p>
        <Card className="max-w-sm overflow-hidden">
          <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground text-sm">
            Image placeholder
          </div>
          <CardHeader>
            <CardTitle>Blog Post</CardTitle>
            <CardDescription>Published on January 15, 2025</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              A brief preview of the blog post content that gives readers an idea of what to expect.
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="ml-auto">Read more</Button>
          </CardFooter>
        </Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">As clickable</p>
        <Card className="max-w-sm cursor-pointer transition-colors hover:bg-muted/50">
          <CardHeader>
            <CardTitle>Clickable Card</CardTitle>
            <CardDescription>Hover to see the interactive state.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">This card acts as a link or button with hover feedback.</p>
          </CardContent>
        </Card>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Compact</p>
        <div className="grid gap-3 max-w-sm">
          {["Revenue", "Customers", "Active Now"].map((title, i) => (
            <Card key={title} className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{["$12,345", "1,234", "573"][i]}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
