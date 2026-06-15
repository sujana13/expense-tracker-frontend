import { useEffect, useState } from "react";

import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography
  } from "@mui/material";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import api from "../api/axios";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchSummary();
    fetchRecentExpenses();
  }, []);

  const fetchSummary = async () => {
    try {
      const response = await api.get(
        "/dashboard/summary"
      );

      setSummary(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentExpenses = async () => {
    try {
      const response = await api.get(
        "/dashboard/recent-expenses"
      );
  
      setRecentExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  
  
  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Expense Dashboard
      </Typography>
  
      {summary && (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Total Expenses
          </Typography>

          <Typography variant="h4">
            ₹{summary.total_expenses}
          </Typography>
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} md={6}>
      <Card>
        <CardContent>
          <Typography variant="h6">
            Expense Count
          </Typography>

          <Typography variant="h4">
            {summary.expense_count}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
)}
      
  
      <Typography
        variant="h5"
        sx={{ mt: 4, mb: 2 }}
      >
        Recent Expenses
      </Typography>
  
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {recentExpenses.map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {expense.title}
                </TableCell>
  
                <TableCell>
                  ₹{expense.amount}
                </TableCell>
  
                <TableCell>
                  {expense.expense_date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
  
    </Container>
  );
}

export default Dashboard;