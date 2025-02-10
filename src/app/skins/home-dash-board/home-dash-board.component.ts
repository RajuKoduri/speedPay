import { Component, OnInit } from '@angular/core';
import { ToolsService } from 'src/app/source/Tools.service';
@Component({
  selector: 'app-home-dash-board',
  templateUrl: './home-dash-board.component.html',
  styleUrls: ['./home-dash-board.component.css']
})
export class HomeDashBoardComponent implements OnInit {
  public tablist = [
    {
      name: 'Players', url: '/playerlist', icon: 'Poker Players'
    },
    { name: 'Visit Statistics', url: '/visitstatistics', icon: 'Visit statistic' },
    {
      name: 'OnlinePlayers',
      url: '/onlineplayers',
      icon: 'Online Player'

    },
    {
      name: 'Cash Tables',
      url: '/pokergamesessions',
      icon: 'Game History'
    },
    {
      name: 'Poker Tournament History',
      url: '/pokertournamenthistory',
      icon: 'Tournament History'
    },
  ]
  onlinedata = [
    {
      "onlineStats": {
        "players":
        {
          "club": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          },
          "live_tournament": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          },
          "tournament": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          }
        },

        "tournaments":
        {
          "club": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          },
          "live_tournament": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          },
          "tournament": {
            "token": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "play_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            },
            "real_money": {
              "network_player": 0,
              "bot": 0,
              "player": 0
            }
          }
        },
        "tables": {
          "real_money": {
            "network": 0,
            "shared": 0,
            "local": 0
          },
          "play_money": {
            "network": 0,
            "shared": 0,
            "local": 0
          }
        },
        "count": {
          "players": 0,
          "registrations": 0
        }
      }
    }
  ]
  OnlineStatsRes: any;
  OnlinePlayersCount: any;
  registrationsPlayersCount: any;
  ActivePlayers: any;
  ActiveTables: any;
  location: any;
  constructor(private ToolsService: ToolsService) { }

  ngOnInit(): void {
    console.log(this.onlinedata)
    let body = {}
    this.location = window.location.hash ? window.location.hash.substring(1) : window.location.pathname;
    console.log(this.location)
    this.ToolsService.getOnlineStats(body).subscribe((data) => this.OnlineStats(data))
    setInterval(() => {
      if (this.location == "/DashBoard") {
        this.ToolsService.getOnlineStats(body).subscribe(result => {
          console.log(result);
          this.OnlineStats(result)
        }
        );
      }
    }, 30000)


  }

  OnlineStats(data: any) {
    // console.log(data.registrations - count)
    this.OnlineStatsRes = data
    console.log(this.OnlineStatsRes)
    // console.log(Object.keys(this.OnlineStatsRes))
    this.OnlinePlayersCount = (this.OnlineStatsRes['players-count'])
    this.registrationsPlayersCount = (this.OnlineStatsRes['registrations-count'])
    this.ActivePlayers = (this.OnlineStatsRes.players.club.cash.player)
    this.ActiveTables = (this.OnlineStatsRes.tables.cash.local)

  }

  gotoUrl(url: any) {
    // this.router.navigate([url]);
  }
}
