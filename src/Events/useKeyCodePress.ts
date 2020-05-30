import { useState, useEffect } from 'react';

type Key = { key: string, keyCode: number };

const initialKey: Key = {
  key: "",
  keyCode: 0,
}

const getKey = (event: KeyboardEvent): Key => ({
  key: event.key,
  keyCode: event.keyCode,
})

const useKeyCodePress = () => {
  const [keyCodePressed, setKeyCodePressed] = useState(initialKey);

  const onKeyDown = (event: KeyboardEvent) => {
    setKeyCodePressed(getKey(event));
  }

  const onKeyUp = (_: any) => {
    setKeyCodePressed(initialKey);
  }

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    }
  }, []);

  return keyCodePressed;
}

export const useEnterPress = () => {
  const keyCodePress: Key = useKeyCodePress();
  return keyCodePress.key === "Enter";
}