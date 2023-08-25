document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expenseForm");
    const expenseList = document.getElementById("expenseList");
    let editingIndex = -1;
  
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const expenseAmount = parseFloat(document.getElementById("expenseAmount").value);
      const expenseName = document.getElementById("expenseName").value;
      const expenseCategory = document.getElementById("expenseCategory").value;
  
      if (isNaN(expenseAmount) || !expenseName || !expenseCategory) {
        alert("Please enter valid expense details.");
        return;
      }
  
      const expense = {
        amount: expenseAmount,
        name: expenseName,
        category: expenseCategory
      };
  
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  
      if (editingIndex !== -1) {
        expenses[editingIndex] = expense;
        editingIndex = -1;
      } else {
        expenses.push(expense);
      }
  
      localStorage.setItem("expenses", JSON.stringify(expenses));
  
      updateExpenseList();
      expenseForm.reset();
    });
  
    function updateExpenseList() {
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenseList.innerHTML = "";
  
      expenses.forEach((expense, index) => {
        const expenseItem = document.createElement("div");
        expenseItem.classList.add("mb-2", "p-2", "border", "border-secondary");
        expenseItem.innerHTML = `
          <strong>${expense.name}</strong>:
          ${expense.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
          <button class="btn btn-info btn-sm ms-2" onclick="editExpense(${index})">Edit</button>
          <button class="btn btn-danger btn-sm ms-2" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(expenseItem);
      });
    }
  
    window.editExpense = (index) => {
      editingIndex = index;
      const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      const expense = expenses[index];
      document.getElementById("expenseAmount").value = expense.amount;
      document.getElementById("expenseName").value = expense.name;
      document.getElementById("expenseCategory").value = expense.category;
    };
  
    window.deleteExpense = (index) => {
      let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
      expenses.splice(index, 1);
      localStorage.setItem("expenses", JSON.stringify(expenses));
      updateExpenseList();
    };
  
    // Initial load
    updateExpenseList();
  });
  