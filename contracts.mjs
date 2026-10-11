export function rankRows(rows) {
  if (!Array.isArray(rows)) throw new TypeError("Expected rows");
  const seen = new Set();
  for (const row of rows) {
    if (!row || typeof row.id !== "string" ||
        !/^[A-Z0-9:_/-]+$/.test(row.id) ||
        !Number.isFinite(row.score) ||
        row.score < 0 || row.score > 100) {
      throw new TypeError("Invalid normalized row");
    }
    if (seen.has(row.id)) throw new Error("Duplicate row identity");
    seen.add(row.id);
  }
  return [...rows].sort((a, b) => {
    if (a.score !== b.score) return a.score > b.score ? -1 : 1;
    return a.id < b.id ? -1 : a.id > b.id ? 1 : 0;
  });
}

export function toMillimetres(value,unit){if(!Number.isFinite(value))return{status:'INVALID_NUMBER'};if(!['cm','mm'].includes(unit))return{status:'INVALID_UNIT'};if(value<0||value>1000000)return{status:'OUT_OF_RANGE'};return{status:'READY',input:{value,unit},value:value*(unit==='cm'?10:1),unit:'mm'};}
