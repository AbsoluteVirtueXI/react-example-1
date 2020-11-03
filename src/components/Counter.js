import React, { useState } from 'react'
import {
  Button,
  Text,
  HStack,
  VStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/core'

function Counter() {
  const [counter, setCounter] = useState(0)
  const [step, setStep] = useState(1)
  const toast = useToast()

  const handleIncrement = (step) => {
    const cnt = counter + step
    setCounter(counter + step)
    toast({
      position: 'bottom-left',
      title: `Counter incremented by ${step}`,
      description: `Counter is now ${cnt}`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }
  const handleDecrement = (step) => {
    const cnt = counter - step
    setCounter(counter - step)
    toast({
      position: 'bottom-right',
      title: `Counter decremented by ${step}`,
      description: `Counter is now ${cnt}`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }
  const handleStepChange = (step) => {
    if (!isNaN(step)) {
      setStep(Math.floor(Number(step)))
    }
  }

  const handleReset = () => {
    setCounter(0)
    setStep(1)
    toast({
      title: `Counter reseted to 0`,
      description: `Counter is now 0`,
      status: 'success',
      duration: 1000,
      isClosable: true,
    })
  }

  return (
    <VStack>
      <Text>counter: {counter}</Text>
      <NumberInput
        value={step}
        defaultValue={1}
        min={1}
        onChange={handleStepChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <HStack>
        <Button onClick={() => handleIncrement(step)}>increment</Button>
        <Button onClick={() => handleDecrement(step)}>decrement</Button>
      </HStack>
      <Button onClick={handleReset}>reset</Button>
    </VStack>
  )
}

export default Counter
