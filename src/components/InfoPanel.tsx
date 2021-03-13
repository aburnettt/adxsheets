import React from 'react';
import {
    Tooltip,
    Button,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Ability from "./Ability";
import Buff from "./Buff";
import Natural from "./Natural";

interface IProps {
    abilities: Ability[]
    buffs: Buff[]
    naturals: Natural[]
}


export default class InfoPanel extends React.Component<IProps> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (
            <Box display="flex">
                <Box minHeight="25%" width="30%" position="Left" display="flex">
                    <div style={{ width: '500px' }}>
                        <h3>Attributes</h3>
                        {this.props.naturals.map((n: Natural, i) => {
                            return n.render();
                        })}
                        <h3>Active Buffs</h3>
                        {this.props.buffs.map((b: Buff, i) => {
                            return b.render();
                        })}
                    </div>
                </Box>
                <Box minHeight="25%" width="65%" position="right" display="flex">
                    <div style={{ width: '800px' }}>
                        <h3> Abilities</h3>

                        <TableContainer >
                            <Table aria-label="simple table">
                                {this.props.abilities.map((a, i) => {
                                    return a.render();
                                })}
                            </Table>
                        </TableContainer>
                    </div>
                </Box>
            </Box >
        )
    }

}
