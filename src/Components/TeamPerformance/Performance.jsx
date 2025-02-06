import { Card, CardContent, CardHeader, FormControl, Grid2, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './Performance.css'
import axios from 'axios'
import { AuthContext } from '../../Context/AuthConntext'
import { grey } from '@mui/material/colors'
import { baseUrl } from '../baseUrl'

const Performance = () => {
  const [searchParam] = useSearchParams();
  const tournamentId = searchParam.get('tournamentId');
  const { user } = useContext(AuthContext);

  const [tournamentList, setTournamentList] = useState([]);
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [tableValue, setTableValue] = useState(null);

  useEffect(() => {
    const asyncFunction = async () => {
      const res = await axios.get(`${baseUrl}/api/tournaments/getPerformanceData/${user.userId}`)
      setTournamentList(res.data);
      console.log(res.data)
    }
    asyncFunction();
  }, [])

  useEffect(() => {
    const options = tournamentList.map(item => ({ tournamentId: item.tournamentId, name: item.tournamentName }))
    setDropDownMenu(options);
  }, [tournamentList])

  useEffect(() => {
    if (dropDownMenu.length > 0 && tournamentId) {
      const name = tournamentList.find(item => item.tournamentId === +tournamentId)?.tournamentName;
      setSelectedOption(name);
    }
  }, [dropDownMenu])

  useEffect(() => {
    if (selectedOption) {
      const table = tournamentList.find(item => item.tournamentName === selectedOption);
      console.log(table);
      setTableValue(table);
    }
  }, [selectedOption])

  return (
    <>
    <div className='performanceContainer'>
      <Grid2 container spacing={3} xs={12} sm={6} md={4} lg={3} sx={{ width: "90vw", marginTop: '20px', marginRight: "auto", marginLeft: 'auto' }}>
      <FormControl fullWidth variant="outlined" sx={{ maxWidth: 200,height: '60px', marginY: 'auto' }}>
        <InputLabel id="demo-simple-select-label">Select Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={selectedOption}
          label="Select Option"
          onChange={(e) => {
            setSelectedOption(e.target.value)
          }}
        >
          {dropDownMenu.map(item => (
            <MenuItem value={item.name}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className='tableContainer'>
        <Card
          sx={{
            maxWidth: 1100,
            width:920,
            margin: 'auto',
            borderRadius: 4,
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
          }}
        >
       
          <CardContent>
            {tableValue ? (
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
                    <TableCell><Typography fontWeight="bold">Name</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Hosted By</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Total Matches</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Sport Type</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Format</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Winner Team Name</Typography></TableCell>
                    <TableCell><Typography fontWeight="bold">Winner Team Captain</Typography></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{tableValue.tournamentName}</TableCell>
                    <TableCell>{tableValue.hostedBy}</TableCell>
                    <TableCell>{tableValue.totalMatches}</TableCell>
                    <TableCell>{tableValue.type}</TableCell>
                    <TableCell>{tableValue.format}</TableCell>
                    <TableCell>
                      <Typography color={tableValue.status === 'true' ? 'green' : 'orange'}>
                        {tableValue.status === 'true' ? 'Finished' : 'Running'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {tableValue.status === 'true' ? tableValue.winnerTeamName : 'Not Declared Yet'}
                    </TableCell>
                    <TableCell>
                      {tableValue.status === 'true' ? tableValue.winnerTeamCapton : 'Not Declared Yet'}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Typography variant="h6" sx={{ textAlign: 'center', color: '#888' }}>
                No Data Available
              </Typography>
            )}
          </CardContent>
        </Card>

      </div>
      </Grid2>
    </div>
    </>
  )
}

export default Performance
