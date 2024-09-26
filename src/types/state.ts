import { K8sResourceKind } from "@openshift-console/dynamic-plugin-sdk";

export type State = {
    name: string;
    nameError?: string;
    server: string;
    serverError?: string;
    capacityValue: string;
    capacityUnit: string;
    path: string;
    pathError?: string;
    AccessMode: string;
    progress: boolean;
    error: string;
    payload: K8sResourceKind;
};
