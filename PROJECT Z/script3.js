function nextStep(step) {
  // Step 2 rule check
  if (step === 3) {
    const agree = document.getElementById("agree");
    if (!agree.checked) {
      alert("Please accept the community rules first.");
      return;
    }
  }

  // Hide all steps
  document.querySelectorAll(".step").forEach(s => {
    s.classList.remove("active");
  });

  // Show selected step
  document.getElementById("step" + step).classList.add("active");
}