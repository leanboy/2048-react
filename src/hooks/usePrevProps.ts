import * as React from 'react';

export const usePrevProps = <K = any>(value: K) => {
  const ref = React.useRef<K>();

  React.useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}
