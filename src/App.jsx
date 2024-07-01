import { useEffect, useState } from "react";

function App() {

  // Capitalize the first character of a string
  function capitalizeFirstChar(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  // Convert date to format "MMM DD"
  function convertDate(date) {
    var dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US' ,{ month: 'short', day: 'numeric'});
  }

  const [expenseRows, setExpense] = useState();

  // Fetch data from the API
  async function getExpensesData() {
    try {
      const response = await fetch("https://expenses-backend-mu.vercel.app/expenses", {
        headers: {
          "Content-Type": "application/json",
          Username: "yuetkee.liu"
        }
      });
      const data = await response.json();

      var dataRows = [];
      for (var i = 0; i < data.length; i++) {
        dataRows.push(
          <tr>
            <td>{convertDate(data[i]["date"])}</td>
            <td>{data[i]["merchant"]}</td>
            <td>£{data[i]["amount"]}</td>
            <td>{capitalizeFirstChar(data[i]["category"])}</td>
            <td>{data[i]["description"]}</td>
            <td>{capitalizeFirstChar(data[i]["status"])}</td>
          </tr>
        )
      };
      setExpense(dataRows);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    getExpensesData();
  }, []);

  return (
    <div id="template-text">
      <h1 style={{ paddingLeft:'2%' }}>Expenses</h1>
      <hr/>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Merchant</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          { expenseRows }
        </tbody>
      </table>
    </div>
  );
}

export default App;
