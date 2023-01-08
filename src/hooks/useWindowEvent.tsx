import { useEffect } from 'react';
import { Event } from '../types';


export default function useWindowEvent(event: Event, callback: () => any) {

  useEffect(() => {
    window.addEventListener(event, callback);
    return () => window.removeEventListener(event, callback);
  });
}