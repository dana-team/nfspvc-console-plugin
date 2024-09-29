import { K8sModel } from "@openshift-console/dynamic-plugin-sdk";

export const Nfspvc: K8sModel = {
  label: 'Nfspvc',
  apiGroup: 'nfspvc.dana.io',
  apiVersion: 'v1alpha1',
  plural: 'nfspvcs',
  abbr: 'NPC',
  namespaced: true,
  kind: 'NfsPvc',
  id: 'nfspvc',
  labelPlural: 'Nfs Pvc',
  crd: true,
};
