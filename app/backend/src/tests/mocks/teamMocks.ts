import Team from "../../database/models/Team";

const teamsList: Team[] = [{ id: 1, teamName: 'Avaí/Kindermann'}] as Team[];
const validTeamId = 4;
const team: Team = {id: 4, teamName: 'Corinthians'} as Team;


export {
  teamsList,
  validTeamId,
  team
}