import React from "react";
import NavBar from "./components/NavBar";
import ManagePowersPanel from "./components/ManagePowersPanel";
import ManageArchPanel from "./components/ManageArchPanel";
import ManageStatsPanel from "./components/ManageStatsPanel";
import InfoPanel from "./components/InfoPanel";
import Buff from "./components/Buff";
import Ability from "./components/Ability";
import Natural from "./components/Natural";
import { setSourceMapRange } from "typescript";

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
  showManageStatsPanel: boolean
  selectedPowers: any
  selectedArch: string
  level: number
  powerData: any[]
  archData: any[]
  statData: any[]
  selectedStats: any
  abilities: Ability[]
  buffs: Buff[]
  naturals: Natural[]
  arch: IArch | null
}

interface IProps {
}

export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      showManagePowersPanel: false,
      showManageArchPanel: false,
      showManageStatsPanel: false,
      selectedPowers: {},
      selectedArch: "",
      selectedStats: {},
      level: 1,
      powerData: [],
      archData: [],
      statData: [],
      abilities: [],
      buffs: [],
      naturals: [],
      arch: null
    }
  }

  componentDidMount() {
    let archName = window.localStorage.getItem("selectedArch");
    let level = window.localStorage.getItem("level");
    let sp = window.localStorage.getItem("selectedPowers");
    let ss = window.localStorage.getItem("selectedStats");
//    let ss = {};

    if (archName) {
      this.setState({
        selectedArch: archName
      })
    }
    if (level) {
      this.setState({
        level: JSON.parse(level)
      })
    }
    if (sp) {
      this.setState({
        selectedPowers: JSON.parse(sp)
      })
    }
    if (ss) {
      this.setState({
        selectedStats: JSON.parse(ss)
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
    fetch("https://raw.githubusercontent.com/aburnettt/adxsheets/master/src/data/stats.csv")
      .then((r) => r.text())
      .then(text => {
        this.setState({
          statData: this.csvToJson(text)
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
        {this.state.archData !== [] &&
          this.state.powerData !== [] && (
            <NavBar
              toggleManagePowers={
                this.showManagePowersPanel
              }
              toggleManageArch={
                this.showManageArchPanel
              }
              toggleManageStats={
                this.showManageStatsPanel
              }
            />
          )}
        <main className="container">
          {this.state.selectedArch == "" ? (<strong>Select an Archetype</strong>) :
            (<InfoPanel
              abilities={this.state.abilities}
              buffs={this.state.buffs}
              naturals={this.state.naturals}
            />)}
        </main>
        {
          this.state.showManagePowersPanel &&
          this.state.arch &&
          (<ManagePowersPanel
            powerData={this.state.powerData}
            selectedPowers={this.state.selectedPowers}
            totalCP={this.state.arch.characterPoints}
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
            level={this.state.arch ? this.state.arch.level : 1}
            handleConfirm={(name: string, level: number) =>
              this.updateSelectedArch(name, level)
            }
            handleClose={() => this.closePanels()
            }
          />)
        }
        {
          this.state.showManageStatsPanel &&
          (<ManageStatsPanel
            statData={this.state.statData}
            selectedStats={this.state.selectedStats}
            handleConfirm={(ss: any) =>
              this.updateSelectedStats(ss)
            }
            handleClose={() => this.closePanels()}
          />)
        }
      </div >
    );
  }

  closePanels = () => {
    this.setState({
      showManagePowersPanel: false,
      showManageArchPanel: false,
      showManageStatsPanel: false
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
  updateSelectedStats(selectedStats: any) {
    alert("Updating "+JSON.stringify(selectedStats));
    this.setState({
      selectedStats: selectedStats
    })
    window.localStorage.setItem("selectedStats", JSON.stringify(selectedStats));
    this.parseData(this.state.selectedPowers, this.state.selectedArch, this.state.level, selectedStats);
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
  showManageStatsPanel = () => {
    this.setState({
      showManageStatsPanel: true
    }
    );
  }
  getRank = (parsedArch: IArch, tier: number) => {
    switch (tier) {
      case 1:
        return (parsedArch.lesserRank);
      case 2:
        return (parsedArch.minorRank);
      case 3:
        return (parsedArch.majorRank);
      default:
        return 0;
    }
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

  private parseData(sp: any = this.state.selectedPowers, selectedArch: string = this.state.selectedArch, level: number = this.state.level, selectedStats: any = this.state.selectedStats) {
    if (selectedArch === "" ||
      level === 0 ||
      this.state.archData === [] ||
      this.state.powerData === [] ||
      this.state.statData === []) {
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

    var abilities: Ability[] = [];
    var buffs: Buff[] = [];
    var naturals: Natural[] = [];

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

    //STATS
    this.state.statData.forEach(stat => {
      //Every row gets added unless the value is X
      var statName = stat["Stat"];
      var rank = selectedStats[statName];
    
      //alert(JSON.stringify(this.state.selectedStats));

      if (stat[rank] != "X") {
        switch (stat["Row"]) {
          case "Ability":
            abilities.push(new Ability({
              action: stat["Action"],
              name: stat["Attribute"],
              value: stat[rank],
              effect: stat["Effect"],
              detail: stat["Detail"],
              tags: ((stat["Tags"].length > 0) ? (stat["Tags"].split(" ")) : []),
              condition: stat["Condition"],
              buffs: [],
              color: this.nameToColor(statName)
            }));
            break;
          case "Natural":
            naturals.push(new Natural({
              name: stat["Attribute"],
              value: stat[rank],
              buffs: []
            }));
            break;
          case "Buff":
            buffs.push(new Buff({
              source: stat,
              effect: stat["Effect"],
              value: stat[rank],
              condition: stat["Condition"],
              detail: stat["Detail"],
              tags: (stat["Tags"].length > 0) ? (stat["Tags"].split(" ")) : [],
              color: this.nameToColor(statName)
            }));
            break;
        }
      }
    });

    this.state.powerData.forEach(power => {
      if (sp[power["Power"]] &&
        sp[power["Power"]] > 0 &&
        parsedArch) {
        var rank = this.getRank(parsedArch, sp[power["Power"]]);
        if (power["Row"] === "Ability") {
          abilities.push(new Ability({
            action: power["Action"],
            name: power["Power"],
            value: power["r" + rank],
            effect: power["Effect"],
            detail: power["Detail"],
            tags: ((power["Tags"].length > 0) ? (power["Tags"].split(" ")) : []),
            condition: power["Condition"],
            buffs: [],
            color: this.nameToColor(power["Power"])
          }));
        } else if (power["Row"] === "Buff") {
          buffs.push(new Buff({
            source: power["Power"],
            effect: power["Effect"],
            value: power["r" + rank],
            condition: power["Condition"],
            detail: power["Detail"],
            tags: (power["Tags"].length > 0) ? (power["Tags"].split(" ")) : [],
            color: this.nameToColor(power["Power"])
          }));
        }
      }
    });

    buffs.map((b, j) => {
      abilities.map((a, i) => {
        this.tryOnBuff(a, b);
      });
      naturals.map((n, i) => {
        this.tryOnBuff(n, b);
      });
    });

    this.setState({
      abilities: abilities,
      buffs: buffs,
      naturals: naturals,
      arch: parsedArch
    })
  }

  private tryOnBuff(a: Natural | Ability, b: Buff) {
    var match = false;
    if (a.getName() === b.getName()){
      a.addBuff(b);
      return true;
    }
    a.getTags().forEach(tag => {
      if (b.getTags().includes(tag)) {
        a.addBuff(b);
        return true;
      }
    });
  }

  private nameToColor(name: string) {
    //makes a light color from any string

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
}
