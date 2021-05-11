import _ from 'lodash';
import cx from 'classnames';
import React from 'react';
import Box, { EnhancerProps } from 'ui-box';

import { Appearance, useAppearance } from '../../application';
import { Button, ButtonProps, IconButtonProps } from '../button';
import styled from 'styled-components';

const data = [
    {
      "id": 1,
      "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/justinrob/128.jpg",
      "city": "New Amieshire",
      "email": "Leora13@yahoo.com",
      "firstName": "Ernest Schuppe",
      "lastName": "Schuppe",
      "street": "Ratke Port",
      "zipCode": "17026-3154",
      "date": "2016-09-23T07:57:40.195Z",
      "bs": "global drive functionalities",
      "catchPhrase": "Intuitive impactful software",
      "companyName": "Lebsack - Nicolas",
      "words": "saepe et omnis",
      "sentence": "Quos aut sunt id nihil qui.",
      "stars": 820,
      "followers": 70
    },
    {
      "id": 2,
      "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/thaisselenator_/128.jpg",
      "city": "New Gust",
      "email": "Mose_Gerhold51@yahoo.com",
      "firstName": "Janis",
      "lastName": "Vandervort",
      "street": "Dickinson Keys",
      "zipCode": "43767",
      "date": "2017-03-06T09:59:12.551Z",
      "bs": "e-business maximize bandwidth",
      "catchPhrase": "De-engineered discrete secured line",
      "companyName": "Glover - Hermiston",
      "words": "deleniti dolor nihil",
      "sentence": "Illo quidem libero corporis laborum.",
      "stars": 1200,
      "followers": 170
    },
    {
      "id": 3,
      "avartar": "https://s3.amazonaws.com/uifaces/faces/twitter/arpitnj/128.jpg",
      "city": "Lefflerstad",
      "email": "Frieda.Sauer61@gmail.com",
      "firstName": "Makenzie",
      "lastName": "Bode",
      "street": "Legros Divide",
      "zipCode": "54812",
      "date": "2016-12-08T13:44:26.557Z",
      "bs": "plug-and-play e-enable content",
      "catchPhrase": "Ergonomic 6th generation challenge",
      "companyName": "Williamson - Kassulke",
      "words": "quidem earum magnam",
      "sentence": "Nam qui perferendis ut rem vitae saepe.",
      "stars": 610,
      "followers": 170
    }
];

/*
 * Table Toolbar Buttons
 */
export function TableToolbarButton(props: ButtonProps) {
    return <Button appearance="transparent" height="6rem" { ...props } />
}

export function TableToolbarIconButton(props: IconButtonProps) {
    return <Button.IconButton appearance="transparent" height="6rem" { ...props } />
}

/*
 * Table Toolbar
 */
export function TableToolbar({ children, ...props }: EnhancerProps & { children: React.ReactNode }) {
    return <Box display="flex" justifyContent="flex-end" { ...props }>{ children }</Box>
}

TableToolbar.Button = TableToolbarButton;
TableToolbar.IconButton = TableToolbarIconButton;

/*
 * Table Title
 */
interface StyledTableTitleProps {
    $appearance: Appearance;
}

const StyledTableTitle = styled(Box)<StyledTableTitleProps>`
    padding: ${props => props.$appearance.spacing.x2};
    padding-bottom: ${props => props.$appearance.spacing.x6};
`;

export interface TableTitleOwnProps {
    children: React.ReactNode
}

export type TableTitleProps = TableTitleOwnProps & EnhancerProps;

export function TableTitle({ children, ...props }: TableTitleProps) {
    const appearance = useAppearance();

    return <StyledTableTitle $appearance={ appearance } { ...props }>
        { children }
    </StyledTableTitle>;
}

/*
 * Table Container
 */

interface StyledTableContainerProps {
    $appearance: Appearance;
}

const StyledTableContainer = styled(Box)<StyledTableContainerProps>`
    background: ${props => props.$appearance.colors.base.x100};

    .uik--table, .uik--content-block {
        margin-bottom: 0 !important;
    }
`;

export interface TableContainerOwnProps {
    children: React.ReactNode
}

export type TableContainerProps = TableContainerOwnProps & EnhancerProps;

export function TableContainer({ children, ...props }: TableContainerProps) {
    const appearance = useAppearance();

    const classNames = cx({
        'uik--content-block': true,
        'uik--table-container': true
    });

    return <StyledTableContainer $appearance={ appearance } className={ classNames } { ...props }>
        { children }
    </StyledTableContainer>;
}

/*
 * Table
 */

interface StyledTableProps {
    $appearance: Appearance;
}

const StyledTable = styled(Box)<StyledTableProps>`
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;

    width: 100%;

    thead {
        margin: 0;
        border: 0;
        background: ${props => props.$appearance.colors.base.x300};
        font-weight: ${props => props.$appearance.typography.weights.medium};
    }

    tbody tr {
        background: ${props => props.$appearance.colors.base.x100};
        border-bottom: 1px solid ${props => props.$appearance.colors.base.x200};
        color: ${props => props.$appearance.colors.base.x600};
        transition: background-color 0.5s, color 0.5s;
    }

    tbody tr:hover {
        background: ${props => props.$appearance.colors.base.x200};
        color: ${props => props.$appearance.colors.base.x800};
    }

    &.uik--table-zebra tbody tr:nth-child(even) {
        background: ${props => props.$appearance.colors.base.x200};
    }

    &.uik--table-zebra tbody tr:hover {
        background: ${props => props.$appearance.colors.base.x300};
    }
`;

export interface Column<T> {
    title: React.ReactNode;
    content: string | ((object: T) => React.ReactNode);
    width?: string;

    headerProps?: EnhancerProps;
    cellProps?: EnhancerProps;
}

export interface TableOwnProps<T> {
    data: Array<T>;
    columns: Array<Column<T>>;
    appearance?: 'normal' | 'zebra';
    actions?: Array<((object: T) => React.ReactNode)>
}

export type TableProps<T> = TableOwnProps<T> & EnhancerProps;

export function Table<T>({ data, columns, appearance: tableAppearance, actions = [], ...props }: TableProps<T>) {
    const appearance = useAppearance();
    const defaultHeaderProps: EnhancerProps = {
        whiteSpace: 'nowrap',
        textAlign: 'left',
        lineHeight: '5rem',
        paddingX: appearance.spacing.x2,
        verticalAlign: 'top'
    };

    const defaultCellProps: EnhancerProps = {
        textAlign: 'left',
        whiteSpace: 'nowrap',
        lineHeight: '5rem',
        paddingX: appearance.spacing.x2,
        verticalAlign: 'top'
    }

    const classNames = cx({
        'uik--content-block': true,
        'uik--table': true,
        [`uik--table-${tableAppearance}`]: true
    });

    return <StyledTable is="table" className={ classNames } $appearance={ appearance } { ...props }>
        <thead>
            <tr>
                { 
                    _.map(columns, column => <React.Fragment key={ column.title?.toString() }>
                        <Box is="th" { ...(_.assign({}, defaultHeaderProps, column.headerProps)) }>{ column.title }</Box>
                    </React.Fragment>)
                }

                {
                    _.size(actions) > 0 && <Box is="th"></Box>
                }
            </tr>
        </thead>
        <tbody>
            {
                _.map(data, (row, idx) => <React.Fragment key={ _.get(row, 'id') || _.get(row, 'name') || `row-${idx}` }>
                    <tr>
                        {
                            _.map(columns, column => <React.Fragment key={ column.title?.toString() }>
                                <Box is="td" { ...(_.assign({}, defaultCellProps, column.cellProps)) }>
                                    { 
                                        typeof(column.content) === 'string' && <>
                                            {_.get(row, column.content)}
                                        </>
                                    }

                                    {
                                        typeof(column.content) === 'function' && <>
                                            { column.content(row) }
                                        </>
                                    }
                                </Box>
                            </React.Fragment>)
                        }

                        {
                            _.size(actions) > 0 && <Box is="td" padding="0" textAlign="right">
                                <Button.Toolbar justifyContent="right">
                                    {
                                        _.map(actions, (action, idx) => <React.Fragment key={ `action-${idx}` }>
                                            { action(row) }
                                        </React.Fragment>)
                                    }
                                </Button.Toolbar>
                            </Box>
                        }
                    </tr>
                </React.Fragment>)
            }
        </tbody>
    </StyledTable>
}

export function TableButton(props: ButtonProps) {
    return <Button appearance="transparent" height="5.1rem" { ...props } />
}

export function TableIconButton(props: IconButtonProps) {
    return <Button.IconButton appearance="transparent" height="5.1rem" { ...props } />
}

export function Sample() {
    const appearance = useAppearance();

    const columns: Array<Column<{ firstName: string }>> = [
        {
            title: '#',
            content: 'id',
            headerProps: {
                width: '60px',
                textAlign: 'center'
            },
            cellProps: {
                textAlign: 'center'
            }
        },
        {
            title: 'City',
            content: 'city'
        },
        {
            title: 'First Name',
            content: row => <>{row.firstName}</>
        }
    ];

    return <>
        <Table data={ data } columns={ columns } />
        <Table data={ data } columns={ columns } appearance="zebra" />
        <Table data={ data } columns={ columns } actions={
            [
                () => <Table.IconButton icon="trash" />,
                () => <Table.Button>Details</Table.Button>
            ]
        } />

        <Table.Container>
            <Table.Title>
                <h4>Hallo Freunde</h4>
                <p>
                    Lorem ipsum dolor sit amet.
                </p>
            </Table.Title>

            <Table.Toolbar>
                <Table.Toolbar.IconButton icon="filter">Filter</Table.Toolbar.IconButton>
                <Table.Toolbar.IconButton buttonColor={ appearance.colors.info } appearance="default" icon="add">Add new item</Table.Toolbar.IconButton>
            </Table.Toolbar>

            <Table data={ data } columns={ columns } />
        </Table.Container>

        <Table.Container>
            <Table.Toolbar>
                <Table.Toolbar.IconButton icon="filter">Filter</Table.Toolbar.IconButton>
                <Table.Toolbar.IconButton buttonColor={ appearance.colors.info } appearance="default" icon="add">Add new item</Table.Toolbar.IconButton>
            </Table.Toolbar>

            <Table data={ data } columns={ columns } />
        </Table.Container>
    </>
}

Table.Button = TableButton;
Table.IconButton = TableIconButton;

Table.Container = TableContainer;
Table.Title = TableTitle;
Table.Toolbar = TableToolbar;

Table.Sample = Sample;
export default Table;