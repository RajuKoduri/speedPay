
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './skins/login/login.component';
import { DashboardComponent } from './skins/dashboard/dashboard.component';
import { ServerDetailsComponent } from './skins/serverDetails/server-details/server-details.component';
import { AdminControlComponent } from './skins/admin-control/adminstrator/admin-control.component';
import { CasinogamesessoinsComponent } from './skins/Casino Games/casinogamesessoins/casinogamesessoins.component';
import { GameroundlistComponent } from './skins/Casino Games/gameroundlist/gameroundlist.component';
import { FraudcontrolComponent } from './skins/cashier/settings/fraudcontrol/fraudcontrol.component';
import { GameslistComponent } from './skins/Casino Games/gameslist/gameslist.component';
import { FreemoneygamesComponent } from './skins/Casino Games/freemoneygames/freemoneygames.component';
import { PokerrakestructureComponent } from './skins/pokergames/settings/pokerrakestructure/pokerrakestructure.component';
import { PokersitandgosComponent } from './skins/pokergames/settings/pokersitandgos/pokersitandgos.component';
import { PokertournamentsComponent } from './skins/pokergames/settings/pokertournaments/pokertournaments.component';
import { PokerblindstructuresComponent } from './skins/pokergames/settings/pokerblindstructures/pokerblindstructures.component';
import { PokerpayouttablesComponent } from './skins/pokergames/settings/pokerpayouttables/pokerpayouttables.component';
import { PokersatelliteseriesComponent } from './skins/pokergames/settings/pokersatelliteseries/pokersatelliteseries.component';
import { TournamentticketsComponent } from './skins/pokergames/settings/tournamenttickets/tournamenttickets.component';
import { TimeoutsettingsComponent } from './skins/pokergames/settings/timeoutsettings/timeoutsettings.component';
import { PeriodicalpromotionsettingsComponent } from './skins/promotions/periodicalpromotionsettings/periodicalpromotionsettings.component';
import { PeriodicalpromotionsListComponent } from './skins/promotions/periodicalpromotions-list/periodicalpromotions-list.component';
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
import { PokertablespokerhandshistoryComponent } from './skins/pokergames/pokertablehistory/pokertablespokerhandshistory/pokertablespokerhandshistory.component';
import { PokergamesessionsComponent } from './skins/pokergames/pokergamesessions/pokergamesessions/pokergamesessions.component';

import { PokertableshistoryComponent } from './skins/pokergames/pokertablehistory/pokertableshistory/pokertableshistory.component';
import { PokerSitNgoHistoryComponent } from './skins/pokergames/poker-sit-ngo-history/poker-sit-ngo-history.component';
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
import { CashfraudcontrolComponent } from './skins/cashfraudcontrol/cashfraudcontrol.component';
// import { MerchantlistComponent } from './skins//cashier/settings/merchantlist/merchantlist.component';
// import { MerchantsettingsComponent } from './skins//cashier/settings/merchantlist/merchantlist.component';
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
import { AgentcashadjustmentsComponent } from './skins/cashier/agentcashadjustments/agentcashadjustments.component';
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
import { AgentlistComponent } from './skins/agentcontrol/agentlist/agentlist.component';
import { AgentstatisticsComponent } from './skins/agentcontrol/agentstatistics/agentstatistics.component';
import { AgentaccessrulesComponent } from './skins/agentcontrol/agentaccessrules/agentaccessrules.component';
import { AgentregistrationsettingsComponent } from './skins/agentcontrol/agentregistrationsettings/agentregistrationsettings.component';
import { AgentpermissiongroupsComponent } from './skins/agentcontrol/agentpermissiongroups/agentpermissiongroups.component';
import { AffiliateslistComponent } from './skins/affiliatcontrol/affiliateslist/affiliateslist.component';
import { DefaultpercentsComponent } from './skins/affiliatcontrol/defaultpercents/defaultpercents.component';
import { AffiliatestatisticsComponent } from './skins/affiliatcontrol/affiliatestatistics/affiliatestatistics.component';
import { AffiliateaccessrulesComponent } from './skins/affiliatcontrol/affiliateaccessrules/affiliateaccessrules.component';
import { AffiliatesregistationsettingsComponent } from './skins/affiliatcontrol/affiliatesregistationsettings/affiliatesregistationsettings.component';
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

import { CreateNewAdministratorComponent } from './skins/admin-control/create-new-administrator/create-new-administrator.component';
import { CreatePokerTableGroupComponent } from './skins/admin-control/create-poker-table-group/create-poker-table-group.component';
import { CreatePokerTouranamentComponent } from './skins/admin-control/create-poker-touranament/create-poker-touranament.component';
import { CreatePokerSitnGoComponent } from './skins/admin-control/create-poker-sitn-go/create-poker-sitn-go.component';
import { NewPlayerPremissionsGroupComponent } from './skins/admin-control/new-player-premissions-group/new-player-premissions-group.component';
import { CreatePokerBlindStructureComponent } from './skins/admin-control/create-poker-blind-structure/create-poker-blind-structure.component';
import { CreatePokerPayoutTableComponent } from './skins/admin-control/create-poker-payout-table/create-poker-payout-table.component';
import { CreatePokerRakeStructureComponent } from './skins/admin-control/create-poker-rake-structure/create-poker-rake-structure.component';
import { CreateAccessRuleComponent } from './skins/admin-control/create-access-rule/create-access-rule.component';
import { SkinsComponent } from './skins/repots/skins/skins.component';
import { SkinsReportBySessionsComponent } from './skins/repots/skins-report-by-sessions/skins-report-by-sessions.component';
import { SummaryReportComponent } from './skins/repots/summary-report/summary-report.component';
import { RakeRaceReportComponent } from './skins/repots/rake-race-report/rake-race-report.component';
import { LeaderboardComponent } from './skins/repots/leaderboard/leaderboard.component';
import { PlayerActivityComponent } from './skins/repots/player-activity/player-activity.component';
import { TournamentsMonitoringComponent } from './skins/pokergames/tournaments-monitoring/tournaments-monitoring.component';
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
import { CreateNewAgentComponent } from './skins/admin-control/create-new-agent/create-new-agent.component';

import { PlayerExplorerComponent } from './skins/Explorer/player-explorer/player-explorer.component';
import { PlayerPersonalInformationComponent } from './skins/Explorer/player-personal-information/player-personal-information.component';
import { PlayersSummaryComponent } from './skins/Explorer/players-summary/players-summary.component';
import { BonusAdjustmentComponent } from './skins/Explorer/bonus-adjustment/bonus-adjustment.component';
import { PlayerManualDepositComponent } from './skins/Explorer/player-manual-deposit/player-manual-deposit.component';
import { PlayerCashAdjustmentComponent } from './skins/Explorer/player-cash-adjustment/player-cash-adjustment.component';
import { AgentManualDepositComponent } from './skins/agentcontrol/agentexplorer/agent-manual-deposit/agent-manual-deposit.component';
import { AgentCashAdjustmentComponent } from './skins/agentcontrol/agentexplorer/agent-cash-adjustment/agent-cash-adjustment.component';
import { AgentSummaryComponent } from './skins/agentcontrol/agentexplorer/agent-summary/agent-summary.component';
import { RefferedPlayersComponent } from './skins/agentcontrol/agentexplorer/reffered-players/reffered-players.component';
import { RefferedAgentsComponent } from './skins/agentcontrol/agentexplorer/reffered-agents/reffered-agents.component';
import { AgentPersonalInfoComponent } from './skins/agentcontrol/agentexplorer/agent-personal-info/agent-personal-info.component';
import { AgentCashWalletsComponent } from './skins/agentcontrol/agentexplorer/agent-cash-wallets/agent-cash-wallets.component';
import { RevenueSettingsComponent } from './skins/agentcontrol/agentexplorer/revenue-settings/revenue-settings.component';
import { AgentBalanceComponent } from './skins/agentcontrol/agentexplorer/agent-balance/agent-balance.component';
import { AgentNestedBalanceComponent } from './skins/agentcontrol/agentexplorer/agent-nested-balance/agent-nested-balance.component';
import { RevenueSummaryComponent } from './skins/agentcontrol/agentexplorer/revenue-summary/revenue-summary.component';
import { AgentPlayerCahrgebacksComponent } from './skins/agentcontrol/agentexplorer/agent-player-cahrgebacks/agent-player-cahrgebacks.component';
import { AgentIpHistoryComponent } from './skins/agentcontrol/agentexplorer/agent-ip-history/agent-ip-history.component';
import { AgentTransferstoPlayersComponent } from './skins/agentcontrol/agentexplorer/agent-transfersto-players/agent-transfersto-players.component';
import { AgentTransferstoAgentsComponent } from './skins/agentcontrol/agentexplorer/agent-transfersto-agents/agent-transfersto-agents.component';
import { RevenueAdjustmentsComponent } from './skins/agentcontrol/agentexplorer/revenue-adjustments/revenue-adjustments.component';
import { RevenuePaymentsComponent } from './skins/agentcontrol/agentexplorer/revenue-payments/revenue-payments.component';
import { CashAdjustmentsComponent } from './skins/agentcontrol/agentexplorer/PaymentHistory/cash-adjustments/cash-adjustments.component';
import { AddAgentPermissionGroupComponent } from './skins/agentcontrol/add-agent-permission-group/add-agent-permission-group.component';
import { DetailedtransactionComponent } from './skins/agentcontrol/agentexplorer/detailedtransaction/detailedtransaction.component';
import { DepositsComponent } from './skins/agentcontrol/agentexplorer/deposits/deposits.component';
import { CreatePokerSatelliteSeriesComponent } from './skins/admin-control/create-poker-satellite-series/create-poker-satellite-series.component';
import { ReGameSessionComponent } from './skins/Explorer/re-game-session/re-game-session.component';
// import { PreLoginAuthGuardResolverService } from './pre-login-auth-guard-resolver.service';
// import { PreLoginAuthGuardResolverService } from './pre-login-auth-guard-resolver.service';
import { PostloginPostloginauthguardServiceService } from './postlogin-postloginauthguard-service.service';
import { NotFoundpageComponent } from './skins/not-foundpage/not-foundpage.component';
import { AddpromotionalcodeComponent } from './skins/agentcontrol/agentexplorer/addpromotionalcode/addpromotionalcode.component';
import { PlayerCashWalletsComponent } from './skins/Explorer/player-cash-wallets/player-cash-wallets.component';
import { PlayerHouseRevenueComponent } from './skins/Explorer/player-house-revenue/player-house-revenue.component';
import { PlayerPendingCashoutComponent } from './skins/Explorer/player-pending-cashout/player-pending-cashout.component';
import { PokerGamesessionHandsHistoryComponent } from './skins/pokergames/pokergamesessions/poker-gamesession-hands-history/poker-gamesession-hands-history.component';
import { TourneyExplorerComponent } from './skins/tournamentExplorer/tourneyExplorer/tourneyExplorer.component';
import { PlayersComponent } from './skins/tournamentExplorer/players/players.component';
import { TournamentTablesComponent } from './skins/tournamentExplorer/tournamentTables/tournamentTables.component';
import { TableInfoComponent } from './skins/tournamentExplorer/tableInfo/tableInfo.component';
import { AgentcashComponent } from './skins/agentcontrol/agentexplorer/Agentcash/Agentcash.component';
import { AgentwithdrawlComponent } from './skins/agentcontrol/agentexplorer/Agentwithdrawl/Agentwithdrawl.component';
import { AgentchargebacksComponent } from './skins/agentcontrol/agentexplorer/Agentchargebacks/Agentchargebacks.component';
import { P2pTransferLimitsComponent } from './skins/cashier/settings/p2p-transfer-limits/p2p-transfer-limits.component';
import { P2pReferringSettingsComponent } from './skins/cashier/settings/p2p-referring-settings/p2p-referring-settings.component';
import { EmailSettingsComponent } from './skins/Explorer/additional/email-settings/email-settings.component';
import { CommentsComponent } from './skins/Explorer/additional/comments/comments.component';
import { PlayerlinksComponent } from './skins/Explorer/playerlinks/playerlinks.component';
import { PlayerIphistoryComponent } from './skins/Explorer/player-iphistory/player-iphistory.component';
import { PreLoginAuthGuardResolverService } from './pre-login-auth-guard-resolver.service';
import { P2pTransfersComponent } from './skins/cashier/settings/p2p-transfers/p2p-transfers.component';
import { AttachDocumentsComponent } from './skins/Explorer/attach-documents/attach-documents.component';
import { AddCommentComponent } from './skins/Explorer/add-comment/add-comment.component';
import { CreateperiodicalpromotionComponent } from './skins/admin-control/createperiodicalpromotion/createperiodicalpromotion.component';
import { AddBlackListRecordComponent } from './skins/admin-control/add-black-list-record/add-black-list-record.component';
import { CreateNewAffiliateComponent } from './skins/affiliatcontrol/create-new-affiliate/create-new-affiliate.component';
import { BroadcastMessageComponent } from './skins/broadcast-message/broadcast-message.component';
import { CompPointsCountersComponent } from './skins/comp points/comp-points-counters/comp-points-counters.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate:[PreLoginAuthGuardResolverService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: '', component: DashboardComponent, canActivate: [PostloginPostloginauthguardServiceService],
    children: [
      // { path:'', redirectTo:'serverDetails', pathMatch:'full' , canActivate: [PostloginPostloginauthguardServiceService]},
      { path: 'broadcastMessage', component: BroadcastMessageComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'DashBoard', component: HomeDashBoardComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'serverDetails', component: ServerDetailsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertablegroups', component: PokertablegroupsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'requestedreportslist', component: RequestedreportslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playermailinglist', component: PlayermailinglistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliatemailinglist', component: AffiliatemailinglistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'massbonuslist', component: MassbonuslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'fraudcontrol', component: FraudcontrolComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'P2pTransferLimits', component: P2pTransferLimitsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'p2pReferringSettings', component: P2pReferringSettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'p2pTransfers', component: P2pTransfersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'messagetemplates', component: MessagetemplatesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'toolsettings', component: ToolsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'faq', component: FaqComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'news', component: NewsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'activetasks', component: ActivetasksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliateslist', component: AffiliateslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'defaultpercents', component: DefaultpercentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliatestatistics', component: AffiliatestatisticsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliateaccessrules', component: AffiliateaccessrulesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliatesregistationsettings', component: AffiliatesregistationsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'createNewAffiliate', component: CreateNewAffiliateComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentlist', component: AgentlistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentstatistics', component: AgentstatisticsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentaccessrules', component: AgentaccessrulesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentregistrationsettings', component: AgentregistrationsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentpermissiongroups', component: AgentpermissiongroupsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'accountingsummary', component: AccountingsummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashfraudcontrol', component: CashfraudcontrolComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path:'merchantlist', component:MerchantsettingsComponent , canActivate: [PostloginPostloginauthguardServiceService]},
      { path: 'merchantsettings', component: MerchantsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'currencieslist', component: CurrencieslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'currencyexchangerates', component: CurrencyexchangeratesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'walletexchangesettings', component: WalletexchangessettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'depositlimitssettings', component: DepositlimitssettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashout', component: CashoutComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashdeposits', component: CashdepositsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'withdrawals', component: WithdrawalsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'chargebacks', component: ChargebacksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercashadjustments', component: PlayercashadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerbonusadjustments', component: PlayerbonusadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'tmadjustments', component: TmadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transfertoplayers', component: TransfertoplayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transfertoagents', component: TransfertoagentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentcashadjustments', component: AgentcashadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentrevenuepayments', component: AgentrevenuepaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'agentrevenueadjustments', component: AgentrevenueadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliatepayments', component: AffiliatepaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'affiliaterevenueadjustments', component: AffiliaterevenueadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'simulatorstrategyadjustmets', component: SimulatorstrategyadjustmetsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotinolcodeusages', component: PromotinolcodeusagesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transactions', component: TransactionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'fraudtransactions', component: FraudtransactionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'gamebankadjustments', component: GamebankadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashoutstothebank', component: CashoutstothebankComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'currencyexchanges', component: CurrencyexchangesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotionprizepayments', component: PromotiomprizepaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'accountingsummary', component: AccountingsummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'housebalance', component: HousebalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acplayerbalance', component: AcplayerbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'accasinogamesbalance', component: AccasinogamesbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acclubgamesbalance', component: AcclubgamesbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acaffiliatebalance', component: AcaffiliatebalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acaffiliateexpenses', component: AcaffiliateexpensesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acagentsbalance', component: AcagentsbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acagentsnestedbalance', component: AcagentsnestedbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acagentexpenses', component: AcagentexpensesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'simulatorstrategiesexpenses', component: SimulatorstrategiesexpensesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'comppointssummary', component: ComppointssummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercomppointsbalance', component: PlayercomppointsbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercomppointsadjustments', component: PlayercomppointsadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercomppointsexchange', component: PlayercomppointsexchangeComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'levelchangeshistory', component: LevelchangeshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'comppointssettings', component: ComppointssettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'earnsettings', component: EarnsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'exchangerates', component: ExchangeratesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'comppointslevels', component: ComppointslevelsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'jackpotslist', component: JackpotslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'jackpotwinningsandadjustments', component: JackpotwinningsandadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'remotesystems', component: RemoteSystemComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'remotesystemsgames', component: RemotesystemsgamesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'remotegamesessions', component: RemotegamesessionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transfersummary', component: TransfersummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transferhistory', component: TransferhistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokergamesessions', component: PokergamesessionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PokergamesessionHandshistory', component: PokerGamesessionHandsHistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertableshistory', component: PokertableshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertablespokerhandshistory', component: PokertablespokerhandshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertournamenthistory', component: PokertournamenthistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokersitngoHistory', component: PokerSitNgoHistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'adminControl', component: AdminControlComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'playerlist', component: PlayerlistComponent , canActivate: [PostloginPostloginauthguardServiceService]},
      { path: 'onlineplayers', component: OnlineplayersComponent, canActivate: [PostloginPostloginauthguardServiceService], },
      { path: 'Casinogamesessoins', component: CasinogamesessoinsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Gameroundlist', component: GameroundlistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Gameslist', component: GameslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'freemoneygames', component: FreemoneygamesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokerrakestructure', component: PokerrakestructureComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokersitandgos', component: PokersitandgosComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertournaments', component: PokertournamentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokerblindstructures', component: PokerblindstructuresComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokerpayouttables', component: PokerpayouttablesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerSatelliteSeries', component: CreatePokerSatelliteSeriesComponent },
      { path: 'pokersatelliteseries', component: PokersatelliteseriesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'tournamenttickets', component: TournamentticketsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'timeoutsettings', component: TimeoutsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'periodicalpromotionsettings', component: PeriodicalpromotionsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotionsparticipantsranks', component: PromotionsparticipantsranksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'periodicalpromotionsList', component: PeriodicalpromotionsListComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotinalcodes', component: PromotinalcodesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'depositbonussettings', component: DepositbonussettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'bonusabuse', component: BonusabuseComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'simulatorstrategieslist', component: SimulatorstrategieslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'botslist', component: BotslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerslist', component: PlayerlistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'lockedbonuses', component: LockedbonusesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'visitstatistics', component: VisitStatisticsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'suspiciousplayers', component: SuspiciousPlayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'blacklist', component: BlacklistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'fraudplayers', component: FraudplayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playersaccessrules', component: PlayerAccessRulesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerregistrationsettings', component: PlayerregistrationsettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'winnerslist', component: WinnerslistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'loserlist', component: LoserlistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'disconnectionprotectionsettings', component: DisconnectionProtectionSettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerpermissiongroups', component: PlayerPermissionGroupsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playeravatars', component: PlayeravatarsComponent, canActivate: [PostloginPostloginauthguardServiceService] },

      { path: 'CreateNewAdministrator', component: CreateNewAdministratorComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerTableGroup', component: CreatePokerTableGroupComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerTournament', component: CreatePokerTouranamentComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerSitngo', component: CreatePokerSitnGoComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'NewPlayerPremissions', component: NewPlayerPremissionsGroupComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerBlindStructure', component: CreatePokerBlindStructureComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerPayoutTable', component: CreatePokerPayoutTableComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'createpokerpayouttable', component: CreatePokerPayoutTableComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreatePokerRakeStructure', component: CreatePokerRakeStructureComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreateAccessRule', component: CreateAccessRuleComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Skins', component: SkinsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'SkinsReportBySessions', component: SkinsReportBySessionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Summary', component: SummaryReportComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'RakeRace', component: RakeRaceReportComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Leaderboard', component: LeaderboardComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayerActivity', component: PlayerActivityComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'TournamentsMonitoring', component: TournamentsMonitoringComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreateNewplayer', component: CreateNewplayerComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CreateNewAgent', component: CreateNewAgentComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Countries', component: CountriesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'SkinsManage', component: SkinsManageComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'ImportUsers', component: ImportUsersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'TournamentList', component: TournamentListComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'Participation', component: ParticipationComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'ActiveTables', component: ActiveTablesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'JackpotAwards', component: JackpotAwardsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'JackpotFee', component: JackpotFeeComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'JackpotInitialAmount', component: JackpotInitialAmountComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'SngMonitoring', component: SngMonitoringComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'addAgentPemissiongroup', component: AddAgentPermissionGroupComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'addpromtionalcode', component: AddpromotionalcodeComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'addperiodicpromotion', component: CreateperiodicalpromotionComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'addBlackListRecord', component: AddBlackListRecordComponent, canActivate: [PostloginPostloginauthguardServiceService] },

    ]
  },

  {
    path: 'Agentexplorer', component: AgentexplorerComponent, canActivate: [PostloginPostloginauthguardServiceService],
    children: [
      // { path: 'Agentexplorer', component: AgentexplorerComponent , canActivate: [PostloginPostloginauthguardServiceService]},
      { path: 'AgentPersonalInfo', component: AgentPersonalInfoComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentSummary', component: AgentSummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentBalance', component: AgentBalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentNestedBalance', component: AgentNestedBalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'revenueSummary', component: RevenueSummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentCashWallets', component: AgentCashWalletsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentManualDeposit', component: AgentManualDepositComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentCashAdjustment', component: AgentCashAdjustmentComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'RefferedPlayers', component: RefferedPlayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'RefferedAgents', component: RefferedAgentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'RevenueSettings', component: RevenueSettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayersChargebacks', component: AgentPlayerCahrgebacksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'IpHistory', component: AgentIpHistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'AgentTransferstoPlayers', component: AgentTransferstoPlayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'AgentTransferstoAgents', component: AgentTransferstoAgentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'revenueAdjustments', component: RevenueAdjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'revenuePayments', component: RevenuePaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'CashAdjustments', component: CashAdjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'DetailTransaction', component: DetailedtransactionComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'Deposits', component: DepositsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'addpromtionalcode', component: AddpromotionalcodeComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'Cash', component: AgentcashComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'withdrawl', component: AgentwithdrawlComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'chargeback', component: AgentchargebacksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'withdrawals', component: WithdrawalsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'chargebacks', component: ChargebacksComponent, canActivate: [PostloginPostloginauthguardServiceService] },



      { path: 'cashdeposits', component: CashdepositsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashout', component: CashoutComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'CashAdjustments', component: PlayercashadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentTransferstoPlayers', component: TransfertoplayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AgentTransferstoAgents', component: TransfertoagentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'revenueAdjustments', component: AgentrevenueadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'revenuePayments', component: AgentrevenuepaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'currencyexchanges', component: CurrencyexchangesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotinalcodes', component: PromotinalcodesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotinolcodeusages', component: PromotinolcodeusagesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
    ]
  },
  {
    path: 'playerexplorer', component: PlayerExplorerComponent, canActivate: [PostloginPostloginauthguardServiceService],
    children: [
      { path: 'Personalinfo', component: PlayerPersonalInformationComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayersSummary', component: PlayersSummaryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayerBonusAdjustment', component: BonusAdjustmentComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayerCashAdjustment', component: PlayerCashAdjustmentComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayerManualDeposit', component: PlayerManualDepositComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'PlayerCashWallets', component: PlayerCashWalletsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerHouseRevenue', component: PlayerHouseRevenueComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'acplayerbalance', component: AcplayerbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'RefferedPlayers', component: RefferedPlayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerPendingCashouts', component: PlayerPendingCashoutComponent, canActivate: [PostloginPostloginauthguardServiceService] },


      // { path: 'gamesessions', component: ReGameSessionComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertableshistory', component: PokertableshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      // { path: 'pokertablespokerhandshistory', component: PokertablespokerhandshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertablespokerhandshistory', component: PokerGamesessionHandsHistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertournamenthistory', component: TournamentListComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokersitngoHistory', component: PokerSitNgoHistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'tournamenttickets', component: TournamentticketsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'remotegamesessions', component: RemotegamesessionsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerlinks', component: PlayerlinksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playeriphistory', component: PlayerIphistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'blacklist', component: BlacklistComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashout', component: CashoutComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'cashdeposits', component: CashdepositsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'withdrawals', component: WithdrawalsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'chargebacks', component: ChargebacksComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercashadjustments', component: PlayercashadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playerbonusadjustments', component: PlayerbonusadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotinolcodeusages', component: PromotinolcodeusagesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'transfersfromagent', component: TransfertoplayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'tmadjustments', component: TmadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'p2pTransfers', component: P2pTransfersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'currencyexchanges', component: CurrencyexchangesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'promotionprizepayments', component: PromotiomprizepaymentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      {path: 'attachdocuments', component:AttachDocumentsComponent, canActivate: [PostloginPostloginauthguardServiceService]},
      {path: 'addcomment',component:AddCommentComponent,canActivate:[PostloginPostloginauthguardServiceService]},
      { path: 'DetailTransaction', component: DetailedtransactionComponent, canActivate: [PostloginPostloginauthguardServiceService] },

      // { path: 'Personalinfo/:id', component: PlayerPersonalInformationComponent },

      { path: 'playercomppointsbalance', component: PlayercomppointsbalanceComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercomppointsadjustments', component: PlayercomppointsadjustmentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'playercomppointsexchange', component: PlayercomppointsexchangeComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'levelchangeshistory', component: LevelchangeshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'comppointsCounters', component: CompPointsCountersComponent, canActivate: [PostloginPostloginauthguardServiceService] },

      { path: 'depositlimitssettings', component: DepositlimitssettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'depositbonussettings', component: DepositbonussettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'P2pTransferLimits', component: P2pTransferLimitsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'p2pReferringSettings', component: P2pReferringSettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },

      { path: 'EmailSettings', component: EmailSettingsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'comments', component: CommentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'AttachedDocuments', component: AttachDocumentsComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      
    ]
  },
  {
    path: 'tournamentexplorer', component: TourneyExplorerComponent, canActivate: [PostloginPostloginauthguardServiceService],
    children: [
      { path: 'tableInfo', component: TableInfoComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'TPlayers', component: PlayersComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'TournamentTables', component: TournamentTablesComponent, canActivate: [PostloginPostloginauthguardServiceService] },
      { path: 'pokertablespokerhandshistory', component: PokertablespokerhandshistoryComponent, canActivate: [PostloginPostloginauthguardServiceService] },
    ]
  },

  { path: '**', component: NotFoundpageComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  // imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }