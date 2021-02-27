import React from "react";
import NavBar from "./components/NavBar";
import ManagePowersPanel from "./components/ManagePowersPanel";
import ManageArchPanel from "./components/ManageArchPanel";

import InfoPanel from "./components/InfoPanel";
import { stringNumberComparer } from "@material-ui/data-grid";

interface IArch {
  name: string
  level: number
  lesserRank: number
  minorRank: number
  majorRank: number
  characterPoints: number
  trainingPoints: number
  willDice: number
}

interface IState {
  showManagePowersPanel: boolean
  showManageArchPanel: boolean
  selectedPowers: any
  selectedArch: string
  level: number
  powerData: any[]
  archData: any[]
  parsedAbilities: any[]
  parsedBuffs: any[]
  parsedArch: IArch | null
}

interface IProps {
}

export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      showManagePowersPanel: false,
      showManageArchPanel: false,
      selectedPowers: {},
      selectedArch: "",
      level: 1,
      powerData: [],
      archData: [],
      parsedAbilities: [],
      parsedBuffs: [],
      parsedArch: null
    }

  }

  componentDidMount() {
    let archName = window.localStorage.getItem("selectedArch");
    let level = window.localStorage.getItem("level");
    let sp = window.localStorage.getItem("selectedPowers");

    if (archName){
      this.setState({
        selectedArch: archName
      })
    }
    if (level){
      this.setState({
        level: JSON.parse(level)
      })
    }
    if (sp){
      this.setState({
        selectedPowers: JSON.parse(sp)
      })
    }
    fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/powers.csv")
      .then((r) => r.text())
      .then(text => {
        this.setState({
          powerData: this.csvToJson(text)
        });
        this.parseData();
      });

    fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/arch.csv")
      .then((r) => r.text())
      .then(text => {
        this.setState({
          archData: this.csvToJson(text)
        });
        this.parseData();
      });
  }

  render() {
    return (
      <div>
        <NavBar
          toggleManagePowers={
            this.showManagePowersPanel
          }
          toggleManageArch={
            this.showManageArchPanel
          }
        />
        <main className="container">
          {this.state.selectedArch == "" ? (<strong>Select an Archetype</strong>) : 
            (<InfoPanel
              abilities={this.state.parsedAbilities}
              buffs={this.state.parsedBuffs}
            />)}
        </main>
        {
          this.state.showManagePowersPanel &&
          (<ManagePowersPanel
            powerData={this.state.powerData}
            selectedPowers={this.state.selectedPowers}
            handleConfirm={(selectedPowers: any) =>
              this.updateSelectedPowers(selectedPowers)
            }
            handleClose={() => this.closePanels()
            }
          />)}
        {
          this.state.showManageArchPanel &&
          (<ManageArchPanel
            archData={this.state.archData}
            selectedArch={this.state.selectedArch}
            level={this.state.parsedArch ? this.state.parsedArch.level : 1}
            handleConfirm={(name: string, level: number) =>
              this.updateSelectedArch(name, level)
            }
            handleClose={() => this.closePanels()
            }
          />)
        }
      </div >
    );
  }

  closePanels = () => {
    this.setState({
      showManagePowersPanel: false,
      showManageArchPanel: false
    })
  }

  updateSelectedArch(name: string, lev: number) {
    this.setState({
      selectedArch: name,
      level: lev
    })
    window.localStorage.setItem("selectedArch", name);
    window.localStorage.setItem("level", JSON.stringify(lev));
    this.parseData(this.state.selectedPowers, name, lev);
    this.closePanels();
  }

  updateSelectedPowers(selectedPowers: any) {
    this.setState({
      selectedPowers: selectedPowers
    })
    window.localStorage.setItem("selectedPowers", JSON.stringify(selectedPowers));
    this.parseData(selectedPowers);
    this.closePanels();
  }

  showManagePowersPanel = () => {
    this.setState({
      showManagePowersPanel: true
    }
    );
  }
  showManageArchPanel = () => {
    this.setState({
      showManageArchPanel: true
    }
    );
  }

  //var csv is the CSV file with headers
  public csvToJson(csv: string) {

    var lines = csv.split("\r\n");

    var result = [];

    //todo would be nice to support commas in data
    //by skipping escaped commas
    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {

      var obj: any = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);

    }

    return result;
    //return JSON.stringify(result); //JSON
  }



  private parseData(sp: any = this.state.selectedPowers, selectedArch: string = this.state.selectedArch, level: number = this.state.level) {
    if (selectedArch === "" ||
      level === 0 ||
      this.state.archData === [] ||
      this.state.powerData === []
    ) {
      return;
    }

    var parsedArch: IArch = {
      characterPoints: 0,
      lesserRank: 0,
      level: level,
      majorRank: 0,
      minorRank: 0,
      name: selectedArch,
      trainingPoints: 0,
      willDice: 0
    }

    this.state.archData.forEach(function (row) {
      if (row["Arch"] === selectedArch) {
        var val = row["Level " + level];
        var detail = row["Detail"];
        //todo - add detail to parsedArch
        switch (row["Row"]) {
          case "CP":
            parsedArch.characterPoints = val;
            break;
          case "TP":
            parsedArch.trainingPoints = val;
            break;
          case "Major":
            parsedArch.majorRank = val;
            break;
          case "Minor":
            parsedArch.minorRank = val;
            break;
          case "Lesser":
            parsedArch.lesserRank = val;
            break;
          case "Will Dice":
            parsedArch.willDice = val;
            break;
          default:
          //do nothing
        }
      }
    });

    var abilities: any[] = [];
    var buffs: any[] = [];
    //todo - get Powers to give you the appropriate abilities and buffs
    this.state.powerData.forEach(power => {
      if (sp[power["Power"]] &&
        sp[power["Power"]] > 0 &&
        parsedArch) {
        var rank = 0;
        switch (sp[power["Power"]]) {
          case 1:
            rank = parsedArch.lesserRank;
            break;
          case 2:
            rank = parsedArch.minorRank;
            break;
          case 3:
            rank = parsedArch.majorRank;
            break;
          default:
            //do nothing
            break;
        }
        if (power["Row"] === "Ability") {
          var ability = {
            "name": power["Power"],
            "action": power["Action"],
            "dmg": power["r" + rank],
            "atk": "1d20",
            "effect": power["Effect"],
            "detail": power["Detail"],
            "tags": power["Tags"].split(" "),
            "condition": power["Condition"]
          };

          abilities.push(ability);
        } else if (power["row"] === "Buff") {
          //todo
        }
      }
    });

    //todo - apply buffs

    this.setState({
      parsedAbilities: abilities,
      parsedBuffs: buffs,
      parsedArch: parsedArch
    })


  }
}
