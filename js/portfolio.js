class Portfolio {
  constructor() {
    this.body = document.querySelector("body");
    this.menuBtns = document.querySelectorAll("#portfolio-menu>button");
    this.itemsField = document.querySelector(".portfolio");

    // FETCH CONTENT AND FILL
    this.fetchAndFill();
    // FILTER FUNCTION
    this.buttonClickListener();
  }

  // FETCH CONTENT AND FILL
  fetchAndFill() {
    fetch("js/portfolioContent.json")
      .then((response) => response.json())
      .then((data) => this.fillItemsField(data))
      .catch((error) => {
        throw error;
      });
  }
  fillItemsField(content) {
    this.itemsField.innerHTML = "";
    content.forEach((item) => this.createPortfolioItem(item));
    this.portfolioItems = document.querySelectorAll(".portfolio-item");
    this.filterPortfolio(this.menuBtns[0]);
  }
  createPortfolioItem(item) {
    const portfolioItem = document.createElement("div");
    portfolioItem.classList = `column-1-3 portfolio-item ${item.type}`;

    // IMAGE
    const image = document.createElement("img");
    image.src = `media/${item.img}.jpg`;
    image.alt = `${item.title}`;

    const portfolioContent = document.createElement("div");
    portfolioContent.classList = "portfolio-content";

    const txt = document.createElement("div");
    txt.classList = "portfolio-txt";

    // TITLE
    const title = document.createElement("h2");
    title.innerText = item.title;
    txt.appendChild(title);

    // PARAGRAPH
    if (item.text.length) {
      item.text.forEach((pText) => {
        const text = document.createElement("p");
        text.innerHTML = pText;
        txt.appendChild(text);
      });
    }
    if (item.text.length === 0) {
      const text = document.createElement("p");
      text.innerHTML = item.type.includes("dev")
        ? "HTML / CSS / JavaScript"
        : "Graphic Design / UX-Design";
      txt.appendChild(text);
    }
    portfolioContent.appendChild(txt);

    // BUTTONS
    if (item.buttons.length) {
      const btns = document.createElement("div");
      btns.classList = "portfolio-btns";

      const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 615.14 161.33"><polygon class="btn-backgr" points="155.3,159.9 3.1,70.1 155.3,1.4 459.8,1.4 612.1,91.2 459.8,159.9"/><polyline class="btn-lines" points="155.3,159.9 118.9,54.5 155.3,1.4"/><line class="btn-lines" x1="3.1" y1="70.1" x2="118.9" y2="54.5"/><polygon class="btn-lines" points="155.3,159.9 3.1,70.1 155.3,1.4 459.8,1.4 612.1,91.2 459.8,159.9"/></svg>';
      for (let i = 0; i < item.buttons.length; i++) {
        const btn = document.createElement("a");
        btn.classList = "button medium";
        btn.href = item.buttons[i].url;
        btn.target = "_blank";
        btn.innerHTML = item.buttons[i].anchor + svg;
        btns.appendChild(btn);
      }
      portfolioContent.appendChild(btns);
    }

    portfolioItem.appendChild(image);
    portfolioItem.appendChild(portfolioContent);
    this.itemsField.appendChild(portfolioItem);
  }

  filterPortfolio(target) {
    this.target = target;
    this.changeActiveButton();
    this.showAndHideItems();
  }
  changeActiveButton() {
    // REMOVE ACTIVE CLASS AND DISABLED ATTR FROM ACTIVE BUTTON
    for (const btn of this.menuBtns) {
      if (btn.id === this.activeBtn) {
        btn.classList.remove("active");
        btn.disabled = false;
      }
    }
    // UPDATE ACTIVE BUTTON
    this.activeBtn = this.target.id;
    // ADD ACTIVE CLASS AND DISABLED ATTR TO ACTIVE BUTTON
    this.target.classList.add("active");
    this.target.disabled = true;
  }
  showAndHideItems() {
    for (const item of this.portfolioItems) {
      if (
        (this.activeBtn === "all" && item.classList.contains("hide")) ||
        (item.classList.contains(this.activeBtn) &&
          item.classList.contains("hide"))
      ) {
        item.classList.remove("hide");
      } else if (
        this.activeBtn !== "all" &&
        !item.classList.contains(this.activeBtn) &&
        !item.classList.contains("hide")
      ) {
        item.classList.add("hide");
      }
    }
  }

  buttonClickListener() {
    for (const btn of this.menuBtns) {
      btn.addEventListener("click", (el) => this.filterPortfolio(el.target));
    }
  }
}

function setup() {
  const portfolio = new Portfolio();
}

window.addEventListener("load", setup);
