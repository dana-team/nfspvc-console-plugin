import { useReducer, useState, useEffect } from 'react';
import { Nfspvc } from '../types/nfspvc';
import { commonReducer, defaultState } from '../utils/state';
import { setPayload } from '../consts';

export const useCreateNfsPvcState = (namespace: string) => {
  const [state, dispatch] = useReducer(commonReducer, defaultState);
  const [isAccessModeOpen, setIsAccessModeOpen] = useState(false);
  const [isStorageUnitOpen, setIsStorageUnitOpen] = useState(false);
  const { apiGroup, apiVersion, kind } = Nfspvc;

  useEffect(() => {
    const obj = {
      apiVersion: `${apiGroup}/${apiVersion}`,
      kind: kind,
      metadata: {
        name: state.name,
        namespace,
      },
      spec: {
        path: state.path,
        capacity: { storage: `${state.capacityValue}${state.capacityUnit}` },
        server: state.server,
        accessModes: [state.AccessMode],
      },
    };
    dispatch({ type: setPayload, payload: obj });
  }, [namespace, state.name, state.path, state.capacityValue, state.capacityUnit, state.server, state.AccessMode]);

  return {
    state,
    dispatch,
    isAccessModeOpen,
    setIsAccessModeOpen,
    isStorageUnitOpen,
    setIsStorageUnitOpen,
  };
};
