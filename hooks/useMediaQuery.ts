import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const mq = window.matchMedia(query);
    
    const onChange = () => setMatches(mq.matches);
    onChange(); // set initial value on mount
    
    mq.addEventListener("change", onChange);
    
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  
  return matches;
}