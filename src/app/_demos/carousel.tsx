"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/registry/vitality/ui/carousel"
import { Card, CardContent } from "@/registry/vitality/ui/card"

export default function CarouselDemo() {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-sm font-medium">Basic</p>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, i) => (
              <CarouselItem key={i}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{i + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Multiple items per view</p>
        <Carousel className="w-full max-w-sm mx-auto" opts={{ align: "start" }}>
          <CarouselContent className="-ml-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <CarouselItem key={i} className="pl-2 basis-1/3">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-2">
                    <span className="text-2xl font-semibold">{i + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium">Vertical</p>
        <Carousel orientation="vertical" className="w-full max-w-xs mx-auto">
          <CarouselContent className="-mt-2 h-[200px]">
            {Array.from({ length: 5 }).map((_, i) => (
              <CarouselItem key={i} className="pt-2 basis-1/2">
                <Card>
                  <CardContent className="flex items-center justify-center p-4">
                    <span className="text-2xl font-semibold">{i + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}
