import { useEffect, useState } from "react";

import {
    Container,
    Grid,
    Card,
    CardContent,
    Typography
  } from "@mui/material";

  import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
  } from "recharts";

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8"
  ];

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import api from "../api/axios";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis
} from "recharts";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [categorySummary, setCategorySummary] = useState([]);
  const [monthlyTrend, setMonthlyTrend] = useState([]);
  const monthNames = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec"
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  useEffect(() => {
    fetchSummary();
    fetchRecentExpenses();
    fetchCategorySummary();
    fetchMonthlyTrend();

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

  const fetchCategorySummary = async () => {
    try {
      const response = await api.get(
        "/dashboard/category-summary"
      );
  
      setCategorySummary(
        response.data
      );
  
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMonthlyTrend = async () => {
    try {
      const response = await api.get(
        "/dashboard/monthly-trend"
      );
  
      setMonthlyTrend(response.data);
  
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
      <TableContainer component={Paper}>
  <Table>
    ...
  </Table>
</TableContainer>


<Typography
  variant="h5"
  sx={{ mt: 4, mb: 2 }}
>
  Category Summary
</Typography>

<TableContainer component={Paper}>
  <Table>
    <TableHead>
      <TableRow>
        <TableCell>
          Category
        </TableCell>

        <TableCell>
          Total Amount
        </TableCell>
      </TableRow>
    </TableHead>

    <TableBody>

      {categorySummary.map((item) => (
        <TableRow
          key={item.category}
        >
          <TableCell>
            {item.category}
          </TableCell>

          <TableCell>
            ₹{item.total_amount}
          </TableCell>
        </TableRow>
      ))}

    </TableBody>

  </Table>
</TableContainer>

<Typography
  variant="h5"
  sx={{ mt: 4, mb: 2 }}
>
  Expense Distribution
</Typography>

<Paper sx={{ p: 2 }}>
  <ResponsiveContainer
    width="100%"
    height={300}
  >
    <PieChart>

      <Pie
        data={categorySummary}
        dataKey="total_amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {categorySummary.map(
          (entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                COLORS[
                  index %
                  COLORS.length
                ]
              }
            />
          )
        )}
      </Pie>

      <Tooltip />
      <Legend />

    </PieChart>
  </ResponsiveContainer>
</Paper>

<Typography
  variant="h5"
  sx={{ mt: 4, mb: 2 }}
>
  Monthly Expense Trend
</Typography>

<ResponsiveContainer
  width="100%"
  height={300}
>
  <BarChart data={monthlyTrend}>
  <XAxis
  dataKey="month"
  tickFormatter={(month) => monthNames[month]}
/>
    <Tooltip />
    <Bar
      dataKey="total_amount"
    />
  </BarChart>
</ResponsiveContainer>
    </Container>
  );

     
}

export default Dashboard;