const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const registerForm = document.querySelector("form");

if (registerForm) {
  registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const fullName = registerForm.querySelector(
      'input[placeholder="Full Name"]'
    ).value;

    const email = registerForm.querySelector(
      'input[type="email"]'
    ).value;

    const phone = registerForm.querySelector(
      'input[type="tel"]'
    ).value;

    const password = registerForm.querySelector(
      'input[type="password"]'
    ).value;

    const role = registerForm.querySelector("select").value;

    if (!role) {
      alert("Please select your account type.");
      return;
    }

    const { data, error } = await supabaseClient.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: fullName,
          role: role,
          phone: phone
        }
      }
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert(
      "Account created successfully! Check your email to confirm your account."
    );

    registerForm.reset();
  });
}
