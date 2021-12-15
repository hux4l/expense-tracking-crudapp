"use strict";

// variables
const value = document.querySelector("#value");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const btnAdd = document.querySelector("#add");
const btnFetch = document.querySelector("#fetch");
const warnings = document.querySelectorAll(".required-message");
const expenseList = document.querySelector(".list");
const table = document.querySelector("tbody");
const expenses = [];
let expense = {};

// just test to create category

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
  // validate inputs
  if (validateInput(value.value, category.value, date.value)) {
    // create new object
    expense = {
      date: date.value,
      value: parseFloat(value.value),
      category_id: parseInt(category.value),
    };

    // sends data and store returning promise
    const data = sendData(expense);
    console.log(data);
    //    gets returned message dont work with no cors
    data
      .then((response) => response.json())
      .then((message) => console.log(message.message));
  } else {
    return;
  }
});

// async function to get data from API
async function getData() {
  const data = await fetch("http://localhost/10/api/post/read.php");
  // return data in json format
  return data.json();
}

// http headers
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

// send data to api
async function sendData(obj) {
  return fetch("http://localhost/10/api/post/create.php", {
    // method
    method: "POST",
    //headers
    headers: myHeaders,
    // body of request
    body: JSON.stringify(obj),
    // redirect
    redirect: "follow",
  });
}

// get color based on expense value
const outOrInc = (value) => {
  return +value > 0 ? "income" : "outcome";
};

// return object expense
function createExpense(expense) {
  return {
    id: expense.id,
    date: expense.date,
    value: expense.value,
    category_id: expense.category_id,
    category_name: expense.category_name,
  };
}

// create element
function createExpenseElement(expense) {
  return `
  <tr class="${outOrInc(expense.value)}">
    <td>${expense.id} </td>
    <td>${expense.category_name}</td>
    <td>${new Date(Date.parse(expense.date)).toLocaleDateString()}</td>
    <td class="expense-value">${expense.value}</td>
  </tr>
`;
}

// listener for button to fetch data
btnFetch.addEventListener("click", (e) => {
  e.preventDefault();
  // call getting data and render to page
  getData().then((response) => {
    for (let expense of response.data) {
      // push to array
      expenses.push(createExpense(expense));
      // display expenses
      const html = createExpenseElement(expense);
      table.insertAdjacentHTML("beforeend", html);
    }
  });
});

// categories
let categories = [];

// create object for each category
function createCategoryEl(category) {
  return {
    id: category.id,
    text: category.text,
  };
}

// get all categories from SQL
async function getCategory() {
  const category = fetch("http://localhost/10/api/category/read.php");

  // get categories from API
  await category
    .then((response) => response.json())
    .then((data) => {
      for (let ent of data.data) {
        let e = createCategoryEl(ent);
        categories.push(e);
      }
      fillCategories(categories);
    });
}

// fill categories select element
async function fillCategories(categories) {
  for (let cat of categories) {
    const el = document.createElement("option");
    el.value = +cat.id;
    el.text = cat.text;
    category.appendChild(el);
  }
}

getCategory();
