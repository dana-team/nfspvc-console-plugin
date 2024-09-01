import { ResourceLink, Timestamp } from '@openshift-console/dynamic-plugin-sdk';
import { Tbody, Td, Tr } from '@patternfly/react-table';
import * as React from 'react';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';
import { NamespaceGroupVersionKind, NfsPvcGroupVersionKind } from '../../consts';
import '../../global.css';

const TableBody = ({ data, columns }) => {
    return (
        <Tbody>
            {data.map((obj: K8sResourceCommon, rowIndex: number) => (
                <Tr key={rowIndex}>
                    <Td dataLabel={columns[0]}>
                        <ResourceLink
                            groupVersionKind={NfsPvcGroupVersionKind}
                            name={obj.metadata.name}
                            namespace={obj.metadata.namespace}
                        />
                    </Td>
                    <Td dataLabel={columns[1]}>
                        <ResourceLink
                            groupVersionKind={NamespaceGroupVersionKind}
                            name={obj.metadata.namespace}
                        />
                    </Td>
                    <Td dataLabel={columns[2]}>{obj.spec?.capacity?.storage || '-'}</Td>
                    <Td dataLabel={columns[3]}>{obj.spec?.server || '-'}</Td>
                    <Td dataLabel={columns[4]}>
                        {obj.metadata.creationTimestamp ? (
                            <Timestamp timestamp={obj.metadata.creationTimestamp} />
                        ) : (
                            '-'
                        )}
                    </Td>
                    <Td dataLabel={columns[5]}>{obj.status?.pvPhase || '-'}</Td>
                    <Td dataLabel={columns[6]}>{obj.status?.pvcPhase || '-'}</Td>
                </Tr>
            ))}
        </Tbody>
    );
}

export default TableBody;