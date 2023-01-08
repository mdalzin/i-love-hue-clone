import { useState } from 'react';
import { Event } from '../types';
import useElementEvent from './useElementEvent';
import useEvent from './useEvent';

export function useIsClicked(element: any) {

  const [isClicked, setIsClicked] = useState(false);

  useElementEvent(element, Event.MouseDown, () => setIsClicked(true));
  useEvent(Event.MouseUp, () => setIsClicked(false));

  return isClicked;
}