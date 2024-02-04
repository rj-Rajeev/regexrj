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

async function convertKaTeXToMarkdown() {
  const katexTable = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");
  function generateLineWithBars(bars) {
    let line = "|";
    for (let index = 0; index <= bars; index++) {
      line = line + "---|";
    }
    return line;
  }

  const tableContent = await katexTable
    .replace(/\\multirow{.*}/, "")
    .replace(/\\multicolumn{.*}/, "")
    .replace(/\\begin{tabular}{.*}/, "")
    .replace(/\\end{tabular}{.*}/, "")
    .replace(/\\hline/g, "")
    .replace(/&/g, "|");

  const tableRows = await tableContent.split("\\\\");
  const filterdRows = await tableRows.filter((item) => item.includes("|"));
  const tableMaker = generateLineWithBars(filterdRows[0].match(/\|/g).length);
  const finalRows = await filterdRows.map((item) => item.replace(/\n/g, ""));
  const tableFinalRows = finalRows.splice(1, 0, tableMaker);
  const finalMdTable = await finalRows.join("\n");
  // console.log(tableFinalRows);
  outputDiv.value = finalMdTable;
  // return finalMdTable;
}
