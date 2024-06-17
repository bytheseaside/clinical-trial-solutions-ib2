'use client';

import React, { createContext, RefObject, useCallback, useContext, useRef, useState } from 'react';

export type LayoutContextType = {
  rootElement: HTMLElement | null;
  pending: boolean;
  wait(): void;
  complete(): void;
  addSection(
    name: string,
    ref: RefObject<HTMLElement> | null,
    onCall?: () => void,
  ): void;
  removeSection(name: string): void;
  scroll(name: string): void;
};

export const LayoutContext = createContext<LayoutContextType>({
  rootElement: null,
  pending: false,
  wait: () => { },
  complete: () => { },
  addSection: () => { },
  removeSection: () => { },
  scroll: () => { },
});

type RefsObject = Record<string, {
  ref: React.RefObject<HTMLElement>;
  onCall?(): void;
} | null>;

type Props = {
  children?: React.ReactNode;
  commonData: Record<string, string>;
};

declare const document: Document;

export const LayoutContextProvider: React.FC<Props> = ({
  children,
  commonData,
}) => {
  const [pending, setPending] = useState<number>(0);

  const refs = useRef<RefsObject>({});

  const addSection = useCallback(
    (
      name: string,
      ref: React.RefObject<HTMLElement> | null = null,
      onCall?: () => void,
    ) => {
      refs.current = {
        ...refs.current,
        [name]: ref ? { ref, onCall } : null,
      };
    },
    [],
  );

  const removeSection = useCallback((name: string) => {
    refs.current = {
      ...refs.current,
      [name]: null,
    };
  }, []);

  const scroll = useCallback((name: string) => {
    const refToSection = refs.current[name as keyof RefsObject];
    if (refToSection?.ref?.current) {
      refToSection.ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      refToSection.onCall?.();
    }
  }, []);

  return (
    <LayoutContext.Provider
      value={{
        get rootElement() {
          if (typeof window !== 'undefined') {
            return document.documentElement;
          }
          return null;
        },
        get pending() {
          return pending > 0;
        },
        scroll,
        addSection,
        removeSection,
        wait: () => setPending((value) => value + 1),
        complete: () => setPending((value) => (value < 0 ? 0 : value - 1)),
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayoutContext = () => useContext(LayoutContext);
