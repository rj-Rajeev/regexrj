function addPeriods() {
  const inputText = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");

  const pattern = /^\d+\s+/gm;

  const updatedText = inputText.replace(pattern, (match) =>
    match.replace(/\s+/gm, ". ")
  );

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
    .replace(/\\multirow/g, "")
    .replace(/\\multicolumn/g, "")
    .replace(/\\begin{tabular}/g, "")
    .replace(/\\end{tabular}/g, "")
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


function createMdTable() {
  const tableData = document.getElementById("inputText").value;
  const outputDiv = document.getElementById("output");

  const lists = tableData.split("~~");

  const nonEmptyLists = lists.filter((list) => list.trim() !== "");

  const columns = nonEmptyLists.map((column) =>
    column.split(/\n|\r\n/).filter((item) => item.trim() !== "")
  );

  let markdownTable = "";

  if (columns.length > 1) {
    markdownTable = `| ${Array(columns.length)
      .fill("-")
      .join(" | ")} |\n|${Array(columns.length).fill("---").join("|")}|`;
  }

  console.log(markdownTable);
  let createTable = () => {
    for (let i = 0; i < Math.max(...columns.map((col) => col.length)); i++) {
      markdownTable += `\n| ${columns
        .map((col) => col[i] || "")
        .join(" | ")} |`;
    }
  };
  createTable();
  outputDiv.value = markdownTable;
}
