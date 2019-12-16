import * as React from 'react';
import { render } from 'react-dom';

import { useTable, Column, useSortBy } from 'react-table';

import './styles.css';

const columns: Column<Data>[] = [
  {
    Header: '名前',
    accessor: 'name'
  },
  {
    Header: '年齢',
    accessor: 'age'
  }
];

interface Data {
  name: string;
  age: number;
}

const data: Data[] = [
  {
    name: 'John',
    age: 23
  },
  {
    name: 'Jane',
    age: 26
  }
];

function App() {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable<Data>({ columns, data }, useSortBy);

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {console.log(column.getSortByToggleProps())}
                {column.render('Header')}
                <span>
                  {' '}
                  {column.isSorted
                    ? column.isSortedDesc
                      ? ' 🔽'
                      : ' 🔼'
                    : ''}{' '}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
