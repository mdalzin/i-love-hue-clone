import { useState } from 'react';
import { Event } from '../types';
import useElementEvent from './useElementEvent';
import useDocumentEvent from './useDocumentEvent';

export function useIsClicked(element: any) {

  const [isClicked, setIsClicked] = useState(false);

  useElementEvent(element, Event.MouseDown, () => setIsClicked(true));
  useDocumentEvent(Event.MouseUp, () => setIsClicked(false));

  return isClicked;
}