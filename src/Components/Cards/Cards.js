import React from 'react'
import "./card.css";
import {Card, Row } from 'antd';
import Button from '../Button/Button';


function Cards({income, expenses, currentBalance, reset, showIncomeModal,showExpenseModal}) {
  return (
    <div>
        <Row className='my_row'>
            <Card className='my_card'>
                <h2>Current Balance</h2>
                <p>₹{currentBalance}</p>
                <Button text="Reset Balance" blue={true} onClick={reset}/>
            </Card> 
            <Card className='my_card'>
                <h2>Total Income</h2>
                <p>₹{income}</p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card> 
            <Card className='my_card'>
                <h2>Total Expenses</h2>
                <p>₹{expenses}</p>
                <Button text="Add Expenses" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards