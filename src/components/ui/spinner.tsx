"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type SpinnerProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 24, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        role="status"
        aria-label="Loading"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("animate-spin", className)}
        {...props}
      >
        <title>Loading</title>
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
    )
  }
)

Spinner.displayName = "Spinner"
