function addPeriods() {
  const inputText = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");

  // Use regular expression to match number followed by a space
  const pattern = /^\d+\s+/gm;

  // /(\d+)\s/g;
  // Replace number followed by a space with the same number followed by a period
  const updatedText = inputText.replace(pattern, (match) =>
    match.replace(/\s+/gm, ". ")
  );

  // Display the updated text
  outputDiv.value = updatedText;
}
