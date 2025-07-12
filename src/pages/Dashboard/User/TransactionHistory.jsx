import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const TransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [] } = useQuery({
    queryKey: ["transactions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      <table className="table w-full">
        <thead>
          <tr>
            <th>Txn ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Purpose</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.transactionId}</td>
              <td>${(txn.amount / 100).toFixed(2)}</td>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>{txn.purpose}</td>
              <td>{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
