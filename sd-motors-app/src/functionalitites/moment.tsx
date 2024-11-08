function GetMonthName(monthNumber: number): string {
  let month: string = "";
  switch (monthNumber + 1) {
    case 1:
      month = "January";
      break;
    case 2:
      month = "February";
      break;
    case 3:
      month = "March";
      break;
    case 4:
      month = "April";
      break;
    case 5:
      month = "May";
      break;
    case 6:
      month = "June";
      break;
    case 7:
      month = "July";
      break;
    case 8:
      month = "August";
      break;
    case 9:
      month = "September";
      break;
    case 10:
      month = "October";
      break;
    case 11:
      month = "November";
      break;
    case 12:
      month = "December";
      break;
  }
  return month;
}

function GetDate(): string {
  const now = new Date();
  let year = now.getFullYear();
  let month: string = GetMonthName(now.getMonth());
  let day = now.getDate();

  return `${month} ${day}, ${year}`;
}

function GetDayName(): string {
  const now = new Date();
  return now.toLocaleDateString("en-US", { weekday: "long" });
}

function FormatSpecificDate(date: Date): string {
  let month = GetMonthName(date.getMonth());
  let dateNumber = date.getDate();
  let year = date.getFullYear();

  return `${month} ${dateNumber}, ${year}`;
}

export default { GetDate, GetDayName, FormatSpecificDate };
