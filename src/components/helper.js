const formatYearMonth = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 because getMonth() is zero-based
    const day = String(date.getDay() + 1).padStart(2, '0')
    return `${month}-${day}-${year}`;
  };



export default formatYearMonth