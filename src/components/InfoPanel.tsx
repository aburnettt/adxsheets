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
        const buffRows: RowsProp = [];
        const buffColumns: ColDef[] = [];



        const abilityRows: RowsProp = [];
        const abilityColumns: ColDef[] = [
            { field: 'name', headerName: 'Name', flex: 45 },
            { field: 'action', headerName: 'Action', flex: 30 },
            { field: 'atk', headerName: 'Atk', flex: 20 },
            {
                field: 'effect', headerName: 'Effect', flex: 85,
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
            abilityRows.push(
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
            <Box display="flex">
                <Box minHeight="25%" width="30%" position="Left" display="flex">
                    <div style={{ width: '500px' }}>
                        <h3>Attributes</h3>
                        <DataGrid
                            pageSize={15}
                            autoHeight={true}
                            hideFooter={true}
                            hideFooterPagination={true}

                            rows={buffRows}
                            columns={buffColumns} />
                    </div>
                </Box>
                <Box minHeight="25%" width="65%" position="right" display="flex">
                    <div style={{ width: '800px' }}>
                        <h3> Abilities</h3>
                        <DataGrid
                            pageSize={15}
                            autoHeight={true}
                            hideFooter={true}
                            hideFooterPagination={true}

                            rows={abilityRows}
                            columns={abilityColumns} />
                    </div>
                </Box>
            </Box >
        )
    }

}
