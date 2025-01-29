import Papa from 'papaparse';

export const exportToCSV = <T>(data: T[], fileName: string) => {
  if (!data.length) return;

  const csv = Papa.unparse(data, {
    quotes: true,
    delimiter: ',',
    header: true,
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${fileName}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
};
