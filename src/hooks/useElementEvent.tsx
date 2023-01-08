import { useEffect } from 'react';
import { Event } from '../types';


export default function useElementEvent(element: React.RefObject<HTMLDivElement>, event: Event, callback: () => any) {

  function assignListener() {
    if (element.current) {
      element.current.addEventListener(event, callback);
    }
  }

  useEffect(() => {
    assignListener()
    return assignListener;
  });
}