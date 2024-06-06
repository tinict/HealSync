export enum Gender {
    male = 1,
    female = 2,
    other = 3
};

export enum StatusAppointment {
    pending = 1,
    done = 2,
    cancel = 3,
    processing_calendar = 4,
    examining = 5,
    notcome = 6,
    failure = 7,
    scheduling = 8
};

export enum ReExaminationSchedule {
    pending = 1,
    examined = 2,
    cancel = 3,
    notcome = 4,
    processing_calendar = 5,
    examining = 6
};

export enum RefundStatus {
    pending = 1,
    refunded = 2,
    processing = 3, 
    failed = 4 
};

export enum TypeSchedule {
    offline = 1,
    online = 2,
    lock = 3
};