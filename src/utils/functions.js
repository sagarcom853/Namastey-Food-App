export const formatDateTime = (dateTime) => {
  if (!dateTime) return "unpaid";
  const dateTimeArray = dateTime?.split("T");
  const date = dateTimeArray[0];
  const mm = (new Date(date).getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
  const dd = new Date(date).getDate().toString().padStart(2, "0");
  const yyyy = new Date(date).getFullYear();
  const formattedDate = `${dd}-${mm}-${yyyy}`;
  return formattedDate;
};
