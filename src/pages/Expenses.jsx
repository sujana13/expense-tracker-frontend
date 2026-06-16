import { useEffect, useState } from "react";

import MenuItem from "@mui/material/MenuItem";

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

  useEffect(() => {
    fetchExpenses();
    fetchCategories();
  }, []);

  const [open, setOpen] = useState(false);

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
  
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async () => {
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
            {expenses.map((expense) => (
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
/>


<TextField
  label="Expense Date"
  fullWidth
  margin="normal"
  value={formData.expense_date}
  onChange={(e) =>
    setFormData({
      ...formData,
      expense_date: e.target.value
    })
  }
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
    </Container>
  );
}

export default Expenses;