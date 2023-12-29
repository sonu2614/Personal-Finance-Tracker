import React, { useEffect, useState } from "react";
import Header from "../Components/Headers/Header";
import Cards from "../Components/Cards/Cards";
import AddExpenseModal from "../Components/Modals/AddExpenseModal";
import AddIncomeModal from "../Components/Modals/AddIncomeModal";
import { toast } from "react-toastify";
import {
  addDoc,
  collection,
  getDocs,
  query,
  deleteDoc,
} from "@firebase/firestore";
import { auth, db, doc } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
// import { deleteDoc } from 'firebase/firestore';
import TransctionsTable from "../Components/TransactionsTable/TransctionsTable";
import Charts from "../Components/Charts/Charts";
import NoTransactions from "../Components/NoTransactions/NoTransactions";
import { Modal } from "antd";

function Dashboard() {
  const [user] = useAuthState(auth);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [docId, setDocId] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);

  function showExpenseModal() {
    // console.log("show expence Model");
    setIsExpenseModalVisible(true);
  }

  function showIncomeModal() {
    // console.log("show Income Model");
    setIsIncomeModalVisible(true);
  }

  function handleExpenseCancel() {
    setIsExpenseModalVisible(false);
  }

  function handleIncomeCancel() {
    setIsIncomeModalVisible(false);
  }

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: values.date.format("DD-MM-YYYY"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transactions`),
        transaction
      );
      // console.log("Document written with ID: ", docRef);
      toast.success("Transaction Added!");
      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr); // when my transaction has updated then calculate function will be call
      calculateBalance();
      fetchTransactions();
    } catch (e) {
      // console.error("Error adding document: ", e);
      toast.error("Couldn't add transaction");
    }
  }

  useEffect(() => {
    // Get all doc from collection
    fetchTransactions();
  }, [user]);

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      // console.log(q);
      const querySnapshot = await getDocs(q);
      // console.log(querySnapshot);
      let transactionsArray = [];
      let docID = []; // store Every document ID that will help us to delet doc
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
        if (doc.id) {
          docID.push(doc.id);
        }
      });
      setDocId(docID);
      setTransactions(transactionsArray);
      // console.log("trac", transactionsArray);
      toast.success("Transactions Fetched!");
    }
    setLoading(false);
  }

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const calculateBalance = () => {
    let incomeTotal = 0;
    let expensesTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeTotal += transaction.amount;
      } else {
        expensesTotal += transaction.amount;
      }
    });

    setIncome(incomeTotal);
    setExpenses(expensesTotal);
    setCurrentBalance(incomeTotal - expensesTotal);
    // console.log(income,expenses,currentBalance)
  };

  // Reset doc

  const deletDoc = async (mydoc) => {
    console.log(mydoc);
    const docRef = doc(db, `users/${user.uid}/transactions`, mydoc); // Replace with your collection name and document ID
    try {
      await deleteDoc(docRef);
      fetchTransactions();
      console.log("Document successfully deleted.");
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  function reset() {
    docId.forEach((mydoc) => {
      deletDoc(mydoc);
    });
  }

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            income={income}
            expenses={expenses}
            currentBalance={currentBalance}
            reset={reset}
            showIncomeModal={showIncomeModal}
            showExpenseModal={showExpenseModal}
          />

          {transactions.length !== 0 ? (
            <Charts transactions={transactions} />
          ) : (
            <NoTransactions />
          )}

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />

          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <TransctionsTable
            transactions={transactions}
            addTransaction={addTransaction}
            fetchTransactions={fetchTransactions}
          />
        </>
      )}
    </div>
  );
}

export default Dashboard;
