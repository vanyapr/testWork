import {TCompany} from "@type/TCompany";

export type TUser = {
    id: number;
    email: string;
    name: string;
    phone: string;
    username: string;
    website: string;
    company: TCompany;
    address: any
};
