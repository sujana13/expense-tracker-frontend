import { useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";

import {
    Grid
  } from "@mui/material";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from "@mui/material";

import api from "../api/axios";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

import TextField from "@mui/material/TextField";

import TablePagination from "@mui/material/TablePagination";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Expenses() {
  const [expenses, setExpenses] = useState([]);

  const [categories, setCategories] = useState([]);

  const [editingExpenseId, setEditingExpenseId] = useState(null);


  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    expense_date: "",
    payment_method: "",
    category_id: ""
  });

  const [filters, setFilters] = useState({
    category_id: "",
    payment_method: "",
    start_date: "",
    end_date: ""
  });


  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const [errors, setErrors] = useState({});

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");

      setExpenses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/categories"
      );
  
      setCategories(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (expenseId) => {

    if (
      !window.confirm(
        "Delete this expense?"
      )
    ) {
      return;
    }
  
    try {
      await api.delete(
        `/expenses/${expenseId}`
      );
  
      fetchExpenses();

      setSnackbar({
        open: true,
        message: "Expense deleted successfully",
        severity: "success"
      });
  
    } catch (error) {
      console.error(error);
    
      setSnackbar({
        open: true,
        message: "Operation failed",
        severity: "error"
      });
    }
  };

  const handleSave = async () => {

    if (!validateForm()) {
      return;
    }

    try {
        if (editingExpenseId) {
            await api.put(
              `/expenses/${editingExpenseId}`,
              formData
            );
          } else {
            await api.post(
              "/expenses",
              formData
            );
          }
      setEditingExpenseId(null);
      setOpen(false);
  
      fetchExpenses();

      setFormData({
        title: "",
        description: "",
        amount: "",
        expense_date: "",
        payment_method: "",
        category_id: ""
      });

      setOpen(false);

      setSnackbar({
        open: true,
        message: "Expense saved successfully",
        severity: "success"
      });
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpenseId(expense.id);
  
    setFormData({
      title: expense.title,
      description: expense.description,
      amount: expense.amount,
      expense_date: expense.expense_date,
      payment_method: expense.payment_method,
      category_id: expense.category_id
    });
  
    setOpen(true);
  };


  const loadAllExpenses = () => {
    fetchExpenses();
  };

  const handleFilter = async () => {
    try {
      const response = await api.get(
        "/expenses",
        {
          params: filters
        }
      );
  
      setExpenses(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get(
        "/expenses/export",
        {
          responseType: "blob"
        }
      );
  
      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );
  
      const link = document.createElement("a");
  
      link.href = url;
      link.setAttribute(
        "download",
        "expenses.csv"
      );
  
      document.body.appendChild(link);
  
      link.click();
  
      link.remove();
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await api.get(
        "/expenses",
        {
          params: {
            search: search
          }
        }
      );
  
      setExpenses(response.data);
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = (
    event,
    newPage
  ) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (
    event
  ) => {
    setRowsPerPage(
      parseInt(event.target.value, 10)
    );
  
    setPage(0);
  };

  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }
  
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount =
        "Amount must be greater than 0";
    }
  
    if (!formData.category_id) {
      newErrors.category_id =
        "Please select a category";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors)
      .length === 0;
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
      >
        Expenses
      </Typography>

      <Button
       variant="contained"
       sx={{ mb: 2 }}
       onClick={() => setOpen(true)}
       >
  {editingExpenseId
  ? "Edit Expense"
  : "Add Expense"}
</Button>

<Button
  variant="outlined"
  sx={{ ml: 2, mb:2 }}
  onClick={handleExport}
>
  Export CSV
</Button>

<Grid container spacing={2} sx={{ mb: 2 }}>

  <Grid item xs={12} md={4}>
    <TextField
      select
      fullWidth
      label="Category"
      sx={{
        backgroundColor: "white",
        borderRadius: 1
      }}
      value={filters.category_id}
      onChange={(e) =>
        setFilters({
          ...filters,
          category_id: e.target.value
        })
      }
    >
      <MenuItem value="">
        All Categories
      </MenuItem>

      {categories.map((category) => (
        <MenuItem
          key={category.id}
          value={category.id}
        >
          {category.name}
        </MenuItem>
      ))}
    </TextField>
  </Grid>

  <Grid item xs={12} md={3}>
    <TextField
      fullWidth
      label="Payment Method"
      sx={{
        backgroundColor: "white",
        borderRadius: 1
      }}
      value={filters.payment_method}
      onChange={(e) =>
        setFilters({
          ...filters,
          payment_method: e.target.value
        })
      }
    />
  </Grid>

  <Grid item xs={12} md={3}>
  <TextField
  label="From"
  type="date"
  fullWidth
  sx={{
    backgroundColor: "white",
    borderRadius: 1
  }}
  value={filters.start_date}
  onChange={(e) =>
    setFilters({
      ...filters,
      start_date: e.target.value
    })
  }
/>
  </Grid>

  <Grid item xs={12} md={3}>
    <TextField
      label="To"
      fullWidth
      type="date"

      sx={{
        backgroundColor: "white",
        borderRadius: 1
      }}
      value={filters.end_date}
      onChange={(e) =>
        setFilters({
          ...filters,
          end_date: e.target.value
        })
      }
    />
  </Grid>

  <Grid item xs={12} md={3}>
    <Button
      variant="contained"
      onClick={handleFilter}
      sx={{ mr: 2 }}
    >
      Filter
    </Button>

    <Button
      variant="outlined"
      onClick={loadAllExpenses}
    >
      Reset
    </Button>
  </Grid>

</Grid>
<TextField
  label="Search Expenses"
  value={search}
  onChange={(e) =>
    setSearch(e.target.value)
  }
  sx={{
    mr: 2,
    backgroundColor: "white",
    borderRadius: 1
  }}
/>

<Button
  variant="contained"
  onClick={handleSearch}
>
  Search
</Button>

<Button
  variant="outlined"
  sx={{ ml: 2 }}
  onClick={fetchExpenses}
>
  Reset
</Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Payment Method</TableCell>

              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {expenses
           .slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
            )
            .map((expense) => (
              <TableRow key={expense.id}>
                <TableCell>
                  {expense.title}
                </TableCell>
                    

                <TableCell>
                  {expense.description}
                </TableCell>

                <TableCell>
                  ₹{expense.amount}
                </TableCell>

                <TableCell>
                  {expense.expense_date}
                </TableCell>

                <TableCell>
                  {expense.payment_method}
                </TableCell>

                <TableCell>
                <Button
                   variant="contained"
                   onClick={() =>
                   handleEdit(expense)
                   }
                   sx={{ mr: 1 }}
                   >
                   Edit
                </Button>

                <Button
                   variant="contained"
                   color="error"
                   onClick={() =>
                   handleDelete(expense.id)
                   }
                   >
                  Delete
                 </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
  component="div"
  count={expenses.length}
  page={page}
  onPageChange={handleChangePage}
  rowsPerPage={rowsPerPage}
  onRowsPerPageChange={
    handleChangeRowsPerPage
  }
  rowsPerPageOptions={[
    5,
    10,
    25
  ]}
/>

      <Dialog
  open={open}
  onClose={() => setOpen(false)}
>
  <DialogTitle>
    Add Expense
  </DialogTitle>

  <DialogContent>

  <TextField
  label="Title"
  fullWidth
  margin="normal"
  value={formData.title}
  onChange={(e) =>
    setFormData({
      ...formData,
      title: e.target.value
    })
  }
  error={!!errors.title}
  helperText={errors.title}
/>

<TextField
  label="Description"
  fullWidth
  margin="normal"
  value={formData.description}
  onChange={(e) =>
    setFormData({
      ...formData,
      description: e.target.value
    })
  }
/>

<TextField
  label="Amount"
  type="number"
  fullWidth
  margin="normal"
  value={formData.amount}
  onChange={(e) =>
    setFormData({
      ...formData,
      amount: e.target.value
    })
  }
  error={!!errors.amount}
  helperText={errors.amount}
/>


<TextField
  label="Expense Date"
  type="date"
  fullWidth
  margin="normal"
  value={formData.expense_date}
  onChange={(e) =>
    setFormData({
      ...formData,
      expense_date: e.target.value
    })
  }
  InputLabelProps={{
    shrink: true
  }}
/>


<TextField
  label="Payment Method"
  fullWidth
  margin="normal"
  value={formData.payment_method}
  onChange={(e) =>
    setFormData({
      ...formData,
      payment_method: e.target.value
    })
  }
/>

<TextField
  select
  label="Category"
  fullWidth
  margin="normal"
  value={formData.category_id}
  onChange={(e) =>
    setFormData({
      ...formData,
      category_id: e.target.value
    })
  }
  error={!!errors.category_id}
  helperText={errors.category_id}
>
  {categories.map((category) => (
    <MenuItem
      key={category.id}
      value={category.id}
    >
      {category.name}
    </MenuItem>
  ))}
</TextField>

  </DialogContent>

  <DialogActions>

    <Button
      onClick={() => setOpen(false)}
    >
      Cancel
    </Button>

    <Button
  variant="contained"
  onClick={handleSave}
>
  Save
</Button>

  </DialogActions>

</Dialog>

<Snackbar
  open={snackbar.open}
  autoHideDuration={3000}
  onClose={() =>
    setSnackbar({
      ...snackbar,
      open: false
    })
  }
>
  <Alert
    severity={snackbar.severity}
    sx={{ width: "100%" }}
  >
    {snackbar.message}
  </Alert>
</Snackbar>
    </Container>
  );
}

export default Expenses;