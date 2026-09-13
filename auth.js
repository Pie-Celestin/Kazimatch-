const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================
// REGISTER
// ==========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = document.getElementById("registerMessage");

    message.textContent = "Creating your KaziMatch account...";

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;


    if (!role) {
      message.textContent = "Please select your account type.";
      return;
    }


    const { data, error } =
      await supabaseClient.auth.signUp({

        email: email,

        password: password,

        options: {
          data: {
            full_name: fullName,
            phone: phone,
            role: role
          }
        }

      });


    if (error) {

      message.textContent =
        "Registration failed: " + error.message;

      return;
    }


    message.textContent =
      "Account created successfully! Please check your email to confirm your account.";

    registerForm.reset();

  });

}



// ==========================
// LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

  loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const message = document.getElementById("message");

    const email =
      document.getElementById("email").value.trim();

    const password =
      document.getElementById("password").value;


    message.textContent = "Logging in...";


    const { data, error } =
      await supabaseClient.auth.signInWithPassword({

        email: email,

        password: password

      });


    if (error) {

      message.textContent =
        "Login failed: " + error.message;

      return;
    }


    message.textContent =
      "Login successful!";


    setTimeout(function () {

      window.location.href = "index.html";

    }, 1000);

  });

}
