import { Th, Thead, Tr } from '@patternfly/react-table';
import * as React from 'react';
import '../../global.css';

const TableHead = ({ columns, sortBy, onSort }) => {
  return (
    <Thead>
      <Tr>
        {columns.map((columnTitle: string, index: number) => (
          <Th
            key={index}
            sort={{
              sortBy,
              onSort,
              columnIndex: index
            }}
          >
            {columnTitle}
          </Th>
        ))}
      </Tr>
    </Thead>
  );
}

export default TableHead;