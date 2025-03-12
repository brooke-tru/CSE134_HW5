const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const nameError = document.getElementById("nameError");
const email = document.getElementById("email");
const emailError = document.getElementById("emailError");
const comment = document.getElementById("comments");
const maxChars = comment.maxLength;
const commentInfo = document.getElementById("commentsInfo");
const commentError = document.getElementById("commentsError");
const submitBtn = document.getElementById("submitBtn");
const errorField = document.getElementById("form-errors");

//Email error
email.addEventListener("input", (event) => {
    if (email.validity.valid) {
        emailError.textContent = ""; // Remove the message content
        emailError.className = "error"; // Removes the `active` class
    } else {
        // If there is still an error, show the correct error
        showError();
        setTimeout(() => {
            emailError.className = "error";
            emailError.textContent = "";
        }, 2000);
    }
    });

form.addEventListener("submit", (event) => {
    // if the email field is invalid
    if (!email.validity.valid) {
        // display an appropriate error message
        showError();
        // prevent form submission
        event.preventDefault();
    }
});

function showError() {
    if (email.validity.valueMissing) {
      // If empty
      emailError.textContent = "You need to enter an email address.";
    } else if (email.validity.typeMismatch) {
      // If it's not an email address,
      emailError.textContent = "Entered value needs to be an email address.";
    }
    // Add the `active` class
    emailError.className = "error active";
  }


//Name error  
nameInput.addEventListener("input", (event) => {
    if (nameInput.validity.valid) {
        nameError.textContent = ""; // Remove the message content
        nameError.className = "error"; // Removes the `active` class
    } else {
        // If there is still an error, show the correct error
        showNameError();
        setTimeout(() => {
            nameError.className = "error";
            nameError.textContent = "";
        }, 2000);
    }
});

function showNameError() {
    if (nameInput.validity.valueMissing) {
        //If Empty
        nameError.textContent = "You need to enter a name.";
    }
    nameError.className = "error active";
}

//Comment Info
comment.addEventListener("input", (event) =>{
    const remaining = maxChars - comment.value.length;
    commentInfo.textContent = `${remaining} characters remaining`;
    setTimeout(() => {
        commentInfo.textContent = "";
    }, 2000);
    commentInfo.style.color = remaining <= 10 ? "red" : "black";
});

//Error log
const form_errors = [];
submitBtn.addEventListener("click", function (event) {
    document.querySelectorAll("input, textarea").forEach((field) => {
        if (!field.checkValidity()) {
            form_errors.push({ field: field.name, message: field.validationMessage });
        }
    });
    if (form_errors.length > 0) {
        errorField.value = JSON.stringify(form_errors);
    }
});


/*Dark Mode*/
const body = document.body;
const darkmodeToggle = document.getElementById("darkmodeToggle");
const darkmodeText = document.querySelector("label[for=darkmodeToggle]");
const theme = localStorage.getItem("theme");

if (theme){
    if (theme === "darkmode") {
        body.classList.replace('lightmode', 'darkmode');
        darkmodeText.textContent = 'Disable Dark Mode';
        darkmodeToggle.checked = true;
    } 
    else {
        body.classList.replace('darkmode', 'lightmode');
        darkmodeText.textContent = 'Enable Dark Mode';
        darkmodeToggle.checked = false;
    }
}

darkmodeToggle.addEventListener('change', function() {
    let newTheme = this.checked ? "darkmode" : "lightmode";
    localStorage.setItem("theme", newTheme);
    if (this.checked) {
        body.classList.replace('lightmode', 'darkmode');
        darkmodeText.textContent = 'Disable Dark Mode';
    } else {
        body.classList.replace('darkmode', 'lightmode');
        darkmodeText.textContent = 'Enable Dark Mode';
    }
});