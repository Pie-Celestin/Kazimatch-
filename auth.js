import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


// ========================================
// KAZIMATCH SUPABASE
// ========================================

const SUPABASE_URL =https://zfzlocesnzhdcdhbbtht.supabase.co/rest/v1/;

const SUPABASE_KEY =sb_publishable_AfXQlQ1dY4VpiVTGDEj0RA_1c2T9xni;


const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ========================================
// PAGE LOADED
// ========================================

console.log("KaziMatch Auth JS loaded");


// ========================================
// GET REGISTER FORM
// ========================================

const form = document.getElementById("registerForm");

const message = document.getElementById("registerMessage");

const button = document.getElementById("registerButton");


if (!form) {

  console.error("Register form was not found.");

} else {

  console.log("Register form found.");


  // ======================================
  // REGISTER
  // ======================================

  form.addEventListener("submit", async function(event) {

    event.preventDefault();

    console.log("Register button clicked");


    message.textContent =
      "Creating your KaziMatch account...";


    button.disabled = true;


    // ====================================
    // GET VALUES
    // ====================================

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


    // ====================================
    // VALIDATION
    // ====================================

    if (
      fullName === "" ||
      email === "" ||
      phone === "" ||
      password === "" ||
      role === ""
    ) {

      message.textContent =
        "Please complete all fields.";

      button.disabled = false;

      return;
    }


    if (password.length < 6) {

      message.textContent =
        "Password must contain at least 6 characters.";

      button.disabled = false;

      return;
    }


    // ====================================
    // CREATE ACCOUNT
    // ====================================

    try {

      console.log("Connecting to Supabase...");


      const result =
        await supabase.auth.signUp({

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


      console.log("Supabase response:", result);


      // ==================================
      // ERROR
      // ==================================

      if (result.error) {

        message.textContent =
          "Registration error: " +
          result.error.message;

        console.error(
          "Supabase error:",
          result.error
        );

        button.disabled = false;

        return;
      }


      // ==================================
      // SUCCESS
      // ==================================

      if (result.data && result.data.user) {

        message.textContent =
          "Account created successfully! Check your email to verify your account.";

        form.reset();

      } else {

        message.textContent =
          "Registration completed. Please check your email.";

      }


      button.disabled = false;


    } catch (error) {

      console.error(
        "Unexpected error:",
        error
      );


      message.textContent =
        "Connection error: " +
        error.message;


      button.disabled = false;

    }

  });

}
