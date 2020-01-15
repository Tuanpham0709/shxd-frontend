export interface PartnerInterface {
    key?: string;
    id?: string;
    code: string;
    name: string;
    projectCode: string;
    projectName: string;
    phone: string;
    email: string;
    address: string;
    room: string;
    manager: string;
    chairman: string;
    accountant: string;
    operation?: ``;
}
export interface StaffInterface {
    key?: string;
    id?: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    username: string;
    password: string;
    userType: string;
    identityNumber: string;
    dateOfBirth: string;
    relationshipStatus: string;
    level: string;
}
export interface ParamsContext {
    pages?: number[];
    loading?: boolean;
    partnerInfo?: PartnerInterface;
    staffInfo?: StaffInterface;
}