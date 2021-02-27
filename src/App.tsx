import React from "react";
import NavBar from "./components/NavBar";
import ManagePowersPanel from "./components/ManagePowersPanel";
import ManageArchPanel from "./components/ManageArchPanel";

import InfoPanel from "./components/InfoPanel";

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
  powerData: any[]
  archData: any[]
  parsedAbilities: any[]
  parsedBuffs: any[]
  parsedArch: IArch
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
      powerData: [],
      parsedAbilities: [],
      parsedBuffs: []
    }

  }

  componentDidMount() {

    let sp = window.localStorage.getItem("selectedPowers");
    if (sp != null) {
      try {
        this.parseAbilities(JSON.parse(sp));
      } catch (e) {

      }
    }

    fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/powers.csv")
      .then((r) => r.text())
      .then(text => {
        this.setState({
          powerData: this.csvToJson(text)
        });
        if (this.state.selectedPowers) {
          this.parseAbilities(this.state.selectedPowers);
        }
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
          <InfoPanel
            abilities={this.state.parsedAbilities}
            buffs={this.state.parsedBuffs}
          />


        </main>
        {this.state.showManagePowersPanel &&
          (<ManagePowersPanel
            powerData={this.state.powerData}
            selectedPowers={this.state.selectedPowers}
            handleConfirm={(selectedPowers: any) =>
              this.updateSelectedPowers(selectedPowers)
            }
            handleClose={() => this.closePanels()
            }
          />)}
        {this.state.showManageArchPanel &&
          (<ManageArchPanel
            archData={this.state.archData}
            selectedArch={this.state.selectedArch}
            handleConfirm={(selectedArch: IArch) =>
              this.updateArch(selectedArch)
            }
            handleClose={() => this.closePanels()
            }
          />)}
      </div>
    );
  }

  closePanels = () => {
    this.setState({
      showManagePowersPanel: false,
      showManageArchPanel: false
    })
  }

  updateArch(selectedArch: any) {
    window.localStorage.setItem("selectedArch", JSON.stringify(selectedArch));

    /*
    {
      major: number
      minor: number
    }
    */

    this.closePanels();
  }

  updateSelectedPowers(selectedPowers: any) {
    window.localStorage.setItem("selectedPowers", JSON.stringify(selectedPowers));
    this.parseAbilities(selectedPowers);

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



  private parseAbilities(sp: any) {
    if (!sp ||
      sp.length === 0) {
      return;
    }

    var abilities: any[] = [];
    var buffs: any[] = [];
    //todo - get Powers to give you the appropriate abilities and buffs
    this.state.powerData.forEach(power => {
      if (sp[power["Power"]] &&
        sp[power["Power"]] > 0) {
        if (power["Row"] === "Ability") {
          var ability = {
            "name": power["Power"],
            "action": power["Action"],
            "dmg": power["r5"],
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
      selectedPowers: sp
    })

    /*
            name = { a["name"]}
            atk = { a["atk"]}
            dmg = { a["dmg"]}
            effect = { a["effect"]}
            condition = { a["condition"]}
            detail = { a["detail"]}        
            */

  }
}
