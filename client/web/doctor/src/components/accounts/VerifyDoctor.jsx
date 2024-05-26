import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StepCVForm from '../StepForms/StepCVForm';
import CurriculumVitae from '../StepForms/CurriculumVitae';
import Certificates from '../StepForms/Certificates';
import PracticingCertificate from '../StepForms/PracticingCertificate';
import Commitment from '../StepForms/Commitment';
import Information from '../StepForms/Information';

const VerifyDoctor = () => {
    const steps = [
        `Thông tin cơ bản`,
        `Đơn tham gia vào hệ thống`,
        'Sơ yếu lý lịch',
        'Văn bằng và chứng chỉ',
        'Chứng chỉ hành nghề',
        'Bản cam kết'
    ];

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const stepComponent = (step) => {
        if (step === 0) {
            return (
                <>
                    <Information />
                </>
            )
        }
        if (step === 1) {
            return (
                <>
                    <StepCVForm />
                </>
            )
        }
        else if (step === 2) {
            return (
                <>
                    <CurriculumVitae />
                </>
            )
        }
        else if (step === 3) {
            return (
                <>
                    <Certificates />
                </>
            )
        }
        else if (step === 4) {
            return (
                <>
                    <PracticingCertificate />
                </>
            )
        }
        else if (step === 5) {
            return (
                <>
                    <Commitment />
                </>
            )
        }
    }

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>
                {activeStep === steps.length ? (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Bạn đã hoàn tất nộp hồ sơ. Vui lòng kiểm tra email thường xuyên để nhận thông báo từ chúng tôi !
                        </Typography>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Bước {activeStep + 1}
                            {
                                stepComponent(activeStep)
                            }
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Trở lại
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />

                            <Button onClick={handleNext}>
                                {activeStep === steps.length - 1 ? 'Kết thúc' : 'Tiếp tục'}
                            </Button>
                        </Box>
                    </React.Fragment>
                )}
            </Box>
        </>
    );
};

export default VerifyDoctor;