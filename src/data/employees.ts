import { Employee } from '../types/Employee';

export const employees: Employee[] = [
  {
    id: 'muhammad-tahir',
    name: 'MUHAMMAD TAHIR',
    title: 'Managing Director',
    company: 'Diplomat Properties',
    companyLogo: '/diplomat-logo.png',
    reraNumber: 'RERA ORN NO. 12544',
    phones: ['0097155 5151350', '0097150 5151350', '0044795 5151350', '0092334 5151350'],
    email: 'tahirbaig77@gmail.com',
    website: 'www.dpdxb.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=2',
    address: {
      street: 'P.O Box No.181702 Office No.807 Opal Tower Business Bay',
      city: 'Dubai',
      country: 'UAE'
    },
    theme: {
      primaryColor: '#dc2626',
      secondaryColor: '#991b1b'
    }
  }
];

export const getEmployeeById = (id: string): Employee | undefined => {
  return employees.find(emp => emp.id === id);
};