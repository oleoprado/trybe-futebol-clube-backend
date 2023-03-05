import IMatch from "../../api/interfaces/IMatch";
import Match from "../../database/models/Match";
import Team from "../../database/models/Team";

const matchesList: Match[] = [
  {
    "id": 1,
    "homeTeamId": 16,
    "homeTeamGoals": 1,
    "awayTeamId": 8,
    "awayTeamGoals": 1,
    "inProgress": false,
    "homeTeam": {
      "teamName": "São Paulo"
    },
    "awayTeam": {
      "teamName": "Grêmio"
    }
  },
] as unknown as Match[];

const matchesInProgressList: Match[] = [{
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
}] as Match[];

const match: Match = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 1,
  "awayTeamId": 8,
  "awayTeamGoals": 1,
  "inProgress": true,
  "homeTeam": {
    "teamName": "São Paulo"
  },
  "awayTeam": {
    "teamName": "Grêmio"
  }
} as unknown as Match;

const validLogin = { email: 'admin@admin.com', password: 'secret_admin' };
const validMatchId = 1;
const invalidMatchId = 999;
const team: Team = {id: 4, teamName: 'Corinthians'} as Team;
const finished = { message: 'Finished' };
const goalsUpdated = { message: 'Goals updated successfully' };
const matchNotFound = { message: 'Match not found' };
const teamsNotFound = { message: 'There is no team with such id!' };
const teamsNotPossibleCreate = { message: 'It is not possible to create a match with two equal teams' };
const tokenNotFound = { message: "Token not found" }

const validCreateMatch: IMatch = {
  "homeTeamId": 16,
  "awayTeamId": 8,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
};

const invalidCreateMatch: IMatch = {
  "homeTeamId": 999,
  "awayTeamId": 420,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

const outputCreateMatch: Match = {
  "id": 1,
  "homeTeamId": 16,
  "homeTeamGoals": 2,
  "awayTeamId": 8,
  "awayTeamGoals": 2,
  "inProgress": true,
} as Match;

const invalidEqualTeams: IMatch = {
  "homeTeamId": 1,
  "awayTeamId": 1,
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}

export {
  matchesList,
  validLogin,
  validMatchId,
  match,
  finished,
  goalsUpdated,
  invalidMatchId,
  matchNotFound,
  validCreateMatch,
  outputCreateMatch,
  invalidCreateMatch,
  teamsNotFound,
  invalidEqualTeams,
  team,
  teamsNotPossibleCreate,
  matchesInProgressList,
  tokenNotFound,
}