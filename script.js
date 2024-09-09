const products = [
  {
    title: "1",
    review: [
      {
        id: 1,
        text: "норм",
      },
    ],
  },
  {
    title: "2",
    review: [
      {
        id: 2,
        text: "хорош",
      },
      {
        id: 3,
        text: "пойдет",
      },
    ],
  },
  {
    title: "3",
    review: [
      {
        id: 4,
        text: "Удобный",
      },
      {
        id: 5,
        text: "Ничего",
      },
      {
        id: 8,
        text: "Вау",
      },
    ],
  },
];

function addDataToLocalStorage(data) {
  localStorage.setItem("data", JSON.stringify(data));
}

addDataToLocalStorage(products);

function setNewReview() {
  const divEl = document.querySelector(".container");

  divEl.addEventListener("click", ({ target }) => {
    if (!target.classList.contains("add-review-btn")) {
      return;
    }
    const formEl = target.closest(".form");
    const nameEl = formEl.querySelector(".title");
    const textEl = formEl.querySelector(".text");

    const name = nameEl.value.trim();
    const comment = textEl.value;
    if (name === "" || comment === "") {
      alert("Необходимо заполнить все поля");
      return;
    }
    const oldReviewId = Number(localStorage.getItem("id"));

    const newReview = [
      {
        title: name,
        review: [
          {
            id: oldReviewId + 1,
            text: comment,
          },
        ],
      },
    ];
    localStorage.setItem("last", JSON.stringify(newReview));
    localStorage.setItem("id", JSON.stringify(oldReviewId + 1));
  });
}
setNewReview();

function addNewReview() {
  const lastReview = JSON.parse(localStorage.getItem("last"));
  let getDataLS;
  if (localStorage.getItem("newData")) {
    getDataLS = JSON.parse(localStorage.getItem("newData"));
  } else {
    getDataLS = JSON.parse(localStorage.getItem("data"));
  }
  let flag = false;
  getDataLS.forEach((item) => {
    if (lastReview[0].title === item.title) {
      item.review.push(lastReview[0].review[0]);
      flag = true;
    }
  });

  if (!flag) {
    getDataLS.push(lastReview[0]);
  }
  localStorage.setItem("newData", JSON.stringify(getDataLS));
}
if (localStorage.getItem("last")) {
  addNewReview();
  localStorage.removeItem("last");
}
