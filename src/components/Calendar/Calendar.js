import React, { Component } from 'react';
// import axios from "./axios";
// import Grid from '@material-ui/core/Grid';
// import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import './Calendar.css';
import moment from 'moment';
import Typography from '@material-ui/core/Typography';

// table imports
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.warning.dark,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },

}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dateContext: moment(),
            today: moment(),
            showMonthPopup: false,
            showYearPopup: false,
            previousWeekHandler: false,
            nextWeekHandler: false
        };
    }

    // componentDidMount() {
    //     console.log("calendar has mounted!");
    //
    //     axios.get("./data.json").then(res => {
    //         return res.json();
    //     }).then(data => {
    //         console.log("Data in componentDidMount: ", data);
    //     })
    // }

    //
    isDayWeekends = day => day === "Sat" || day === "Sun";

    weekdays = moment.weekdays();
    weekdaysShort = moment.weekdaysShort();
    months = moment.months();

    year = () => {
        return this.state.dateContext.format("Y");
    };

    month = () => {
        return this.state.dateContext.format("MMMM");
    };

    daysInMonth = () => {
        return this.state.dateContext.daysInMonth();
    };

    currentDate = () => {
        return this.state.dateContext.get("date");
    };

    currentDay = () => Number(this.state.dateContext.format("D"));

    firstDayOfMonth = () => {
        let dateContext = this.state.dateContext;
        let firstDay = moment(dateContext).startOf("month").format("d");
        return firstDay;
    }

    previousWeekHandler = () => {
        console.log("Clicked on previous button!");
    };
    nextWeekHandler = () => {
        console.log("Clicked on next button!");
    };

    render() {
        // Map the weekdays...

        let weekdays = this.weekdaysShort.map(day =>
            <StyledTableCell key={day} align="center">
                {this.isDayWeekends(day) ? "Off" : day }
            </StyledTableCell>
        );

        console.log("weekdays: ", weekdays);

        // print out the current month
        let currentMonth = this.month();

        // days that don't belong to the current month,
        // but are visible in the monthly view are BLANKS
        let blanks = [];
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <StyledTableCell key={i*80} className="empty-slot" align="center">
                    {" "}
                </StyledTableCell>
            );
        }
        // console.log("blanks: ", blanks);

        // looping through all the days in a month to render month view
        let daysInMonth = [];
        // console.log("This is the weekend", weekdays[0].key);

        for (let d = 1; d <= this.daysInMonth(); d++) {
            // console.log("weekdays in loop: ", weekdays);
            let className = (d === this.currentDay() ? "day current-day": "day");

            // console.log("weekdays: ", weekdays[d].key);

                daysInMonth.push(
                    <StyledTableCell key={d} className={className} align="center">
                    {d}
                    <div className="shifts morning">Morning</div>
                    <div className="shifts evening">Evening</div>
                    </StyledTableCell>
                )
            }

        // console.log("days in month: ", daysInMonth[1]['_self'].state.dateContext['_d']);

        let totalMonth = [...blanks, ...daysInMonth];
        let rows = [];
        let cells = [];

        totalMonth.forEach((row, i) => {
            if ((i % 7) !== 0) {
                cells.push(row);
            } else {
                let insertRow = cells.slice();
                rows.push(insertRow);
                cells = [];
                cells.push(row);
            }
            if (i === totalMonth.length - 1) {
                let insertRow = cells.slice();
                rows.push(insertRow);
            }
        });

        let daysElems = rows.map((d, i) => {
            return (
                <StyledTableRow key={i*100}>
                {d}
                </StyledTableRow>
            );
        })

        return (
            <>
            <Typography className="month-heading" variant="h4" gutterBottom>
            {currentMonth}
            </Typography>
            <div className="btn-container">
                <Button
                className="calendar-btn"
                variant="outlined" color="primary"
                onClick={this.previousWeekHandler}
                >
                    Previous
                </Button>

                <Button
                margin='5rem'
                className="calendar-btn"
                variant="outlined" color="primary"
                onClick={this.nextWeekHandler}
                >
                    Next
                </Button>
            </div>

            <TableContainer className='table-dimensions' component={Paper}>
              <Table  className="inner-table" aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {weekdays}
                  </TableRow>
                </TableHead>
                <TableBody>
                    {daysElems}
                </TableBody>
              </Table>
            </TableContainer>
            </>

          );
      }
}


export default Calendar;
