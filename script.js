"use strict";

// variables
const value = document.querySelector("#value");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const btnAdd = document.querySelector("#add");
const warnings = document.querySelectorAll(".required-message");
const expenseList = document.querySelector(".list");
const expenses = [];
let expense = {};

// just test to create category
const newCategory = document.createElement("option");
newCategory.setAttribute("value", "hobby");
newCategory.innerText = "koníčky";
category.appendChild(newCategory);

// validate form
function validateInput(value, category, date) {
  if (isNaN(value) || value === "") {
    warnings[0].innerText = "Enter number here!";
    return false;
  } else {
    warnings[0].innerText = "";
  }
  if (!category) {
    warnings[1].innerText = "Select category!";
    return false;
  } else {
    warnings[1].innerText = "";
  }
  if (!date) {
    warnings[2].innerText = "Enter date!";
    return false;
  } else {
    warnings[1].innerText = "";
  }
  return true;
}

// event handler for add button
btnAdd.addEventListener("click", (e) => {
  e.preventDefault();
  if (validateInput(value.value, category.value, date.value)) {
    expenses.push({
      value: parseFloat(value.value),
      category: category.value,
      date: date.value,
    });
    console.log(expenses);
  } else {
    return;
  }
});

// async function to get data from API
async function getData() {
  const data = await fetch("http://localhost/10/api/post/read.php");
  return data.json();
}

// get color based on expense value
const outOrInc = (value) => {
  return +value > 0 ? "income" : "outcome";
};

// call getting data and render to page
getData().then((response) => {
  for (let expense of response.data) {
    const newExpense = document.createElement("li");
    newExpense.classList.add(`list-expense`, `${outOrInc(expense.value)}`);
    newExpense.innerText = `${expense.id} - ${expense.category_name} : ${
      expense.value
    } (${new Date(Date.parse(expense.date)).toLocaleDateString()})`;
    expenseList.appendChild(newExpense);
  }
});
