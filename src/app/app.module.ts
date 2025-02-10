import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
// import { SafeResourceUrl } from '@angular/platform-browser';
// import { SafeHtml } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './skins/login/login.component';
import { DashboardComponent } from './skins/dashboard/dashboard.component';
import { ServerDetailsComponent } from './skins/serverDetails/server-details/server-details.component';
import { AdminControlComponent } from './skins/admin-control/adminstrator/admin-control.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidemenuComponent } from './skins/sidemenu/sidemenu.component';
import { CommonModule } from '@angular/common';
// import { OnlineplayersComponent } from './skins/onlineplayers/onlineplayers.component';
import { MinutesPipePipe } from './pipe/minutes-pipe.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CasinogamesessoinsComponent } from './skins/Casino Games/casinogamesessoins/casinogamesessoins.component';
import { GameroundlistComponent } from './skins/Casino Games/gameroundlist/gameroundlist.component';
import { GameslistComponent } from './skins/Casino Games/gameslist/gameslist.component';
import { FreemoneygamesComponent } from './skins/Casino Games/freemoneygames/freemoneygames.component';
// import { MatSliderModule } from '@angular/material/slider';
import { ExitpermissionComponent } from './skins/exitpermission/exitpermission.component';
import { PokerrakestructureComponent } from './skins/pokergames/settings/pokerrakestructure/pokerrakestructure.component';
import { PokersitandgosComponent } from './skins/pokergames/settings/pokersitandgos/pokersitandgos.component';
import { PokerblindstructuresComponent } from './skins/pokergames/settings/pokerblindstructures/pokerblindstructures.component';
import { PokerpayouttablesComponent } from './skins/pokergames/settings/pokerpayouttables/pokerpayouttables.component';
import { TimeoutsettingsComponent } from './skins/pokergames/settings/timeoutsettings/timeoutsettings.component';
import { PeriodicalpromotionsettingsComponent } from './skins/promotions/periodicalpromotionsettings/periodicalpromotionsettings.component';
import { PromotinalcodesComponent } from './skins/promotions/promotinalcodes/promotinalcodes.component';
import { DepositbonussettingsComponent } from './skins/promotions/depositbonussettings/depositbonussettings.component';
import { BonusabuseComponent } from './skins/promotions/bonusabuse/bonusabuse.component';
import { PromotionsparticipantsranksComponent } from './skins/promotions/participantsRanks/promotionsparticipantsranks/promotionsparticipantsranks.component';
import { SimulatorstrategieslistComponent } from './skins/gameactivitysimulator/simulatorstrategieslist/simulatorstrategieslist.component';
import { BotslistComponent } from './skins/gameactivitysimulator/botslist/botslist.component';
import { PlayerlistComponent } from './skins/playercontrol/playerlist/playerlist.component';
import { LockedbonusesComponent } from './skins/playercontrol/lockedbonuses/lockedbonuses.component';
import { VisitStatisticsComponent } from './skins/playercontrol/visit-statistics/visit-statistics.component';
import { SuspiciousPlayersComponent } from './skins/playercontrol/SuspiciousPlayers/SuspiciousPlayers.component';
import { BlacklistComponent } from './skins/playercontrol/blacklist/blacklist.component';
import { FraudplayersComponent } from './skins/playercontrol/fraudplayers/fraudplayers.component';
import { PlayerAccessRulesComponent } from './skins/playercontrol/player-access-rules/player-access-rules.component';
import { PlayerregistrationsettingsComponent } from './skins/playercontrol/playerregistrationsettings/playerregistrationsettings.component';
import { WinnerslistComponent } from './skins/playercontrol/winnerslist/winnerslist.component';
import { LoserlistComponent } from './skins/playercontrol/loserlist/loserlist.component';
import { DisconnectionProtectionSettingsComponent } from './skins/playercontrol/disconnection-protection-settings/disconnection-protection-settings.component';
import { PlayerPermissionGroupsComponent } from './skins/playercontrol/player-permission-groups/player-permission-groups.component';
import { PlayeravatarsComponent } from './skins/playercontrol/playeravatars/playeravatars.component';
import { OnlineplayersComponent } from './skins/playercontrol/onlineplayers/onlineplayers.component';
import { PokertournamentsComponent } from './skins/pokergames/settings/pokertournaments/pokertournaments.component';
import { PokersatelliteseriesComponent } from './skins/pokergames/settings/pokersatelliteseries/pokersatelliteseries.component';
import { TournamentticketsComponent } from './skins/pokergames/settings/tournamenttickets/tournamenttickets.component';
import { PokertableshistoryComponent } from './skins/pokergames/pokertablehistory/pokertableshistory/pokertableshistory.component';
import { PokertournamenthistoryComponent } from './skins/pokergames/pokertournamenthistory/pokertournamenthistory.component';
import { RemoteSystemComponent } from './skins/remote systems/remotesystems/remotesystems.component';
import { RemotesystemsgamesComponent } from './skins/remote systems/remotesystemsgames/remotesystemsgames.component';
import { RemotegamesessionsComponent } from './skins/remote systems/remotegamesessions/remotegamesessions.component';
import { TransfersummaryComponent } from './skins/remote systems/transfersummary/transfersummary.component';
import { TransferhistoryComponent } from './skins/remote systems/transferhistory/transferhistory.component';
import { JackpotslistComponent } from './skins/jackpots/jackpotslist/jackpotslist.component';
import { JackpotwinningsandadjustmentsComponent } from './skins/jackpots/jackpotwinningsandadjustments/jackpotwinningsandadjustments.component';
import { ComppointssummaryComponent } from './skins/comp points/comppointssummary/comppointssummary.component';
import { PlayercomppointsbalanceComponent } from './skins/comp points/playercomppointsbalance/playercomppointsbalance.component';
import { PlayercomppointsadjustmentsComponent } from './skins/comp points/playercomppointsadjustments/playercomppointsadjustments.component';
import { PlayercomppointsexchangeComponent } from './skins/comp points/playercomppointsexchange/playercomppointsexchange.component';
import { LevelchangeshistoryComponent } from './skins/comp points/levelchangeshistory/levelchangeshistory.component';
import { ComppointssettingsComponent } from './skins/comp points/settings/comppointssettings/comppointssettings.component';
import { EarnsettingsComponent } from './skins/comp points/settings/earnsettings/earnsettings.component';
import { ExchangeratesComponent } from './skins/comp points/settings/exchangerates/exchangerates.component';
import { ComppointslevelsComponent } from './skins/comp points/settings/comppointslevels/comppointslevels.component';
import { AccountingsummaryComponent } from './skins/accounting/accountingsummary/accountingsummary.component';
import { HousebalanceComponent } from './skins/accounting/housebalance/housebalance.component';
import { AcplayerbalanceComponent } from './skins/accounting/acplayerbalance/acplayerbalance.component';
import { AccasinogamesbalanceComponent } from './skins/accounting/accasinogamesbalance/accasinogamesbalance.component';
import { AcclubgamesbalanceComponent } from './skins/accounting/acclubgamesbalance/acclubgamesbalance.component';
import { AcaffiliatebalanceComponent } from './skins/accounting/acaffiliatebalance/acaffiliatebalance.component';
import { AcaffiliateexpensesComponent } from './skins/accounting/acaffiliateexpenses/acaffiliateexpenses.component';
import { AcagentsbalanceComponent } from './skins/accounting/acagentsbalance/acagentsbalance.component';
import { AcagentsnestedbalanceComponent } from './skins/accounting/acagentsnestedbalance/acagentsnestedbalance.component';
import { AcagentexpensesComponent } from './skins/accounting/acagentexpenses/acagentexpenses.component';
import { SimulatorstrategiesexpensesComponent } from './skins/accounting/simulatorstrategiesexpenses/simulatorstrategiesexpenses.component';
// import { MerchantsettingsComponent } from './skins/cashier/settings/merchantsettings/merchantsettings.component';
// import { MerchantsettingsComponent} from './skins/cashier/settings/'
import { CashfraudcontrolComponent } from './skins/cashfraudcontrol/cashfraudcontrol.component';
import { FraudcontrolComponent } from './skins/cashier/settings/fraudcontrol/fraudcontrol.component';
// import { MerchantlistComponent } from './skins//cashier/settings/merchantlist/merchantlist.component';
import { MerchantsettingsComponent } from './skins/cashier/settings/merchantsettings/merchantsettings.component';
import { CurrencieslistComponent } from './skins/cashier/settings/currencieslist/currencieslist.component';
import { CurrencyexchangeratesComponent } from './skins/cashier/settings/currencyexchangerates/currencyexchangerates.component';
// import { WalletexchangesettingsComponent } from './skins/cashier/settings/walletexchangesettings/walletexchangesettings.component';
import { WalletexchangessettingsComponent } from './skins/cashier/settings/walletexchangessettings/walletexchangessettings.component';
import { DepositlimitssettingsComponent } from './skins/cashier/settings/depositlimitssettings/depositlimitssettings.component';
import { CashoutComponent } from './skins/cashier/cashout/cashout.component';
import { CashdepositsComponent } from './skins/cashier/cashdeposits/cashdeposits.component';
import { WithdrawalsComponent } from './skins/cashier/withdrawals/withdrawals.component';
import { ChargebacksComponent } from './skins/cashier/chargebacks/chargebacks.component';
import { PlayercashadjustmentsComponent } from './skins/cashier/playercashadjustments/playercashadjustments.component';
import { PlayerbonusadjustmentsComponent } from './skins/cashier/playerbonusadjustments/playerbonusadjustments.component';
import { TmadjustmentsComponent } from './skins/cashier/tmadjustments/tmadjustments.component';
import { TransfertoplayersComponent } from './skins/cashier/transfertoplayers/transfertoplayers.component';
import { TransfertoagentsComponent } from './skins/cashier/transfertoagents/transfertoagents.component';
import { AgentrevenuepaymentsComponent } from './skins/cashier/agentrevenuepayments/agentrevenuepayments.component';
import { AgentrevenueadjustmentsComponent } from './skins/cashier/agentrevenueadjustments/agentrevenueadjustments.component';
import { AffiliatepaymentsComponent } from './skins/cashier/affiliatepayments/affiliatepayments.component';
import { AffiliaterevenueadjustmentsComponent } from './skins/cashier/affiliaterevenueadjustments/affiliaterevenueadjustments.component';
import { SimulatorstrategyadjustmetsComponent } from './skins/cashier/simulatorstrategyadjustmets/simulatorstrategyadjustmets.component';
import { PromotinolcodeusagesComponent } from './skins/cashier/promotinolcodeusages/promotinolcodeusages.component';
import { TransactionsComponent } from './skins/cashier/transactions/transactions.component';
import { FraudtransactionsComponent } from './skins/cashier/fraudtransactions/fraudtransactions.component';
import { GamebankadjustmentsComponent } from './skins/cashier/gamebankadjustments/gamebankadjustments.component';
import { CashoutstothebankComponent } from './skins/cashier/cashoutstothebank/cashoutstothebank.component';
import { CurrencyexchangesComponent } from './skins/cashier/currencyexchanges/currencyexchanges.component';
import { PromotiomprizepaymentsComponent } from './skins/cashier/promotiomprizepayments/promotiomprizepayments.component';
import { AgentcashadjustmentsComponent } from './skins/cashier/agentcashadjustments/agentcashadjustments.component';
import { AgentlistComponent } from './skins/agentcontrol/agentlist/agentlist.component';
import { AgentstatisticsComponent } from './skins/agentcontrol/agentstatistics/agentstatistics.component';
import { AgentaccessrulesComponent } from './skins/agentcontrol/agentaccessrules/agentaccessrules.component';
import { AgentregistrationsettingsComponent } from './skins/agentcontrol/agentregistrationsettings/agentregistrationsettings.component';
import { AgentpermissiongroupsComponent } from './skins/agentcontrol/agentpermissiongroups/agentpermissiongroups.component';
import { AffiliateslistComponent } from './skins/affiliatcontrol/affiliateslist/affiliateslist.component';
import { DefaultpercentsComponent } from './skins/affiliatcontrol/defaultpercents/defaultpercents.component';
import { AffiliateaccessrulesComponent } from './skins/affiliatcontrol/affiliateaccessrules/affiliateaccessrules.component';
import { AffiliatesregistationsettingsComponent } from './skins/affiliatcontrol/affiliatesregistationsettings/affiliatesregistationsettings.component';
import { AffiliatestatisticsComponent } from './skins/affiliatcontrol/affiliatestatistics/affiliatestatistics.component';
import { PlayermailinglistComponent } from './skins/tools/emaling/playermailinglist/playermailinglist.component';
import { MassbonuslistComponent } from './skins/tools/emaling/massbonuslist/massbonuslist.component';
import { MessagetemplatesComponent } from './skins/tools/emaling/messagetemplates/messagetemplates.component';
import { ToolsettingsComponent } from './skins/tools/emaling/toolsettings/toolsettings.component';
import { AffiliatemailinglistComponent } from './skins/tools/emaling/affiliatemailinglist/affiliatemailinglist.component';
import { FaqComponent } from './skins/tools/faq/faq.component';
import { NewsComponent } from './skins/tools/news/news.component';
import { ActivetasksComponent } from './skins/tools/activetasks/activetasks.component';
import { RequestedreportslistComponent } from './skins/requested reports/requestedreportslist/requestedreportslist.component';
import { PokertablegroupsComponent } from './skins/pokergames/settings/pokertablegroups/pokertablegroups.component';
import { AgentexplorerComponent } from './skins/agentcontrol/agentexplorer/agentexplorer.component';
import { PokergamesessionsComponent } from './skins/pokergames/pokergamesessions/pokergamesessions/pokergamesessions.component';
import { CommonDataService } from './source/commondata.service';
import { PokertablespokerhandshistoryComponent } from './skins/pokergames/pokertablehistory/pokertablespokerhandshistory/pokertablespokerhandshistory.component';
import { CreateNewAdministratorComponent } from './skins/admin-control/create-new-administrator/create-new-administrator.component';
import { CreatePokerTableGroupComponent } from './skins/admin-control/create-poker-table-group/create-poker-table-group.component';
import { CreatePokerTouranamentComponent } from './skins/admin-control/create-poker-touranament/create-poker-touranament.component';
import { CreatePokerSitnGoComponent } from './skins/admin-control/create-poker-sitn-go/create-poker-sitn-go.component';
import { NewPlayerPremissionsGroupComponent } from './skins/admin-control/new-player-premissions-group/new-player-premissions-group.component';
import { CreatePokerBlindStructureComponent } from './skins/admin-control/create-poker-blind-structure/create-poker-blind-structure.component';
import { CreatePokerPayoutTableComponent } from './skins/admin-control/create-poker-payout-table/create-poker-payout-table.component';
import { CreatePokerRakeStructureComponent } from './skins/admin-control/create-poker-rake-structure/create-poker-rake-structure.component';
import { CreateAccessRuleComponent } from './skins/admin-control/create-access-rule/create-access-rule.component';
import { PokerSitNgoHistoryComponent } from './skins/pokergames/poker-sit-ngo-history/poker-sit-ngo-history.component';
import { SkinsComponent } from './skins/repots/skins/skins.component';
import { SummaryReportComponent } from './skins/repots/summary-report/summary-report.component';
import { RakeRaceReportComponent } from './skins/repots/rake-race-report/rake-race-report.component';
import { TournamentsMonitoringComponent } from './skins/pokergames/tournaments-monitoring/tournaments-monitoring.component';
import { LeaderboardComponent } from './skins/repots/leaderboard/leaderboard.component';
import { PlayerActivityComponent } from './skins/repots/player-activity/player-activity.component';
import { SkinsReportBySessionsComponent } from './skins/repots/skins-report-by-sessions/skins-report-by-sessions.component';
import { CreateNewplayerComponent } from './skins/admin-control/create-newplayer/create-newplayer.component';
import { HomeDashBoardComponent } from './skins/home-dash-board/home-dash-board.component';
import { CountriesComponent } from './skins/countries/countries.component';
import { SkinsManageComponent } from './skins/repots/skins-manage/skins-manage.component';
import { ImportUsersComponent } from './skins/import-users/import-users.component';
import { TournamentListComponent } from './skins/pokergames/tournament-list/tournament-list.component';
import { ParticipationComponent } from './skins/pokergames/participation/participation.component';
import { ActiveTablesComponent } from './skins/pokergames/active-tables/active-tables.component';
import { JackpotAwardsComponent } from './skins/jackpots/jackpot-awards/jackpot-awards.component';
import { JackpotFeeComponent } from './skins/jackpots/jackpot-fee/jackpot-fee.component';
import { JackpotInitialAmountComponent } from './skins/jackpots/jackpot-initial-amount/jackpot-initial-amount.component';
import { SngMonitoringComponent } from './skins/pokergames/sng-monitoring/sng-monitoring.component';
import { PlayerExplorerComponent } from './skins/Explorer/player-explorer/player-explorer.component';
import { PeriodicalpromotionsListComponent } from './skins/promotions/periodicalpromotions-list/periodicalpromotions-list.component';
import { CreateNewAgentComponent } from './skins/admin-control/create-new-agent/create-new-agent.component';
import { PlayerPersonalInformationComponent } from './skins/Explorer/player-personal-information/player-personal-information.component';
import { PlayersSummaryComponent } from './skins/Explorer/players-summary/players-summary.component';
import { BonusAdjustmentComponent } from './skins/Explorer/bonus-adjustment/bonus-adjustment.component';
import { PlayerCashAdjustmentComponent } from './skins/Explorer/player-cash-adjustment/player-cash-adjustment.component';
import { PlayerManualDepositComponent } from './skins/Explorer/player-manual-deposit/player-manual-deposit.component';
import { AgentManualDepositComponent } from './skins/agentcontrol/agentexplorer/agent-manual-deposit/agent-manual-deposit.component';
import { AgentCashAdjustmentComponent } from './skins/agentcontrol/agentexplorer/agent-cash-adjustment/agent-cash-adjustment.component';
import { AgentSummaryComponent } from './skins/agentcontrol/agentexplorer/agent-summary/agent-summary.component';
import { RefferedPlayersComponent } from './skins/agentcontrol/agentexplorer/reffered-players/reffered-players.component';
import { RefferedAgentsComponent } from './skins/agentcontrol/agentexplorer/reffered-agents/reffered-agents.component';
import { AgentPersonalInfoComponent } from './skins/agentcontrol/agentexplorer/agent-personal-info/agent-personal-info.component';
import { AgentCashWalletsComponent } from './skins/agentcontrol/agentexplorer/agent-cash-wallets/agent-cash-wallets.component';
import { RevenueSettingsComponent } from './skins/agentcontrol/agentexplorer/revenue-settings/revenue-settings.component';
import { AgentNestedBalanceComponent } from './skins/agentcontrol/agentexplorer/agent-nested-balance/agent-nested-balance.component';
import { AgentBalanceComponent } from './skins/agentcontrol/agentexplorer/agent-balance/agent-balance.component';
import { RevenueSummaryComponent } from './skins/agentcontrol/agentexplorer/revenue-summary/revenue-summary.component';
import { AgentPlayerCahrgebacksComponent } from './skins/agentcontrol/agentexplorer/agent-player-cahrgebacks/agent-player-cahrgebacks.component';
import { AgentIpHistoryComponent } from './skins/agentcontrol/agentexplorer/agent-ip-history/agent-ip-history.component';
import { AgentTransferstoPlayersComponent } from './skins/agentcontrol/agentexplorer/agent-transfersto-players/agent-transfersto-players.component';
import { AgentTransferstoAgentsComponent } from './skins/agentcontrol/agentexplorer/agent-transfersto-agents/agent-transfersto-agents.component';
import { RevenueAdjustmentsComponent } from './skins/agentcontrol/agentexplorer/revenue-adjustments/revenue-adjustments.component';
import { RevenuePaymentsComponent } from './skins/agentcontrol/agentexplorer/revenue-payments/revenue-payments.component';
import { CashAdjustmentsComponent } from './skins/agentcontrol/agentexplorer/PaymentHistory/cash-adjustments/cash-adjustments.component';
import { AgentActionsComponent } from './skins/agentcontrol/agentexplorer/agent-actions/agent-actions.component';
import { AddAgentPermissionGroupComponent } from './skins/agentcontrol/add-agent-permission-group/add-agent-permission-group.component';
import { DetailedtransactionComponent } from './skins/agentcontrol/agentexplorer/detailedtransaction/detailedtransaction.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { DateTimePipe } from './pipe/date-time.pipe';
import { CreateAccessRuleTreeComponent } from './skins/admin-control/create-access-rule-tree/create-access-rule-tree.component';

import { NotFoundpageComponent } from './skins/not-foundpage/not-foundpage.component';
import { CompulsoryCahoutComponent } from './skins/agentcontrol/agentexplorer/compulsory-cahout/compulsory-cahout.component';
import { CreatePokerSatelliteSeriesComponent } from './skins/admin-control/create-poker-satellite-series/create-poker-satellite-series.component';
// import { DateTimePipe } from './pipe/date-time.pipe';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AddpromotionalcodeComponent } from './skins/agentcontrol/agentexplorer/addpromotionalcode/addpromotionalcode.component';
import { PlayerCashWalletsComponent } from './skins/Explorer/player-cash-wallets/player-cash-wallets.component';
import { PlayerHouseRevenueComponent } from './skins/Explorer/player-house-revenue/player-house-revenue.component';
import { PlayerPendingCashoutComponent } from './skins/Explorer/player-pending-cashout/player-pending-cashout.component';
import { NumberFormatPipe } from './pipe/number-format.pipe';
import { CreatePokerSatelliteTreeComponent } from './skins/admin-control/create-poker-satellite-tree/create-poker-satellite-tree.component';
import { PokerGamesessionHandsHistoryComponent } from './skins/pokergames/pokergamesessions/poker-gamesession-hands-history/poker-gamesession-hands-history.component';
import { TourneyExplorerComponent } from './skins/tournamentExplorer/tourneyExplorer/tourneyExplorer.component';
import { PlayersComponent } from './skins/tournamentExplorer/players/players.component';
import { TournamentTablesComponent } from './skins/tournamentExplorer/tournamentTables/tournamentTables.component';
import { TableInfoComponent } from './skins/tournamentExplorer/tableInfo/tableInfo.component';
import { ReGameSessionComponent } from './skins/Explorer/re-game-session/re-game-session.component';
import { RegisterPlayerComponent } from './skins/pokergames/settings/registerPlayer/registerPlayer.component';
import { AddTicketToPlayerComponent } from './skins/Explorer/add-ticket-to-player/add-ticket-to-player.component';
import { AgentcashComponent } from './skins/agentcontrol/agentexplorer/Agentcash/Agentcash.component';
import { AgentwithdrawlComponent } from './skins/agentcontrol/agentexplorer/Agentwithdrawl/Agentwithdrawl.component';
import { AgentchargebacksComponent } from './skins/agentcontrol/agentexplorer/Agentchargebacks/Agentchargebacks.component';


import { MaxLengthValidationDirective } from './pipe/max-length-validation.directive';
import { MaximimNumbersLengthValidationDirective } from './pipe/maximim-numbers-length-validation.directive';
import { P2pTransferLimitsComponent } from './skins/cashier/settings/p2p-transfer-limits/p2p-transfer-limits.component';
import { EmailSettingsComponent } from './skins/Explorer/additional/email-settings/email-settings.component';
import { CommentsComponent } from './skins/Explorer/additional/comments/comments.component';
import { P2pReferringSettingsComponent } from './skins/cashier/settings/p2p-referring-settings/p2p-referring-settings.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './store/reducers/login.reducer';
import { EffectsModule } from '@ngrx/effects';
import { LoginEffects } from './store/effects/effects';
import { ErrorPopupComponent } from './Error/error-popup/error-popup.component';
import { ErrorInterceptor } from './Error/interceptors/error.interceptor';
import { PlayerlinksComponent } from './skins/Explorer/playerlinks/playerlinks.component';
import { PlayerIphistoryComponent } from './skins/Explorer/player-iphistory/player-iphistory.component';
import { AdminPermissionsTreeComponentComponent } from './skins/admin-control/admin-permissions-tree-component/admin-permissions-tree-component.component';
import { AdminPermissionsComponent } from './skins/admin-control/admin-permissions/admin-permissions.component';
import { SetRevenueAdjustmentComponent } from './skins/agentcontrol/agentexplorer/set-revenue-adjustment/set-revenue-adjustment.component';
import { ReferPlayerAgentComponent } from './skins/agentcontrol/agentexplorer/refer-player-agent/refer-player-agent.component'; 
import { P2pTransfersComponent } from './skins/cashier/settings/p2p-transfers/p2p-transfers.component';
import { ChangePermissionGroupComponent } from './skins/Explorer/change-permission-group/change-permission-group.component';
import { ReportActivityComponent } from './skins/Explorer/report-activity/report-activity.component';
import { RakeRangesComponent } from './skins/pokergames/settings/RakeRanges/RakeRanges.component';
import { SidemenuDynamicComponent } from './skins/SidemenuDynamic/SidemenuDynamic.component';
import { TreeSidemenuComponent } from './skins/treeSidemenu/treeSidemenu.component';
import { CreateperiodicalpromotionComponent } from './skins/admin-control/createperiodicalpromotion/createperiodicalpromotion.component';

import { AttachDocumentsComponent } from './skins/Explorer/attach-documents/attach-documents.component'; 
import { AddCommentComponent } from './skins/Explorer/add-comment/add-comment.component';
import { PlayerRestrictAndFraudComponent } from './skins/playercontrol/player-restrict-and-fraud/player-restrict-and-fraud.component';
import { AddBlackListRecordComponent } from './skins/admin-control/add-black-list-record/add-black-list-record.component';
import { GeoIPListComponent } from './skins/admin-control/geo-ip-list/geo-ip-list.component';
import { CheckUserAccessComponent } from './skins/admin-control/check-user-access/check-user-access.component';
import { CreateSimulatorStrategyComponent } from './skins/admin-control/create-simulator-strategy/create-simulator-strategy.component';
import { ImportBotsComponent } from './skins/admin-control/import-bots/import-bots.component';
import { AddEmailTemplateComponent } from './skins/admin-control/add-email-template/add-email-template.component';
import { RequestReportComponent } from './skins/admin-control/request-report/request-report.component';
import { CreateNewAffiliateComponent } from './skins/affiliatcontrol/create-new-affiliate/create-new-affiliate.component';
import { AddFAQCategoryComponent } from './skins/admin-control/add-faq-category/add-faq-category.component';
import { BroadcastMessageComponent } from './skins/broadcast-message/broadcast-message.component';
import { AddNewsRecordComponent } from './skins/admin-control/add-news-record/add-news-record.component';
import { NgxEditorModule } from 'ngx-editor';
import { CompPointsCountersComponent } from './skins/comp points/comp-points-counters/comp-points-counters.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ServerDetailsComponent,
    AdminControlComponent,
    PlayerlistComponent,
    SidemenuComponent,
    OnlineplayersComponent,
    SuspiciousPlayersComponent,
    MinutesPipePipe,
    CasinogamesessoinsComponent,
    GameroundlistComponent,
    GameslistComponent,
    FreemoneygamesComponent,
    ExitpermissionComponent,
    PokerrakestructureComponent,
    PokersitandgosComponent,
    PokerblindstructuresComponent,
    PokerpayouttablesComponent,
    TimeoutsettingsComponent,
    PeriodicalpromotionsettingsComponent,
    // MerchantsettingsComponent,
    PromotinalcodesComponent,
    DepositbonussettingsComponent,
    BonusabuseComponent,
    PromotionsparticipantsranksComponent,
    SimulatorstrategieslistComponent,
    BotslistComponent,
    PlayerlistComponent,
    LockedbonusesComponent,
    VisitStatisticsComponent,
    BlacklistComponent,
    FraudplayersComponent,
    PlayerAccessRulesComponent,
    PlayerregistrationsettingsComponent,
    WinnerslistComponent,
    LoserlistComponent,
    DisconnectionProtectionSettingsComponent,
    PlayerPermissionGroupsComponent,
    PlayeravatarsComponent,
    PokertournamentsComponent,
    PokersatelliteseriesComponent,
    TournamentticketsComponent,
    PokertableshistoryComponent,
    PokertournamenthistoryComponent,
    RemoteSystemComponent,
    RemotesystemsgamesComponent,
    RemotegamesessionsComponent,
    TransfersummaryComponent,
    TransferhistoryComponent,
    JackpotslistComponent,
    JackpotwinningsandadjustmentsComponent,
    ComppointssummaryComponent,
    PlayercomppointsbalanceComponent,
    PlayercomppointsadjustmentsComponent,
    PlayercomppointsexchangeComponent,
    LevelchangeshistoryComponent,
    ComppointssettingsComponent,
    EarnsettingsComponent,
    ExchangeratesComponent,
    ComppointslevelsComponent,
    AccountingsummaryComponent,
    HousebalanceComponent,
    AcplayerbalanceComponent,
    AccasinogamesbalanceComponent,
    AcclubgamesbalanceComponent,
    AcaffiliatebalanceComponent,
    AcaffiliateexpensesComponent,
    AcagentsbalanceComponent,
    AcagentsnestedbalanceComponent,
    AcagentexpensesComponent,
    SimulatorstrategiesexpensesComponent,
    CashfraudcontrolComponent,
    // MerchantlistComponent,
    CurrencieslistComponent,
    FraudcontrolComponent,
    MerchantsettingsComponent,
    CurrencyexchangeratesComponent,
    WalletexchangessettingsComponent,
    DepositlimitssettingsComponent,
    CashoutComponent,
    CashdepositsComponent,
    WithdrawalsComponent,
    ChargebacksComponent,
    PlayercashadjustmentsComponent,
    PlayerbonusadjustmentsComponent,
    TmadjustmentsComponent,
    TransfertoplayersComponent,
    TransfertoagentsComponent,
    AgentrevenuepaymentsComponent,
    AgentrevenueadjustmentsComponent,
    AffiliatepaymentsComponent,
    AffiliaterevenueadjustmentsComponent,
    SimulatorstrategyadjustmetsComponent,
    PromotinolcodeusagesComponent,
    TransactionsComponent,
    FraudtransactionsComponent,
    GamebankadjustmentsComponent,
    CashoutstothebankComponent,
    CurrencyexchangesComponent,
    PromotiomprizepaymentsComponent,
    AgentcashadjustmentsComponent,
    AgentlistComponent,
    AgentstatisticsComponent,
    AgentaccessrulesComponent,
    AgentregistrationsettingsComponent,
    AgentpermissiongroupsComponent,
    AffiliateslistComponent,
    DefaultpercentsComponent,
    AffiliateaccessrulesComponent,
    AffiliatesregistationsettingsComponent,
    AffiliatestatisticsComponent,
    PlayermailinglistComponent,
    MassbonuslistComponent,
    MessagetemplatesComponent,
    ToolsettingsComponent,
    AffiliatemailinglistComponent,
    FaqComponent,
    NewsComponent,
    ActivetasksComponent,
    RequestedreportslistComponent,
    PokertablegroupsComponent,
    AgentexplorerComponent,
    PokergamesessionsComponent,
    PokertablespokerhandshistoryComponent,
    CreateNewAdministratorComponent,
    CreatePokerTableGroupComponent,
    CreatePokerTouranamentComponent,
    CreatePokerSitnGoComponent,
    NewPlayerPremissionsGroupComponent,
    CreatePokerBlindStructureComponent,
    CreatePokerPayoutTableComponent,
    CreatePokerRakeStructureComponent,
    CreateAccessRuleComponent,
    PokerSitNgoHistoryComponent,
    SkinsComponent,
    SummaryReportComponent,
    RakeRaceReportComponent,
    TournamentsMonitoringComponent,
    LeaderboardComponent,
    PlayerActivityComponent,
    SkinsReportBySessionsComponent,
    CreateNewplayerComponent,
    HomeDashBoardComponent,
    CountriesComponent,
    SkinsManageComponent,
    ImportUsersComponent,
    TournamentListComponent,
    ParticipationComponent,
    ActiveTablesComponent,
    JackpotAwardsComponent,
    JackpotFeeComponent,
    JackpotInitialAmountComponent,
    SngMonitoringComponent,
    PlayerExplorerComponent,
    PeriodicalpromotionsListComponent,
    CreateNewAgentComponent,
    PlayerPersonalInformationComponent,
    PlayersSummaryComponent,
    BonusAdjustmentComponent,
    PlayerCashAdjustmentComponent,
    PlayerManualDepositComponent,
    AgentManualDepositComponent,
    AgentCashAdjustmentComponent,
    AgentSummaryComponent,
    RefferedPlayersComponent,
    RefferedAgentsComponent,
    AgentPersonalInfoComponent,
    AgentCashWalletsComponent,
    RevenueSettingsComponent,
    AgentNestedBalanceComponent,
    AgentBalanceComponent,
    RevenueSummaryComponent,
    AgentPlayerCahrgebacksComponent,
    AgentIpHistoryComponent,
    AgentTransferstoPlayersComponent,
    AgentTransferstoAgentsComponent,
    RevenueAdjustmentsComponent,
    RevenuePaymentsComponent,
    CashAdjustmentsComponent,
    AgentActionsComponent,
    AddAgentPermissionGroupComponent,
    CreateAccessRuleTreeComponent,
    DetailedtransactionComponent,
    CompulsoryCahoutComponent,
    CreatePokerSatelliteSeriesComponent,
    AddpromotionalcodeComponent,
     NotFoundpageComponent,
     PlayerCashWalletsComponent,
     PlayerHouseRevenueComponent,
     PlayerPendingCashoutComponent,
     NumberFormatPipe,
     CreatePokerSatelliteTreeComponent,
     PokerGamesessionHandsHistoryComponent,
     TourneyExplorerComponent,
     PlayersComponent,
     TournamentTablesComponent,
     TableInfoComponent,
     ReGameSessionComponent,
     RegisterPlayerComponent,
     AddTicketToPlayerComponent,
     AgentcashComponent,
     AgentwithdrawlComponent,
     AgentchargebacksComponent,
     
     MaxLengthValidationDirective,
     MaximimNumbersLengthValidationDirective,
     P2pTransferLimitsComponent,
     EmailSettingsComponent,
     CommentsComponent,
     P2pReferringSettingsComponent,
     ErrorPopupComponent,
     PlayerlinksComponent,
     PlayerIphistoryComponent,
     AdminPermissionsTreeComponentComponent,
     AdminPermissionsComponent,
     SetRevenueAdjustmentComponent,
     ReferPlayerAgentComponent,
     P2pTransfersComponent,
     ChangePermissionGroupComponent,
     ReportActivityComponent,
     RakeRangesComponent,
     SidemenuDynamicComponent,
     TreeSidemenuComponent,
     CreateperiodicalpromotionComponent,
     AttachDocumentsComponent,
     AddCommentComponent,
     PlayerRestrictAndFraudComponent,
     AddBlackListRecordComponent,
     GeoIPListComponent,
     CheckUserAccessComponent,
     CreateSimulatorStrategyComponent,
     ImportBotsComponent,
     AddEmailTemplateComponent,
     RequestReportComponent,
     CreateNewAffiliateComponent,
     AddFAQCategoryComponent,
     BroadcastMessageComponent,
     AddNewsRecordComponent,
     CompPointsCountersComponent,
    
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    // NgbModule

    // MatSliderModule
    // NgSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot({login:loginReducer}),
    EffectsModule.forRoot([LoginEffects]),
    NgxEditorModule,
  ],
  providers: [CommonDataService,DatePipe,DateTimePipe,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, NumberFormatPipe

  ],
  bootstrap: [AppComponent],
  schemas:[NO_ERRORS_SCHEMA]
})
export class AppModule { }
