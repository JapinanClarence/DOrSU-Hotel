import React, { useState, useEffect } from "react";
import Header from "@/components/nav/Header";
import Footer from "@/components/nav/Footer";
import apiClient from "@/api/axios";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TransactionCard from "@/components/transaction/TransactionCard";
import { formatDate } from "@/util/helpers";

const TransactionsPage = () => {
  const [loading, setLoading] = useState(true);
  const [transactionData, setTransactionData] = useState([]);
  const [currentTransaction, setCurrentCurrentTransaction] = useState("");
  const { token, userData } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const date = formatDate(Date.now());

  const fetchTransactions = async () => {
    try {
      const { data } = await apiClient.get(`/transactions`, {
        headers: {
          Authorization: token,
        },
      });

      if (data.success) {
        setTransactionData(data.data);
      } else {
        setTransactionData([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <div className="h-screen">
        <Header />
        <div className="px-10 md:px-40 py-10 bg-zinc-200">
          <h1 className="text-xl font-medium font-accent">Transactions</h1>
        </div>
        {transactionData.length > 0 ? (
          <div className="px-10 md:px-40 py-10 mb-20 flex  flex-col gap-4">
            {transactionData.map((data, index) => (
              <TransactionCard
                key={index}
                data={data}
                //   onClick={handleClick}
                //   onCheckOut={handleCheckOut}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-5 h-4/5 bg-zinc-50 px-40 py-20">
            <p className="text-zinc-400">No transactions found.</p>
            <Button
              className="rounded-none px-8 py-6  "
              onClick={() => navigate("/")}
            >
              <span>Return to homepage</span>
            </Button>
          </div>
        )}
        <div className="fixed bottom-0 left-0 w-full">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default TransactionsPage;
