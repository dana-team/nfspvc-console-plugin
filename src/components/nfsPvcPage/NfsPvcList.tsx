import { Alert, EmptyState, EmptyStateBody, FormGroup, SearchInput, Spinner, Title } from '@patternfly/react-core';
import { Table } from '@patternfly/react-table';
import * as React from 'react';
import { columns } from '../../consts';
import '../../global.css';

import TableBody from './NfsPvcTableBody';
import TableHead from './NfsPvcTableHead';
import useNfsPvcList from '../../hooks/useNfsPvcList';

const NfsPvcList: React.FC = () => {
    const {
        nfspvcs,
        sortedData,
        searchValue,
        setSearchValue,
        handleSearchInputChange,
        onSort,
        sortBy,
        loaded,
        error,
    } = useNfsPvcList();
    
    if (!loaded) {
        return (
            <EmptyState>
                <Spinner size="xl" />
            </EmptyState>
        );
    }

    if (error) {
        return (
            <Alert variant="danger" title="Error loading NFS PVCs">
                {error.message || 'An unknown error occurred.'}
            </Alert>
        );
    }

    return nfspvcs.length === 0 ? (
        <EmptyState>
            <Title headingLevel="h4" size="lg">
                No NFS PVCs found
            </Title>
            <EmptyStateBody>
                Create an NFS PVC to get started.
            </EmptyStateBody>
        </EmptyState>
    ) : (
        <>
            <FormGroup isRequired fieldId="search">
                <div className="pf-c-input-group" style={{ width: '20%', paddingBottom: '20px' }}>
                    <SearchInput
                        placeholder="Search by name"
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        onClear={() => setSearchValue('')}
                    />
                </div>
            </FormGroup>
            <Table aria-label="NFS PVCs" variant="compact">
                <TableHead columns={columns} sortBy={sortBy} onSort={onSort} />
                <TableBody data={sortedData} columns={columns} />
            </Table>
        </>
    );
};

export default NfsPvcList;
