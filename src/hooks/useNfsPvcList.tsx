import { useCallback, useMemo, useState } from 'react';
import { useActiveNamespace, useK8sWatchResource } from '@openshift-console/dynamic-plugin-sdk';
import { K8sResourceCommon } from 'src/types/k8sResourceCommon';
import { ALL_NAMESPACES, columns, NfsPvcGroupVersionKind } from '../consts';
import { columnMappings, compareValues, getValue } from '../utils/sort';

const useNfsPvcList = () => {
    const [sortBy, setSortBy] = useState({ index: 0, direction: 'asc' });
    const [searchValue, setSearchValue] = useState<string>('');
    const [ns] = useActiveNamespace();
    const namespace = ns === ALL_NAMESPACES ? undefined : ns;

    const [nfspvcs, loaded, error] = useK8sWatchResource<K8sResourceCommon[]>({
        groupVersionKind: NfsPvcGroupVersionKind,
        isList: true,
        namespace,
    });

    const onSort = useCallback((_, index, direction) => setSortBy({ index, direction }), []);
    const handleSearchInputChange = useCallback((_, value: string) => setSearchValue(value), []);

    const filteredData = useMemo(() => {
        if (!nfspvcs) return [];
        return nfspvcs.filter((obj) => obj.metadata.name.toLowerCase().includes(searchValue.toLowerCase()));
    }, [nfspvcs, searchValue]);

    const sortedData = useMemo(() => {
        if (!filteredData) return [];
        const selectedColumnKey = columns[sortBy.index];
        return [...filteredData].sort((a, b) => {
            const aValue = getValue(a, selectedColumnKey as keyof typeof columnMappings);
            const bValue = getValue(b, selectedColumnKey as keyof typeof columnMappings);
            return compareValues(aValue, bValue, sortBy.direction);
        });
    }, [filteredData, sortBy]);

    return {
        nfspvcs,
        sortedData,
        searchValue,
        setSearchValue,
        handleSearchInputChange,
        onSort,
        sortBy,
        loaded,
        error,
    };
};

export default useNfsPvcList;
