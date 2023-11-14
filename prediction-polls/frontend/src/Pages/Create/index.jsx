import React from 'react'
import Menu from '../../Components/Menu'
import styles from './Create.module.css'
import { useState } from 'react';
import { Button, Input, DatePicker, Checkbox, Select } from 'antd';

const { TextArea } = Input;
const { Option } = Select;
function Create() {
  const [question, setQuestion] = useState('');
  const [pollType, setPollType] = useState('');
  const [showMultipleChoiceInputs, setShowMultipleChoiceInputs] = useState(false);
  const [additionalChoices, setAdditionalChoices] = useState(['']);
  const [customizedType, setCustomizedType] = useState('text');
  const [customizedOptions, setCustomizedOptions] = useState(['']);
  const [selectedDate, setSelectedDate] = useState(null); 
  const [setDueDate, setSetDueDate] = useState(false);
  const [dueDatePoll, setDueDatePoll] = useState(null);
  const [numericFieldValue, setNumericFieldValue] = useState('');
  const [selectedTimeUnit, setSelectedTimeUnit] = useState('min');
  const [openVisibility, setOpenVisibility] = useState(false);

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

  const handleSubmit = () => {
    // Additional logic will be added
  };

  return (
    <div className={styles.page}>
      <Menu mode="horizontal" defaultSelectedKeys={['create']}>
        <Menu.Item key="create">Create</Menu.Item>
      </Menu>
      <div className={styles.createContainer}>
        <h1>Create Poll</h1>
        <div className={styles.questionContainer}>
          <label htmlFor="question">Enter the question title:</label>
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
          <p>Select the type of the poll:</p>
          <Button
            type={pollType === 'multipleChoice' ? 'primary' : 'default'}
            onClick={() => handlePollTypeChange('multipleChoice')}
            style={{ marginRight: '8px' }}
          >
            Multiple Choice
          </Button>
          <Button
            type={pollType === 'customized' ? 'primary' : 'default'}
            onClick={() => handlePollTypeChange('customized')}
          >
            Customized
          </Button>
        </div>
        {showMultipleChoiceInputs && (
          <div className={styles.multipleChoiceInputs}>
            {additionalChoices.map((choice, index) => (
              <div key={index} className={styles.choiceInput}>
                <Input
                  placeholder={`Choice ${index + 1}`}
                  style={{ width: '50%' }}
                  value={choice}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                />
                <Button onClick={() => handleDeleteChoice(index)}>
                  Delete
                </Button>
              </div>
            ))}
            <Button onClick={handleAddChoice}>Add Choice</Button>
          </div>
        )}
        {pollType === 'customized' && (
          <div className={styles.customizedOptions}>
            <Button
              type={customizedType === 'date' ? 'primary' : 'default'}
              onClick={() => handleCustomizedTypeChange('date')}
              style={{ marginRight: '8px' }}
            >
              Date
            </Button>
            <Button
              type={customizedType === 'numeric' ? 'primary' : 'default'}
              onClick={() => handleCustomizedTypeChange('numeric')}
            >
              Numeric
            </Button>
            {customizedType === 'date' && (
              <div className={styles.datePickerContainer}>
                <DatePicker onChange={handleDateChange} />
              </div>
            )}
            {customizedType === 'numeric' && (
              <div className={styles.numericInputContainer}>
                <Input
                  type="number"
                  placeholder="Enter numeric answer"
                  style={{ width: '50%' }}
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
          placeholder="Enter a number"
          className={styles.timeInput}
          value={numericFieldValue}
          onChange={(e) => setNumericFieldValue(e.target.value)}
        />
                <Select
                  defaultValue="min"
                  style={{ width: 80 }}
                  onChange={(value) => setSelectedTimeUnit(value)}
                >
                  <Option value="min">min</Option>
                  <Option value="h">h</Option>
                  <Option value="day">day</Option>
                  <Option value="mth">mth</Option>
                </Select>
              </div>
            </>
          )}
        </div>
        <div className={styles.openVisibilityContainer}>
          <Checkbox onChange={handleOpenVisibilityChange}>Open Distribution Visibility</Checkbox>
        </div>
        <div className={styles.submitContainer}>
          <Button
            type="primary"
            onClick={handleSubmit}
            style={{ width: '40%' }}
          >
            Create Poll
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Create;
