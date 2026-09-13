// ==========================
// KAZIMATCH AUTH SYSTEM
// ==========================

let supabaseClient = null;


// ==========================
// CONNECT TO SUPABASE
// ==========================

try {

  if (
    typeof SUPABASE_URL === "undefined" ||
    typeof SUPABASE_KEY === "undefined"
  ) {
    throw new Error(
      "Supabase configuration was not found."
    );
  }

  if (
    !SUPABASE_URL ||
    !SUPABASE_KEY
  ) {
    throw new Error(
      "Supabase URL or Publishable Key is empty."
    );
  }

  supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

} catch (error) {

  console.error(error);

  const registerMessage =
    document.getElementById("registerMessage");

  if (registerMessage) {
    registerMessage.textContent =
      "KaziMatch connection error: " +
      error.message;
  }
}



// ==========================
// REGISTER
// ==========================

const registerForm =
  document.getElementById("registerForm");


if (registerForm && supabaseClient) {

  registerForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const message =
        document.getElementById(
          "registerMessage"
        );


      message.textContent =
        "Connecting to KaziMatch...";


      const fullName =
        document.getElementById(
          "fullName"
        ).value.trim();


      const email =
        document.getElementById(
          "email"
        ).value.trim();


      const phone =
        document.getElementById(
          "phone"
        ).value.trim();


      const password =
        document.getElementById(
          "password"
        ).value;


      const role =
        document.getElementById(
          "role"
        ).value;


      if (
        !fullName ||
        !email ||
        !phone ||
        !password ||
        !role
      ) {

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
        "Creating your account...";


      try {

        const result =
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


        const data = result.data;
        const error = result.error;


        if (error) {

          message.textContent =
            "Registration error: " +
            error.message;

          return;
        }


        if (!data || !data.user) {

          message.textContent =
            "Registration did not create a user. Please try again.";

          return;
        }


        message.textContent =
          "Account created successfully! Check your email to verify your account.";


        registerForm.reset();


      } catch (error) {

        message.textContent =
          "Unexpected error: " +
          error.message;

      }

    }
  );

}



// ==========================
// LOGIN
// ==========================

const loginForm =
  document.getElementById("loginForm");


if (loginForm && supabaseClient) {

  loginForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();


      const message =
        document.getElementById(
          "message"
        );


      const email =
        document.getElementById(
          "email"
        ).value.trim();


      const password =
        document.getElementById(
          "password"
        ).value;


      message.textContent =
        "Logging in...";


      try {

        const result =
          await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

          });


        const data = result.data;
        const error = result.error;


        if (error) {

          message.textContent =
            "Login error: " +
            error.message;

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
          "Unexpected error: " +
          error.message;

      }

    }
  );

}
