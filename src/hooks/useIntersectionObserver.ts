// https://chatgpt.com/c/672e5364-7408-8007-be0d-f2d1f44fe574

import {  useEffect, useState,  } from "react";

type OptionType = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
};
type UseIntersectionObserverProps<T extends HTMLElement>= {
  options:OptionType[];
  refs: React.RefObject<T>[];
};
const useIntersectionObserver = <T extends HTMLElement>({
  options = [],
  refs,
}: UseIntersectionObserverProps<T>) => {

  const [isLoaded, setIsLoaded] = useState<boolean[]>(new Array(refs.length).fill(false));
  // new Array(refs.length).fill(false)→[false, false, false,...]をrefの数だけ作っている

  useEffect(() => {
    
    // 後で全部のobserverを一気にcleanupするため
    const observers: IntersectionObserver[] = [];

    // loadTextはIntersection Observerを使っているページが最初にローディングされたときと、そのページの複数の監視対象の要素が一つでも(複数同時でも)viewに入ったら読まれ、それがentriesの中に一つviewに入ったなら一つだけentryが、複数同時に入ったなら複数のentryがentries引数の中に入る
    const loadText = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        const index = refs.findIndex(ref => ref.current === entry.target);
        if (index === -1) return; 

        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          setIsLoaded(prev =>
            prev.map((value, i) => i === index ? true : value)
          );
        }
      });
    };

    refs.forEach((ref, index) => {
      const observer = new IntersectionObserver(entries => loadText(entries, observer), options[index]);

      if (ref.current) {
        observer.observe(ref.current);
      } 
      
      observers.push(observer);
      // pushは以下でcleanupをするため
    });

    return () => {
      observers.forEach(observer => {
        observer.disconnect(); 
      });
    };
  }, [options, refs]);

  return isLoaded;
};

export default useIntersectionObserver;




// 一つ一つにするなら
// import { useEffect, useState } from "react";

// type OptionType = {
//   root?: Element | null;
//   rootMargin?: string;
//   threshold?: number | number[];
// };
// type UseIntersectionObserverProps<T extends HTMLElement> = {
//   options: OptionType;
//   ref: React.RefObject<T>;
// };

// const useIntersectionObserver = <T extends HTMLElement>({
//   options,
//   ref,
// }: UseIntersectionObserverProps<T>) => {

//   const [isLoaded, setIsLoaded] = useState<boolean>(false);

//   useEffect(() => {
//     if (!ref.current) return; // refがnullの場合は何もしない

//     const observer = new IntersectionObserver((entries) => {
//       const entry = entries[0]; // 単一要素の監視なので、entries[0]で直接参照
//       if (entry.isIntersecting) {
//         observer.unobserve(entry.target);
//         setIsLoaded(true);
//       }
//     }, options);

//     observer.observe(ref.current);

//     return () => {
//       observer.disconnect(); // クリーンアップでオブザーバーを解放
//     };
//   }, [options, ref]);

//   return isLoaded;
// };

// export default useIntersectionObserver;
