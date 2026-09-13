// ==========================
// KAZIMATCH AUTHENTICATION
// ==========================

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

    message.textContent = "Connecting to KaziMatch...";


    try {

      const fullName =
        document.getElementById("fullName").value.trim();

      const email =
        document.getElementById("email").value.trim();

      const phone =
        document.getElementById("phone").value.trim();

      const password =
        document.getElementById("password").value;

      const role =
        document.getElementById("role").value;


      if (!fullName || !email || !phone || !password || !role) {

        message.textContent =
          "Please complete all fields.";

        return;
      }


      if (password.length < 6) {

        message.textContent =
          "Password must contain at least 6 characters.";

        return;
      }


      message.textContent =
        "Creating your KaziMatch account...";


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


      if (data.user) {

        message.textContent =
          "Account created successfully! Please check your email to verify your account.";

        registerForm.reset();

      } else {

        message.textContent =
          "Registration completed, but no user was returned.";

      }

    } catch (error) {

      message.textContent =
        "Unexpected error: " + error.message;

    }

  });

}



// ==========================
// LOGIN
// ==========================

const loginForm =
  document.getElementById("loginForm");


if (loginForm) {

  loginForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const message =
      document.getElementById("message");


    const email =
      document.getElementById("email").value.trim();


    const password =
      document.getElementById("password").value;


    message.textContent =
      "Logging in...";


    try {

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

        window.location.href =
          "index.html";

      }, 1000);


    } catch (error) {

      message.textContent =
        "Unexpected error: " + error.message;

    }

  });

}
