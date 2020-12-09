class UI {
  constructor() {
    this.pg1 = document.querySelector(".pg1");
    this.pg2 = document.querySelector(".pg2");
    this.backBtn = document.getElementById("backbtn");
    this.numForm = document.getElementById("num-form");
    this.codeForm = document.getElementById("code-form");
    this.numInput = document.getElementById("num-input");
    this.codeInput = document.getElementById("code-input");
    this.mssg1 = document.querySelector(".mssg1");
    this.mssg2 = document.querySelector(".mssg2");
    this.showNumber = document.getElementById("showNumber");
    this.sendAgain = document.getElementById("send-again");
  }

  goNext() {
    this.pg1.style.display = "none";
    this.pg2.style.display = "block";
  }

  goBack() {
    this.sendAgain.style.display = "none";
    this.codeInput.value = "";
    this.pg1.style.display = "block";
    this.pg2.style.display = "none";
  }

  checkInput() {
    const num = parseInt(this.numInput.value);
    let res = false;
    if (num > 9000000000 && num < 10000000000) {
      res = true;
    }
    return res;
  }

  showMssg1() {
    this.mssg1.textContent = "شماره موبایل اشتباه است.";
    this.mssg1.style.visibility = "visible";
    setTimeout(() => {
      this.mssg1.style.visibility = "hidden";
    }, 2000);
  }

  showMssg2(mssg, color) {
    this.mssg2.textContent = mssg;
    this.mssg2.style.color = color;
    this.mssg2.style.visibility = "visible";
    setTimeout(() => {
      this.mssg2.style.visibility = "hidden";
    }, 3000);
  }

  sendNum() {
    this.showNumber.textContent = this.numInput.value;
  }
}

class Timer {
  constructor() {}

  static setDefault() {
    this.min = document.getElementById("min");
    this.sec = document.getElementById("sec");
    this.bar = document.getElementById("bar");

    this.period;
    this.width = 100;
    this.state = "valid";
    this.code = "1234";
    this.min.textContent = "02";
    this.sec.textContent = "00";
  }

  static startTimer() {
    this.setDefault();
    Timer.stopTimer();
    this.period = setInterval(this.reduce1sec, 1000);
  }

  static reduce1sec() {
    Timer.reduceBar();
    let second = parseInt(document.getElementById("sec").innerText);
    let minute = parseInt(document.getElementById("min").innerText);

    second--;

    if (second > 9) {
      this.sec.innerText = second;
    }

    if (second < 10 && second > -1) {
      this.sec.innerText = "0" + second;
    }

    if (second === -1) {
      if (minute > 0) {
        minute--;
        this.min.innerText = "0" + minute;
        this.sec.innerText = "59";
      } else {
        Timer.stopTimer();
        Timer.state = "expired";
        Timer.startAgain();
      }
    }
  }

  static reduceBar() {
    // 100 ÷ 120 = 0.83
    this.width = this.width - 0.83;

    this.bar.style.width = this.width + "%";
  }

  static stopTimer() {
    clearInterval(this.period);
  }

  static checkCode(code) {
    let res;
    if (this.code === code && this.state === "valid") {
      res = true;
      Timer.stopTimer();
    } else {
      res = false;
    }
    return res;
  }

  static startAgain() {
    document.getElementById("send-again").style.display = "block";
    document.getElementById("send-again").addEventListener("click", () => {
      document.getElementById("send-again").style.display = "none";
      Timer.startTimer();
    });
  }
}

const ui = new UI();
ui.numForm.addEventListener("submit", goNext);
ui.backBtn.addEventListener("click", goBack);
ui.codeForm.addEventListener("submit", goNext2);

function goNext(e) {
  e.preventDefault();
  if (ui.checkInput()) {
    ui.sendNum();
    ui.goNext();
    Timer.startTimer();
  } else {
    ui.showMssg1();
  }
}

function goBack(e) {
  e.preventDefault();
  Timer.stopTimer();
  ui.goBack();
}

function goNext2(e) {
  e.preventDefault();

  if (Timer.checkCode(ui.codeInput.value)) {
    ui.showMssg2("کد درست است", "green");
  } else {
    ui.showMssg2("کد نادرست است", "red");
  }
}
