import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


// ==========================================
// CHECK SUPABASE CONFIG
// ==========================================

if (
  !window.SUPABASE_URL ||
  !window.SUPABASE_KEY
) {
  console.error(
    "KaziMatch: Supabase configuration is missing."
  );
}


// ==========================================
// SUPABASE CONNECTION
// ==========================================

const supabaseClient = createClient(
  window.SUPABASE_URL,
  window.SUPABASE_KEY
);


// ==========================================
// PAGE READY
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    console.log(
      "KaziMatch Auth JS loaded successfully."
    );


    const registerForm =
      document.getElementById(
        "registerForm"
      );


    const message =
      document.getElementById(
        "registerMessage"
      );


    const registerButton =
      document.getElementById(
        "registerButton"
      );


    // ======================================
    // CHECK FORM
    // ======================================

    if (!registerForm) {

      console.error(
        "KaziMatch: registerForm not found."
      );

      return;
    }


    // ======================================
    // REGISTER
    // ======================================

    registerForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();


        message.textContent =
          "Creating your KaziMatch account...";


        registerButton.disabled = true;


        // ==================================
        // GET VALUES
        // ==================================

        const fullName =
          document
            .getElementById("fullName")
            .value
            .trim();


        const email =
          document
            .getElementById("email")
            .value
            .trim();


        const phone =
          document
            .getElementById("phone")
            .value
            .trim();


        const password =
          document
            .getElementById("password")
            .value;


        const role =
          document
            .getElementById("role")
            .value;


        // ==================================
        // VALIDATION
        // ==================================

        if (
          !fullName ||
          !email ||
          !phone ||
          !password ||
          !role
        ) {

          message.textContent =
            "Please complete all fields.";

          registerButton.disabled = false;

          return;
        }


        if (password.length < 6) {

          message.textContent =
            "Password must contain at least 6 characters.";

          registerButton.disabled = false;

          return;
        }


        // ==================================
        // SUPABASE SIGN UP
        // ==================================

        try {

          console.log(
            "Sending registration to Supabase..."
          );


          const {
            data,
            error
          } =
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


          // ================================
          // SUPABASE ERROR
          // ================================

          if (error) {

            console.error(
              "Supabase error:",
              error
            );


            message.textContent =
              "Registration error: " +
              error.message;


            registerButton.disabled = false;

            return;
          }


          // ================================
          // SUCCESS
          // ================================

          if (data && data.user) {

            message.textContent =
              "Account created successfully! Please check your email to verify your account.";


            console.log(
              "KaziMatch user created:",
              data.user
            );


            registerForm.reset();

          } else {

            message.textContent =
              "Registration finished, but no user was returned.";

          }


        } catch (error) {

          console.error(
            "KaziMatch connection error:",
            error
          );


          message.textContent =
            "Connection error: " +
            error.message;

        }


        registerButton.disabled = false;

      }

    );

  }
);
