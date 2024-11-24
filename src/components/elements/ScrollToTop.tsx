"use client";

import { useEffect } from "react";

type ScrollToTopProps = {
  search: string | undefined; 
  page:number
};

const ScrollToTop = ({ search, page}: ScrollToTopProps) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [search, page]); 

  return null;
};

export default ScrollToTop;
