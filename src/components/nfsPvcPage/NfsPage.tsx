import { useActiveNamespace } from '@openshift-console/dynamic-plugin-sdk';
import { Button, Page, PageSection } from '@patternfly/react-core';
import * as React from 'react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ALL_NAMESPACES, DEFAULT_NAMESPACE } from '../../consts';
import '../../global.css';
import { Nfspvc } from '../../types/nfspvc';
import NfsPvcList from './NfsPvcList';


const createNfsPvcInNamespacePath = (namespace: string): string => {
  const isAllProjects = namespace === ALL_NAMESPACES;
  const { apiGroup, apiVersion, kind } = Nfspvc;
  const reference = `${apiGroup}~${apiVersion}~${kind}`;

  return `/k8s/ns/${isAllProjects ? DEFAULT_NAMESPACE : namespace}/${reference}/~new/form`;
};


const NfsPage: React.FC = () => {
  const [namespace] = useActiveNamespace();
  const createPath = useMemo(() => createNfsPvcInNamespacePath(namespace), [namespace]);

  return (
    <Page>
      <PageSection variant="light">
        <div className="header">
          <h1 className="m-0">
            <div className="co-m-pane__name m-0">Nfs Pvc's</div>
          </h1>
          <Link to={createPath}>
            <Button variant="primary">
              Create Nfs PVC
            </Button>
          </Link>
        </div>
      </PageSection>
      <PageSection variant="light">
        <NfsPvcList />
      </PageSection>
    </Page>
  );
};

export default NfsPage;
