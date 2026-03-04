"use client";

import { Button } from "@/registry/vitality/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/registry/vitality/ui/empty";
import { ArrowUpRightIcon } from "lucide-react";

export default function EmptyDemo() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="74"
            height="100"
            fill="none"
            viewBox="0 0 74 100"
          >
            <path
              className="fill-primary/50"
              fillRule="evenodd"
              d="M8 34a6 6 0 00-6 6v52a6 6 0 006 6h58a6 6 0 006-6V40a6 6 0 00-6-6H8zm0-2a8 8 0 00-8 8v52a8 8 0 008 8h58a8 8 0 008-8V40a8 8 0 00-8-8H8z"
              clipRule="evenodd"
            ></path>
            <path
              className="fill-primary/10"
              d="M37 0c12.15 0 22 9.85 22 22v12H46V22a9 9 0 10-18 0v12H15V22C15 9.85 24.85 0 37 0z"
            ></path>
            <path
              className="fill-primary/50"
              fillRule="evenodd"
              d="M57 22c0-11.046-8.954-20-20-20s-20 8.954-20 20v10h9V22c0-6.075 4.925-11 11-11s11 4.925 11 11v10h9V22zm2 0C59 9.85 49.15 0 37 0S15 9.85 15 22v12h13V22a9 9 0 1118 0v12h13V22z"
              clipRule="evenodd"
            ></path>
            <path
              className="fill-primary/10"
              d="M42 67.245a8 8 0 10-10 0V78a5 5 0 0010 0V67.245z"
            ></path>
            <path
              className="fill-primary/50"
              fillRule="evenodd"
              d="M40 66.285l.75-.6a6 6 0 10-7.498 0l.748.6V78a3 3 0 106 0V66.285zm-8 .96a8 8 0 1110 0V78a5 5 0 01-10 0V67.245zM21.553 15.394a1 1 0 01-.447-1.341c2.092-4.185 5.267-7.386 9.543-8.99a1 1 0 01.702 1.873c-3.723 1.396-6.549 4.195-8.456 8.011a1 1 0 01-1.342.447zM19.999 24A1 1 0 0119 22.999L20 23l-1-.001v-.031a10.082 10.082 0 01.009-.355 28.334 28.334 0 01.511-4.308 1 1 0 011.962.39 26.341 26.341 0 00-.474 3.989l-.007.243v.06L21 23v.002a1 1 0 01-1.001.998z"
              clipRule="evenodd"
            ></path>
          </svg>
        </EmptyMedia>
        <EmptyTitle>No Access</EmptyTitle>
        <EmptyDescription>
          You do not have the correct permissions to view this information.
          Please contact support by clicking the link below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="primary">Contact Support</Button>
      </EmptyContent>
    </Empty>
  );
}
