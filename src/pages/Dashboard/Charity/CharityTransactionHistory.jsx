import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/shared/Loader";
import { useAuth } from "../../../hooks/useAuth";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const CharityTransactionHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["charityTransactions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/transactions?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="overflow-x-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-primary">
        Transaction History
      </h2>

      {isLoading ? (
        <Loader></Loader>
      ) : transactions.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No transactions found.
        </div>
      ) : (
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Transaction ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={tx.transactionId}>
                <td>{index + 1}</td>
                <td className="text-sm">{tx.transactionId}</td>
                <td>${(tx.amount / 100).toFixed(2)}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${
                      tx.status === "Approved"
                        ? "badge-success"
                        : tx.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CharityTransactionHistory;
