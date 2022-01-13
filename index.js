let textHistory = [];
let clicked = false;

if (window.localStorage.getItem("user") !== null) {
  textHistory = JSON.parse(window.localStorage.getItem("user"));
}

const typeLikeATwat = () => {
  const userString = document.getElementById("text-field").value;

  let lastCharCapitalised = userString[0] === userString[0].toUpperCase();
  let newStr = "";
  let chance;

  for (char of userString) {
    // nonsense
    chance = Math.random();
    if (lastCharCapitalised && chance > 0.6) {
      newStr += char.toUpperCase();
      lastCharCapitalised = true;
    } else if (!lastCharCapitalised && chance > 0.3) {
      newStr += char.toUpperCase();
      lastCharCapitalised = true;
    } else {
      newStr += char.toLowerCase();
      lastCharCapitalised = false;
    }
    newStr;
  }

  updateDisplayText(newStr);
  textHistory.unshift(newStr);

  window.localStorage.setItem("user", JSON.stringify(textHistory));
};

const updateDisplayText = (string) => {
  document.getElementById("display-text").innerHTML = string;
  document.getElementsByClassName("bg-text")[0].innerHTML = string;

  if (!clicked) {
    clicked = true;
    document.getElementsByClassName("bg-text")[0].classList.add("active");
  } else {
    updateHistory(string);
  }
};

const updateHistory = (string) => {
  const target = document.querySelector(".text-history");
  let itemNode = document.createElement("p");
  let itemText = document.createTextNode(string);

  itemNode.appendChild(itemText);
  target.prepend(itemNode);

  disableHistoryBtn();
};

const copyText = () => {
  const cb = navigator.clipboard;
  const target = document.querySelector("#display-text");
  cb.writeText(target.innerText).then(() => console.log("Text copied"));
};

const displayHistory = () => {
  const target = document.querySelector(".text-history");
  textHistory.forEach((item) => {
    let itemNode = document.createElement("p");
    let itemText = document.createTextNode(item);

    itemNode.appendChild(itemText);
    target.appendChild(itemNode);
  });
};

const clearHistory = () => {
  let textList = document.querySelector(".text-history");
  textHistory = [];
  window.localStorage.removeItem("user");

  while (textList.firstChild) {
    textList.removeChild(textList.firstChild);
  }

  if (textList.classList.contains("active")) {
    expandHistory();
  }

  disableHistoryBtn();
};

const expandHistory = () => {
  let icon = document.getElementsByClassName("chevron-icon")[0];
  let container = document.getElementsByClassName("text-history")[0];
  icon.classList.toggle("active");
  container.classList.toggle("active");
};

const disableButton = () => {
  let button = document.getElementById("mash-text");

  if (document.getElementById("text-field").value === "") {
    button.setAttribute("disabled", "disabled");
  } else {
    button.removeAttribute("disabled");
  }
};

const disableHistoryBtn = () => {
  const clearBtn = document.getElementById("clear-btn");
  const chevronBox = document.getElementsByClassName("chevron-box")[0];
  const icon = document.getElementsByClassName("chevron-icon")[0];
  const listLength = document.getElementsByClassName("text-history")[0]
    .childNodes.length;

  if (!listLength) {
    clearBtn.setAttribute("disabled", "disabled");
    chevronBox.setAttribute("disabled", "disabled");
    icon.classList.add("disabled");
  } else {
    clearBtn.removeAttribute("disabled");
    chevronBox.removeAttribute("disabled");
    icon.classList.remove("disabled");
  }
};

if (textHistory.length) {
  displayHistory();
  disableHistoryBtn();
}

window.onload = (e) => {
  document.getElementById("text-field").addEventListener("keyup", (e) => {
    if (e.key === "Enter") typeLikeATwat();
  });
};
