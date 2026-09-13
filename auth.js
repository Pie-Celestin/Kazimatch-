import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


// ==========================
// KAZIMATCH SUPABASE
// ==========================

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================
// REGISTER
// ==========================

const registerForm =
  document.getElementById("registerForm");

if (registerForm) {

  registerForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();

      const message =
        document.getElementById("registerMessage");

      message.textContent =
        "Creating your KaziMatch account...";


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


      try {

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
            "Registration error: " +
            error.message;

          return;
        }


        if (!data.user) {

          message.textContent =
            "Account was not created.";

          return;
        }


        message.textContent =
          "Account created successfully! Please check your email to verify your account.";

        registerForm.reset();


      } catch (error) {

        message.textContent =
          "Connection error: " +
          error.message;

      }

    }
  );

}
