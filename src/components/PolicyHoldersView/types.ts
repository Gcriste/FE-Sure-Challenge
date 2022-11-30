export interface PolicyHolderDataType {
  policyHolders: [
    {
      name: string;
      age: number;
      address: {
        line1: string;
        line2: string | undefined;
        city: string;
        state: string;
        postalCode: string;
      };
      phoneNumber: string;
      isPrimary: boolean;
    }
  ];
}

export interface AddressType {
  line1: string;
  line2: string | undefined;
  city: string;
  state: string;
  postalCode: string;
}

export interface RowType {
  key: string;
  value: string | number;
  hasTableDivider: boolean;
  index: number;
}
