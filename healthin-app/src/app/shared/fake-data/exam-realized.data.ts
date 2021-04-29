import { ExamRealized } from '../interfaces/exam-realized';

export const ExamRealizedData: ExamRealized[] =
[
  { id: '1', examId: '1', patientId: '1', askData: '2020-12-01', askDoctorId: '11',
    askDoctorName: 'Rudolph', liberationDate: '2020-12-16', liberationEmployeeId: '12', liberationEmployeeName: 'Albert',
    doData: '2021-01-01', doDoctorId: '13', doDoctorName: 'Marisa', contribution: 2000
  } as ExamRealized,
  { id: '2', examId: '2', patientId: '2', askData: '2020-12-01', askDoctorId: '11',
    askDoctorName: 'Rudolph', liberationDate: '2020-12-16', liberationEmployeeId: '12', liberationEmployeeName: 'Albert',
    doData: '2021-01-05', doDoctorId: '14', doDoctorName: 'Clare', contribution: 25000
  }  as ExamRealized,
  { id: '3', examId: '2', patientId: '1', askData: '2020-12-01', askDoctorId: '11',
    askDoctorName: 'Rudolph', liberationDate: '2020-12-16', liberationEmployeeId: '12',
    liberationEmployeeName: 'Albert', doData: '2021-01-05', doDoctorId: '14',
    doDoctorName: 'Clare'
  } as ExamRealized
];
