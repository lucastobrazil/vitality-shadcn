"use client"

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/registry/vitality/ui/accordion"
import { Card, CardContent } from "@/registry/vitality/ui/card"

export default function AccordionDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic (single open)</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that match the other components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Multiple open</p>
        <Accordion type="multiple" defaultValue={["faq-1", "faq-2"]} className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
            <AccordionContent>Yes. Use type=&quot;multiple&quot; to allow it.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Can I set default open items?</AccordionTrigger>
            <AccordionContent>Yes. Pass defaultValue with an array of item values.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>How does it work?</AccordionTrigger>
            <AccordionContent>Each item can be toggled independently.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Disabled items</p>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="d-1">
            <AccordionTrigger>Available item</AccordionTrigger>
            <AccordionContent>This item can be toggled normally.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="d-2" disabled>
            <AccordionTrigger>Disabled item</AccordionTrigger>
            <AccordionContent>This content is hidden.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="d-3">
            <AccordionTrigger>Another available item</AccordionTrigger>
            <AccordionContent>This item can also be toggled.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Inside a Card</p>
        <Card>
          <CardContent className="pt-6">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="c-1">
                <AccordionTrigger>Getting started</AccordionTrigger>
                <AccordionContent>
                  Install the package and import the components you need.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="c-2">
                <AccordionTrigger>Configuration</AccordionTrigger>
                <AccordionContent>
                  Customize the theme and variants to match your design system.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="c-3" className="border-b-0">
                <AccordionTrigger>Deployment</AccordionTrigger>
                <AccordionContent>
                  Deploy your application to any platform that supports Next.js.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
