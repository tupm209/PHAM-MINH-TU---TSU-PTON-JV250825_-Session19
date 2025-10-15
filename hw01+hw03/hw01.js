// const emailArray = ["abc@gmail.com"];
// const passwordArray = ["123456"];
// localStorage.setItem("email", JSON.stringify(emailArray));
// localStorage.setItem("password", JSON.stringify(passwordArray));

const accountArray = [
  {
    id: 1,
    email: "abc@gmail.com",
    password: "123456",
  },
];
localStorage.setItem("acountList", JSON.stringify(accountArray));
JSON.parse(localStorage.getItem(accountArray));

const form = document.getElementById("register-form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  if (formData.get("email").trim() === "") {
    alert("Hãy nhập email");
  } else {
    for (let i = 0; i < accountArray.length; i++) {
      if (formData.get("email") === accountArray.email) {
        alert("Email đã tồn tại! Hãy nhập email khác");
      } else {
        if (formData.get("password").trim() === "") {
          alert("Hãy nhập password");
        } else if (
          formData.get("password") !== formData.get("password-check")
        ) {
          alert("Mật khẩu xác nhận không trùng khớp");
        } else {
          alert("Đăng ký thành công");
          form.reset();
          break;
        }
      }
    }

    const newAccount = {
      id: accountArray[accountArray.length - 1].id + 1,
      email: formData.get("email"),
      password: formData.get("password"),
    };
    accountArray.push(newAccount);
    localStorage.setItem("acountList", JSON.stringify(accountArray));
  }
});

const loginForm = document.getElementById("login-form");
const loginPassword = document.querySelector(".login-password");
const showPassword = document.querySelector(".show-password");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  JSON.parse(localStorage.getItem(accountArray));

  if (formData.get("login-email").trim() === "") {
    alert("Hãy nhập email");
  } else if (formData.get("login-password").trim() === "") {
    alert("Hãy nhập mật khẩu");
  } else {
    for (let i = 0; i < accountArray.length; i++) {
      if (formData.get("login-email") === accountArray[i].email) {
        if (formData.get("login-password") !== accountArray[i].password) {
          alert("Tài khoản không chính xác");
          break;
        } else {
          alert("Đăng nhập thành công");
           window.location.href = "https://www.google.com/";
          loginForm.reset();
          break;
        }
      }
      if (i === accountArray.length - 1) {
        alert("Tài khoản không tồn tại");
      }
    }
  }
});

showPassword.addEventListener("click", () => {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
  } else {
    loginPassword.type = "password";
  }
});
