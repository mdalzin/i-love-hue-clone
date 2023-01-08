import { useEffect } from 'react';
import { Event } from '../types';


export default function useDocumentEvent(event: Event, callback: (e: MouseEvent | UIEvent) => any) {

  useEffect(() => {
    document.addEventListener(event, callback);
    return () => document.removeEventListener(event, callback);
  });
}