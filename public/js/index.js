let textHistory = [];
let clicked = false;

const pressedOk = () => {
  document.getElementsByClassName("modal")[0].classList.add("hidden");
  document.getElementsByClassName("overlay")[0].classList.add("hidden");

  window.localStorage.setItem(
    "user",
    JSON.stringify({ entries: textHistory, pressedOk: true }),
  );
};

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

  window.localStorage.setItem(
    "user",
    JSON.stringify({ entries: textHistory, pressedOk: true }),
  );
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

async function copyText() {
  const target = document.querySelector("#display-text");
  if (typeof navigator.clipboard == "undefined") {
    console.log("navigator.clipboard");
    var textArea = document.createElement("textarea");
    textArea.value = target.innerText;
    textArea.style.position = "fixed"; //avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      var successful = document.execCommand("copy");
      var msg = successful ? "successful" : "unsuccessful";
      console.info(msg);
    } catch (err) {
      console.warning("Was not possible to copy te text: ", err);
    }

    document.body.removeChild(textArea);
    return;
  }
  navigator.clipboard.writeText(target.innerText).then(
    function () {
      console.info(`successful!`);
    },
    function (err) {
      console.warning("unsuccessful!", err);
    },
  );
}

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

const disableButton = (e) => {
  let button = document.getElementById("mash-text");
  console.log(document.getElementById("text-field").value);

  if (!document.getElementById("text-field").value.trim().length) {
    button.setAttribute("disabled", "disabled");
  } else {
    button.removeAttribute("disabled");
  }
};

const disableHistoryBtn = () => {
  const clearBtn = document.getElementById("clear-btn");
  const chevronBox = document.getElementsByClassName("chevron-box")[0];
  const icon = document.getElementsByClassName("chevron-icon")[0];
  const listLength =
    document.getElementsByClassName("text-history")[0].childNodes.length;

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

  if (window.localStorage.getItem("user") !== null) {
    const { entries, pressedOk: yes } = JSON.parse(
      window.localStorage.getItem("user"),
    );

    textHistory = entries;

    return;
  }

  document.getElementsByClassName("modal")[0].classList.remove("hidden");
  document.getElementsByClassName("overlay")[0].classList.remove("hidden");
};
