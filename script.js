let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
const table = document.getElementById("expenseTable");
const totalDisplay = document.getElementById("total");

let pieChart, barChart;

function renderExpenses() {
  table.innerHTML = "";
  let total = 0;

  expenses.forEach((exp, index) => {
    total += exp.amount;
    const row = `
      <tr>
        <td>${exp.title}</td>
        <td>₹${exp.amount}</td>
        <td>${exp.category}</td>
        <td>${exp.date}</td>
        <td><button onclick="deleteExpense(${index})">Delete</button></td>
      </tr>
    `;
    table.innerHTML += row;
  });

  totalDisplay.textContent = `₹${total}`;
  renderCharts();
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function addExpense() {
  const title = document.getElementById("title").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  if (!title || !amount || !date) {
    alert("Please fill all fields!");
    return;
  }

  expenses.push({ title, amount, category, date });
  renderExpenses();

  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("date").value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

function renderCharts() {
  const categories = {};
  expenses.forEach(exp => {
    categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
  });

  const labels = Object.keys(categories);
  const values = Object.values(categories);

  if (pieChart) pieChart.destroy();
  if (barChart) barChart.destroy();

  pieChart = new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: { labels, datasets: [{ data: values, backgroundColor: ["#4a90e2","#50e3c2","#f5a623","#d0021b","#7b4397"] }] }
  });

  barChart = new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: { labels, datasets: [{ data: values, backgroundColor: "#4a90e2" }] }
  });
}

renderExpenses();
