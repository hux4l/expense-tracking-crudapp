"use strict";

// variables
const value = document.querySelector("#value");
const category = document.querySelector("#category");
const date = document.querySelector("#date");
const btnAdd = document.querySelector("#add");
const btnFetch = document.querySelector("#fetch");
const warnings = document.querySelectorAll(".required-message");
const expenseList = document.querySelector(".list");
const expenses = [];
let expense = {};

// just test to create category
const newCategory = document.createElement("option");
newCategory.setAttribute("value", 4);
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

    // gets returned message
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

// listener for button to fetch data
btnFetch.addEventListener("click", (e) => {
  e.preventDefault();
  // call getting data and render to page
  getData().then((response) => {
    for (let expense of response.data) {
      // creates new li element, sets classes, based on value green or red
      const newExpense = document.createElement("li");
      newExpense.classList.add(`list-expense`, `${outOrInc(expense.value)}`);
      newExpense.innerText = `${expense.id} - ${expense.category_name} : ${
        expense.value
      } (${new Date(Date.parse(expense.date)).toLocaleDateString()})`;
      // appends li to list on webpage
      expenseList.appendChild(newExpense);
    }
  });
});
