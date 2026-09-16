import { createClient } from
"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";


// ==========================================
// KAZIMATCH - SUPABASE CONNECTION
// ==========================================

const SUPABASE_URL = https://zfzlocesnzhdcdhbbtht.supabase.co/rest/v1/;
const SUPABASE_KEY =sb_publishable_AfXQlQ1dY4VpiVTGDEj0RA_1c2T9xni ;

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


// ==========================================
// REGISTER
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  console.log("KaziMatch Auth JS is working");


  const registerForm =
    document.getElementById("registerForm");


  if (!registerForm) {

    console.error(
      "KaziMatch error: registerForm was not found."
    );

    return;
  }


  // Find existing message area
  let message =
    document.getElementById("registerMessage");


  // Create message area if it does not exist
  if (!message) {

    message =
      document.createElement("div");

    message.id = "registerMessage";

    message.style.marginTop = "15px";

    message.style.padding = "10px";

    registerForm.appendChild(message);
  }


  // ========================================
  // SUBMIT
  // ========================================

  registerForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();

      console.log(
        "KaziMatch: Register button clicked"
      );


      message.textContent =
        "Creating your KaziMatch account...";


      // ======================================
      // GET FORM VALUES
      // ======================================

      const fullName =
        document.getElementById("fullName")
          ?.value.trim() || "";


      const email =
        document.getElementById("email")
          ?.value.trim() || "";


      const phone =
        document.getElementById("phone")
          ?.value.trim() || "";


      const password =
        document.getElementById("password")
          ?.value || "";


      const role =
        document.getElementById("role")
          ?.value || "";


      console.log("Register data:", {
        fullName,
        email,
        phone,
        role
      });


      // ======================================
      // VALIDATION
      // ======================================

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


      // ======================================
      // SUPABASE SIGN UP
      // ======================================

      try {

        console.log(
          "Connecting to Supabase..."
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


        // ====================================
        // ERROR
        // ====================================

        if (error) {

          console.error(
            "Supabase registration error:",
            error
          );

          message.textContent =
            "Registration error: " +
            error.message;

          return;
        }


        // ====================================
        // SUCCESS
        // ====================================

        if (data && data.user) {

          console.log(
            "KaziMatch account created:",
            data.user
          );


          message.textContent =
            "Account created successfully! Please check your email to verify your account.";


          registerForm.reset();

          return;
        }


        // ====================================
        // NO USER
        // ====================================

        message.textContent =
          "Registration completed, but no user was returned. Please check your Supabase settings.";


      } catch (error) {

        console.error(
          "KaziMatch connection error:",
          error
        );


        message.textContent =
          "Connection error: " +
          error.message;
      }

    }
  );

});
