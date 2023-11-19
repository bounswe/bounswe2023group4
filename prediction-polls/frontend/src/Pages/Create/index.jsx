import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Create.module.css'
import { useState } from 'react';
import { Button, Input, DatePicker, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

function Create() {
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('');
  const [showMultipleChoiceInputs, setShowMultipleChoiceInputs] = useState(false);
  const [additionalChoices, setAdditionalChoices] = useState(['']);
  const [customizedType, setCustomizedType] = useState('text');
  const [selectedDate, setSelectedDate] = useState(null);
  const [customizedNumeric, setCustomizedNumeric] = useState('');
  const [setDueDate, setSetDueDate] = useState(false);
  const [dueDatePoll, setDueDatePoll] = useState(null);
  const [numericFieldValue, setNumericFieldValue] = useState('');
  const [selectedTimeUnit, setSelectedTimeUnit] = useState('min');
  const [openVisibility, setOpenVisibility] = useState(false);
  const url = process.env.REACT_APP_BACKEND_LINK; 
  const navigate = useNavigate()

  const handleOpenVisibilityChange = (e) => {
    setOpenVisibility(e.target.checked);
  };

  const handleDueDatePollChange = (date) => {
    setDueDatePoll(date);
  };

  const handleSetDueDateChange = (e) => {
    setSetDueDate(e.target.checked);
  };

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handlePollTypeChange = (type) => {
    setPollType(type);
    setShowMultipleChoiceInputs(type === 'multipleChoice');
    setSelectedDate(null);
  };

  const handleAddChoice = () => {
    setAdditionalChoices([...additionalChoices, '']);
  };

  const handleDeleteChoice = (index) => {
    const updatedChoices = [...additionalChoices];
    updatedChoices.splice(index, 1);
    setAdditionalChoices(updatedChoices);
  };

  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...additionalChoices];
    updatedChoices[index] = value;
    setAdditionalChoices(updatedChoices);
  };

  const handleCustomizedTypeChange = (type) => {
    setCustomizedType(type);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  const handleSubmit = async () => {

    if (pollType === 'multipleChoice' && setDueDate) {
      const choicesData = additionalChoices.filter(choice => choice.trim() !== ''); // Remove empty choices
      const multipleChoiceData = {
        question: question,
        openVisibility: openVisibility,
        choices: choicesData,
        setDueDate: setDueDate,
        dueDatePoll: dueDatePoll ? dueDatePoll.format() : null, // Convert dueDatePoll to a string format if it exists
        numericFieldValue: numericFieldValue,
        selectedTimeUnit: selectedTimeUnit,
      };

      try {
        const response = await fetch(url + "/polls/discrete/", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
            
          },
          body: JSON.stringify(multipleChoiceData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }

    } else if (pollType === 'multipleChoice' && !setDueDate) {
      const choicesData = additionalChoices.filter(choice => choice.trim() !== ''); // Remove empty choices
      const multipleChoiceData = {
        question: question,
        openVisibility: openVisibility,
        choices: choicesData,
        setDueDate: setDueDate,
      };

      try {
        const response = await fetch(url + "/polls/discrete/", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
          },
          body: JSON.stringify(multipleChoiceData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }

    } else if (pollType === 'customized' && setDueDate && customizedType === 'date') {

      const customizedData = {
        question: question,
        selectedDate: selectedDate ? selectedDate.format() : null, // Convert selectedDate to a string format if it exists
        setDueDate: setDueDate,
        dueDatePoll: dueDatePoll ? dueDatePoll.format() : null, // Convert dueDatePoll to a string format if it exists
        numericFieldValue: numericFieldValue,
        selectedTimeUnit: selectedTimeUnit,
      };

      try {
        const response = await fetch(url + "/polls/continuous/", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
          },
          body: JSON.stringify(customizedData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }

    } else if (pollType === 'customized' && !setDueDate && customizedType === 'date') {

      const customizedData = {
        question: question,
        selectedDate: selectedDate ? selectedDate.format() : null, // Convert selectedDate to a string format if it exists
        setDueDate: setDueDate,
      };

      try {
        const response = await fetch(url + "/polls/continuous/", {  
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
          },
          body: JSON.stringify(customizedData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }

    } else if (pollType === 'customized' && setDueDate && customizedType === 'numeric') {

      const customizedData = {
        question: question,
        customizedNumeric: customizedNumeric,
        setDueDate: setDueDate,
        dueDatePoll: dueDatePoll ? dueDatePoll.format() : null, // Convert dueDatePoll to a string format if it exists
        numericFieldValue: numericFieldValue,
        selectedTimeUnit: selectedTimeUnit,
      };

      try {
        const response = await fetch(url + "/polls/continuous/", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
          },
          body: JSON.stringify(customizedData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }

    } else if (pollType === 'customized' && !setDueDate && customizedType === 'numeric') {

      const customizedData = {
        question: question,
        customizedNumeric: customizedNumeric,
        setDueDate: setDueDate,
      };

      try {
        const response = await fetch(url + "/polls/continuous/", { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,  
          },
          body: JSON.stringify(customizedData),
        });
        if (!response.ok) {
          console.error('Error:', response.statusText);
          return;
        }
        const responseData = await response.json();
        console.log('API Response:', responseData);
        // Redirect or navigate to another page after successful API request
        navigate('/feed');
      } catch (error) {
        console.error('API Request Failed:', error.message);
      }
    }

  };



  return (
    <div className={styles.page}>
      <Menu mode="horizontal" defaultSelectedKeys={['create']}>
        <Menu.Item key="create">Create</Menu.Item>
      </Menu>
      <div className={styles.createContainer}>
        <div className={styles.questionContainer}>
          <label htmlFor="question">Enter the question title</label>
          <br />
          <br />
          <TextArea
            rows={1}
            autoSize={{ minRows: 1, maxRows: 3 }}
            style={{ width: '50%' }}
            id="question"
            value={question}
            onChange={handleQuestionChange}
          />
        </div>
        <div className={styles.pollTypeContainer}>
          <p>Choose input type</p>
          <Button
            className={styles.optButton}
            type={pollType === 'multipleChoice' ? 'primary' : 'default'}
            onClick={() => handlePollTypeChange('multipleChoice')}
            style={{ marginRight: '8px', backgroundColor: pollType === 'multipleChoice' ? 'var(--secondary-500)' : 'var(--secondary-300)' }}
          >
            Multiple Choice
          </Button>
          <Button
            className={styles.optButton}
            type={pollType === 'customized' ? 'primary' : 'default'}
            onClick={() => handlePollTypeChange('customized')}
            style={{ marginRight: '8px', backgroundColor: pollType === 'customized' ? 'var(--secondary-500)' : 'var(--secondary-300)' }}
          >
            Customized
          </Button>
        </div>
        {showMultipleChoiceInputs && (
          <>
            <div className={styles.multipleChoiceInputs}>
              {additionalChoices.map((choice, index) => (
                <div key={index} className={styles.choiceInput}>
                  <Input
                    className={styles.choiceInput}
                    placeholder={`Choice ${index + 1}`}
                    style={{ width: '50%' }}
                    value={choice}
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                  <Button className={styles.submitButton} onClick={() => handleDeleteChoice(index)}>
                    Delete
                  </Button>
                </div>

              ))}
              <Button className={styles.submitButton} onClick={handleAddChoice}>+ Add</Button>
            </div>
            <div className={styles.openVisibilityContainer}>
              <Checkbox className={styles.openVisibility} onChange={handleOpenVisibilityChange}>
                Open Distribution Visibility
              </Checkbox>
            </div>
          </>
        )}
        {pollType === 'customized' && (
          <div className={styles.customizedOptions}>
            <Button
              className={styles.optButton}
              type={customizedType === 'date' ? 'primary' : 'default'}
              onClick={() => handleCustomizedTypeChange('date')}
              style={{ marginRight: '8px', backgroundColor: customizedType === 'date' ? 'var(--secondary-500)' : 'var(--secondary-300)' }}
            >
              Date
            </Button>
            <Button
              className={styles.optButton}
              type={customizedType === 'numeric' ? 'primary' : 'default'}
              onClick={() => handleCustomizedTypeChange('numeric')}
              style={{ marginRight: '8px', backgroundColor: customizedType === 'numeric' ? 'var(--secondary-500)' : 'var(--secondary-300)' }}
            >
              Numeric
            </Button>
            {customizedType === 'date' && (
              <div className={styles.datePickerContainer}>
                <DatePicker onChange={handleDateChange} />
              </div>
            )}
            {customizedType === 'numeric' && (
              <div className={styles.numericInputContainer} >
                <Input
                  style={{ width: '50%' }}
                  type="number"
                  placeholder="Enter numeric answer"
                  onChange={(e) => setCustomizedNumeric(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
        <div className={styles.setDueDateContainer}>
          <Checkbox onChange={handleSetDueDateChange}>Set Due Date</Checkbox>
          {setDueDate && (
            <>
              <div className={styles.dueDatePollInputContainer}>
                <DatePicker onChange={handleDueDatePollChange} />
              </div>
              <div className={styles.dateOptionsContainer}>
                <p>Do not accept any votes in last:</p>
                <Input
                  type="number"
                  placeholder="Number"
                  className={styles.timeInput}
                  value={numericFieldValue}
                  onChange={(e) => setNumericFieldValue(e.target.value)}
                />
                <Select
                  className={styles.customSelect}
                  defaultValue="min"
                  onChange={(value) => setSelectedTimeUnit(value)}
                >
                  <Option value="min">min </Option>
                  <Option value="h">h</Option>
                  <Option value="day">day</Option>
                  <Option value="mth">mth</Option>
                </Select>
              </div>
            </>
          )}
        </div>
        <div className={styles.submitContainer}>
          <Button
            className={styles.submitButton}
            onClick={handleSubmit}>
            Create Poll
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Create;
