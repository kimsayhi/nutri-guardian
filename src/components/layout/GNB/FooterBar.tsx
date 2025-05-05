import { PropsWithChildren } from "react";

export default function FooterBar({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <nav className="fixed right-0 bottom-0 left-0 z-10 flex justify-around border-t bg-white py-2">
        <button className="text-primary-900 flex flex-col items-center">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
          <span className="mt-1 text-xs">메인</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
          <span className="mt-1 text-xs">기록</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
          <span className="mt-1 text-xs">레시피</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
          </svg>
          <span className="mt-1 text-xs">급식표</span>
        </button>
      </nav>
      <div className="h-[56px]"></div>
    </>
  );
}
