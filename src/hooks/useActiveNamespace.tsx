import { useMemo } from 'react';
import { ALL_NAMESPACES, namespaceRouteKey } from '../consts';

const useActiveNamespace = () => {
  const namespace = useMemo(() => {
    const path = window.location.pathname;
    const ns = path.split('/').find((part, index, arr) => arr[index - 1] === namespaceRouteKey);
    
    return ns || ALL_NAMESPACES;
  }, [window.location.pathname]);

  return namespace;
};

export default useActiveNamespace;
