import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import moment from "moment";
import Data from "../../data.json";


let TimeDifferenceWithData = [];
let current_time = moment().format("YYYY/M/D HH:mm:ss");

// Map through Data to calculate difference between time
// and push it to the new array
Data.claims.map((item) => {
  let differenceOfHours = moment(current_time).diff(item.updatedAt, "hours");
  TimeDifferenceWithData.push({

    item: {
      id: item.id,
      claimant: item.claimant,
      assignedTo: item.assignedTo,
      status: item.status,
      createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
      updatedAt : moment(item.updatedAt).format('DD/MM/YYYY'),
      hourDifference : differenceOfHours
    },
  });
  console.log(
    "item ID",
    item.id,
    "time difference from now",
    differenceOfHours
  );
});
// sort the array in descending order to see all the claims
let rows = TimeDifferenceWithData.sort(
  (a, b) => parseFloat(b.item.hourDifference) - parseFloat(a.item.hourDifference)
);
console.log(rows);

//console.log(Data);



function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function TableDashboard() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Recent Claim Status</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Claimant</TableCell>
            <TableCell>Assigned To</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Status</TableCell> 
            <TableCell>Time Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.item.id}>
              <TableCell>{row.item.claimant}</TableCell>
              <TableCell>{row.item.assignedTo}</TableCell>
              <TableCell>{row.item.createdAt}</TableCell>
              <TableCell>{row.item.updatedAt}</TableCell>
              <TableCell>{row.item.status}</TableCell>
              <TableCell>{row.item.hourDifference}</TableCell>
          
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more Claims
        </Link>
      </div>
    </React.Fragment>
  );
}
