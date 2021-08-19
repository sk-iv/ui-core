import React from 'react'
import Stepper, { Step, StepLabel, StepContent } from '@sivasifr/ui-core/Stepper'
import Button from '@sivasifr/ui-core/Button'

const steps = [
  {
    label: 'Введите адрес вашей электронной почты, мы отправим туда код подтверждения',
    content: 'email',
    optional: 'Дополнительная информация',
  },
  {
    label: 'Введите код подтверждения',
    content: 'code',
  },
]

export default () => {
  const [activeStep, setActiveStep] = React.useState(0)

  const handleStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }
  return (
    <Stepper activeStep={activeStep} className="w-96">
      {steps.map((item) => (
        <Step key={item.label}>
          <StepLabel optional={item.optional && <span>{item.optional}</span>}>
            {item.label}
          </StepLabel>
          <StepContent>
            <div>{item.content}</div>
            <div>
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleStep}
                >
                  {activeStep === steps.length - 1 ? 'Finish' : 'Продолжить'}
                </Button>
              </div>
            </div>
          </StepContent>
        </Step>
      ))}
    </Stepper>
  )
}
