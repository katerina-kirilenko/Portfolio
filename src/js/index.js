import "../css/main.scss";

window.onload = function () {
  // Button to top
  clickButtonTop();

  // Tags
  addTagsClickHandler();

  // Scroll
  scrollPage();

  // Modal
  addModal();
};

// Button to top
function clickButtonTop() {
  let btnTop = document.querySelector("#btnTop");

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 200 ||
      document.documentElement.scrollTop > 200
    ) {
      btnTop.style.display = "block";
    } else {
      btnTop.style.display = "none";
    }
  }

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  btnTop.addEventListener("click", topFunction);
}

// Tags
const addTagsClickHandler = () => {
  document
    .querySelector(".portfolio__tags")
    .addEventListener("click", (event) => {
      if (event.target.classList.contains("tag")) {
        let clickedTag = event.target;
        removeSelectedTags();
        selectClickedTag(clickedTag);
        if (clickedTag.innerText === "Все") {
          showAllImages();
        } else {
          filterImagesBySelectedTag(clickedTag.innerText);
        }
      }
    });
};

const removeSelectedTags = () => {
  let tags = document.querySelectorAll(".portfolio__tags .tag");
  tags.forEach((tag) => {
    tag.classList.remove("tag_selected");
    tag.classList.add("tag_bordered");
  });
};

const selectClickedTag = (clickedTag) => {
  clickedTag.classList.add("tag_selected");
  clickedTag.classList.remove("tag_bordered");
};

let examplesWrapper = document.querySelector(".examples");
let collection = [...examplesWrapper.children];

const showAllImages = () => {
  examplesWrapper.innerHTML = "";

  collection.forEach((item) => {
    examplesWrapper.append(item);
  });
};

const filterImagesBySelectedTag = (selectedTag) => {
  examplesWrapper.innerHTML = "";
  collection.forEach((example) => {
    if (example.dataset.category === selectedTag) {
      examplesWrapper.append(example);
    }
  });
};

// Scroll
function scrollPage() {
  document.addEventListener("scroll", onScroll);

  function onScroll() {
    let sections = document.querySelectorAll("section");
    let links = document.querySelectorAll(".navigation__link a");
    let linesSuccess = document.querySelectorAll(".line-success");

    sections.forEach((el) => {
      if (
        el.getBoundingClientRect().top <=
        document.documentElement.clientWidth / 3
      ) {
        links.forEach((a) => {
          a.classList.remove("active");
          if (el.getAttribute("id") === a.getAttribute("href").substring(1)) {
            a.classList.add("active");
          }
        });
        linesSuccess.forEach((line) => {
          line.style.animationName = "doing-line";
        });
      }
    });
  }
}

// Modal
function addModal() {
  let modals = document.querySelectorAll(".example__modal");
  for (let i = 0; i < modals.length; i++) {
    modals[i].id = `modal-${i + 1}`;
  }

  document.querySelector(".examples").addEventListener("click", (e) => {
    if (e.target.closest(".example")) {
      let example = e.target.closest(".example");
      let btn = example.querySelector(".icon_more");
      let span = example.querySelector(".close-btn");

      let modal = example.lastElementChild;

      if (e.target === btn) {
        modal.classList.add("show");
      }
      if (e.target === span) {
        modal.classList.remove("show");
      }

      window.onclick = function (event) {
        if (event.target == modal) {
          modal.classList.remove("show");
        }
      };
    }
  });
}
