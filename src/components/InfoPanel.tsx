import React from 'react';
import {
    Tooltip,
    Button,
    Box
} from '@material-ui/core';
import { DataGrid, RowsProp, ColDef, CellParams } from '@material-ui/data-grid';



interface IProps {
    abilities: any[]
    buffs: any[]
}

interface IState {

}

export default class InfoPanel extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            abilityList: [],
            buffList: []
        };
    }


    render() {
        const rows: RowsProp = [];
        const columns: ColDef[] = [
            { field: 'name', headerName: 'Name', width: 250 },
            { field: 'action', headerName: 'Action', width: 120 },
            { field: 'atk', headerName: 'Atk', width: 120 },
            {
                field: 'effect', headerName: 'Effect', flex: 100,
                renderCell: (params: CellParams) => (
                    <strong>
                        {(params.value as string).split("|||")[0]}
                        <Tooltip title={(params.value as string).split("|||")[1]} arrow interactive>
                            <Button>?</Button>
                        </Tooltip>
                    </strong>
                )
            }
        ];

        for (let i = 0; i < this.props.abilities.length; i++) {
            var a = this.props.abilities[i];
            rows.push(
                {
                    id: i,
                    name: a["name"],
                    action: a["action"],
                    atk: a["atk"],
                    effect: a["dmg"] + " " + a["effect"] + "|||" + a["detail"].replaceAll("\"", "")
                }
            )

        }
        return (
            <Box minHeight="25%">
                <h3>Abilities</h3>
                <div style={{ height: 300, width: '100%' }}>
                    <DataGrid
                        hideFooter={true}
                        hideFooterPagination={true}
                        rows={rows}
                        columns={columns} />
                </div>
            </Box>

        )
    }

}
