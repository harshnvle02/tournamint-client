import { Button, Card, CardContent, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './TeamMatches.css'
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../baseUrl';
export default function Winner(props) {
  const { tournamentId } = props.winner;
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  useEffect(() => {
    const asyncFunction = async () => {
      const response = await axios.get(`${baseUrl}/api/tournaments/getTournamentByTournamentId/${tournamentId}`);
      setTournament(response.data);
    }
    asyncFunction();
  }, [tournamentId]);

  return (
    <div className='winnerContainer'>
      { tournament ? <Card key={tournamentId} sx={{marginX: 'auto', height: '350px', width: '50vw', boxShadow: 3, borderRadius: 2, p: 3, textAlign: 'center' }}>
        <CardContent>
          <Typography variant='h4' sx={{ color: 'green', marginBottom: '20px' }}>Tournament Winner: {props.winner.teamName}</Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tournament Name</TableCell>
                <TableCell>Hosted By</TableCell>
                <TableCell>Total Teams</TableCell>
                <TableCell>Winner Team Name</TableCell>
                <TableCell>Winner Capton Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
                <TableCell>{tournament.tournamentName}</TableCell>
                <TableCell>{tournament.hostedBy}</TableCell>
                <TableCell>{tournament.totalTeams}</TableCell>
                <TableCell>{tournament.winnerTeamName}</TableCell>
                <TableCell>{tournament.capton}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Button variant='contained'
            color='secondary'
            sx={{marginTop: '60px'}}
            onClick={() => {
              navigate(`/addtournament/performance?tournamentId=${tournamentId}`)
            }}
          >Tournament Statistics</Button>
        </CardContent>
      </Card> : <CircularProgress />}
    </div>
  )
}
