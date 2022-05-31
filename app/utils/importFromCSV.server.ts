import fs from 'fs';

export async function parseCSV() {
  let data = fs.readFileSync('app/data/export.csv').toString();
  let dataObj = {};

  // Parse rows
  let rows: any = data.split('\n');
  // Get rid of headers
  rows.shift();
  // Get cols and strip index
  rows = rows.map((row) =>
    row.split(',').filter((val, i) => {
      if (i === 0) return false;
      return true;
    })
  );
  // Parse int
  rows = rows.map((row) => {
    row[1] = parseInt(row[1]);
    return row;
  });

  // Convert to object.
  rows = rows.map((row) => {
    return { itemName: row[0], quantity: row[1] };
  });

  console.log('🚀 ~ parseCSV ~ rows', rows);

  return rows;
}
