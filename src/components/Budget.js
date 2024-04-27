import React, { useContext, useState } from 'react';
import { AppContext  }  from '../context/AppContext';

const Budget = () => {
    const { dispatch, remaining ,currency} = useContext(AppContext);
    const { budget } = useContext(AppContext);
    const [newBudget, setNewBudget] = useState(budget);
    const { expenses } = useContext(AppContext);
    const totalExpenses = expenses.reduce((total, item) => {
        return (total += item.cost);
    }, 0);
    const upperLimitValue = 20000
    const lowerLimitValue= totalExpenses

    const handleBudgetChange = (e) => {
        setNewBudget(e.target.value);
    }
    const handleKeyDown = (e) => {
        if ( e.key === 'Enter' && newBudget <= upperLimitValue && newBudget >= lowerLimitValue) {
          dispatch({ type: "SET_BUDGET", payload: newBudget });
        }else if (newBudget > upperLimitValue) {
            alert("The value cannot exceed remaining funds  £"+remaining);   
        }
        else if (newBudget < lowerLimitValue)
        {
            alert("You cannot reduce the budget lower than the spending");
        }
      };
      

    return (
        <div className="alert alert-secondary ">
            <label>Budget: {currency}</label>
            <input
                className='w-50 ms-1'
                required
                type="number"
                id="cost"
                step={10}
                value={newBudget}
                onChange={handleBudgetChange}
                onKeyDown={handleKeyDown}
            />
    </div>

    );
};
export default Budget;