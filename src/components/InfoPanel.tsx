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


    private nameToColor(name: string) {
        //makes a light color from any string

        //AABBCC RGB
        //keep each between 00-3F
        //

        // var code = (Math.abs(this.hashCode(a["name"])).toString(10));
        // var red = Math.round(Number(code.substr(0, 2)) / 3);
        // var green = Math.round(Number(code.substr(2, 2)) / 3);
        // var blue = Math.round(Number(code.substr(4, 2)) / 3);
        // const color = "#" + 
        // ((red < 10) ? "0" : "") + red + 
        // ((green < 10) ? "0" : "") + green + 
        // ((blue < 10) ? "0" : "") + blue;


        var h = 0, l = name.length, i = 0;
        if (l > 0)
            while (i < l)
                h = (h << 5) - h + name.charCodeAt(i++) | 0;
        var code = (Math.abs(h).toString(16));
        var red = (255 - (Math.round(parseInt(code.substr(0, 2), 16) / 2))).toString(16);
        var green = (255 - (Math.round(parseInt(code.substr(2, 2), 16) / 2))).toString(16);
        var blue = (255 - (Math.round(parseInt(code.substr(4, 2), 16) / 2))).toString(16);
        const color = "#" + red + green + blue;
        return color;
    }
    render() {




        var abilityHeaders: string[] = [
            "Action",
            "Atk",
            "Effect"
        ]

        return (
            <Box display="flex">
                <Box minHeight="25%" width="30%" position="Left" display="flex">
                    <div style={{ width: '500px' }}>
                        <h3>Attributes</h3>
                        {this.props.buffs.map((b, i) => {
                            return (<Buff
                                key={i}
                                buff={b}
                                color={this.nameToColor(b.effect)} />);
                        })}
                    </div>
                </Box>
                <Box minHeight="25%" width="65%" position="right" display="flex">
                    <div style={{ width: '800px' }}>
                        <h3> Abilities</h3>

                        <TableContainer >
                            <Table aria-label="simple table">
                                {this.props.abilities.map((a, i) => {
                                    return (<Ability key={i}
                                        ability={a}
                                        color={this.nameToColor(a.name)} />
                                    )
                                })}
                            </Table>
                        </TableContainer>

                    </div>
                </Box>
            </Box >
        )
    }

}
