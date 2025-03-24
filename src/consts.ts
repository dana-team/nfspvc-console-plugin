import { Nfspvc } from "./types/nfspvc";

const v1 = 'v1';

export const ReadWriteMany = "ReadWriteMany";
export const ReadOnlyMany = "ReadOnlyMany";
export const ReadWriteOnce = "ReadWriteOnce";

export const setPath = 'setPath';
export const setName = 'setName';
export const setServer = 'setServer';
export const setCapacityValue = 'setCapacityValue';
export const setCapacityUnit = 'setCapacityUnit';
export const setProgress = 'setProgress';
export const unsetProgress = 'unsetProgress';
export const setError = 'setError';
export const setPayload = 'setPayload';
export const setAccessMode = 'setAccessMode';

export const ALL_NAMESPACES = '#ALL_NS#';
export const DEFAULT_NAMESPACE = 'default';

export const Namespace = 'Namespace';
export const Name = 'Name';
export const Size = 'Size';
export const Server = 'Server';
export const Created = 'Created';
export const PvPhase = 'PV Phase';
export const PvcPhase = 'PVC Phase';

export const columns = [Name, Namespace, Size, Server, Created, PvPhase, PvcPhase];

export const NfsPvcGroupVersionKind = {
    group: Nfspvc.apiGroup,
    version: Nfspvc.apiVersion,
    kind: Nfspvc.kind,
};

export const NamespaceGroupVersionKind = { 
    version: v1, 
    kind: Namespace
}

export const dropdownAccessModes: string[] = [ReadWriteMany, ReadWriteOnce, ReadOnlyMany];
export const dropdownCapacityUnits = { Mi: "MiB", Gi: "GiB", Ti: "TiB" };
  