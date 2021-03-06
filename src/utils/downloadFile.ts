export const downloadXlsxFile = (data: string, name: string) => {
  try {
    const buffer = Buffer.from(data, 'base64');
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    link.remove();
  } catch (e) {
    console.log(e);
  }
};