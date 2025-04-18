export interface MentorProfile {
  user: {
    USER_ID: string;
    firstName: string;
    lastName: string;
    salutation: string | null;
  };
  MT_CD: MT_CD | null;
  accountUserProfile: {
    avatar: string;
    introduce: string | null;
    slogan: string | null;
  };
}

interface MT_CD {
  uIDRef: string;
  uCFTs: string;
  iCBKs: string;
}

export interface MentorExperience {
  companyName: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface MentorActivity {
  img: string;
  description: string;
}

export interface MentorCertificate {
  certName: string;
  certFile: string;
  issuedBy: string;
  issuedDate: string;
  issuedEndDate: string;
}

export interface MentorExpertise {
  expertise: string;
  subExpertise: string;
}

export interface MentorDetailsProfile {
  user: {
    USER_ID: string;
    firstName: string;
    lastName: string;
    salutation: string | null;
    email: string;
    phoneNumber: string;
    gender: number;
    dob: string;
    status: string | null;
    activeDate: string;
  };
  MT_CD: {
    uIDRef: string;
    uCFTs: string;
    iCBKs: string;
  };
  accountUserProfile: {
    MT_ID: string;
    slogan: string | null;
    introduce: string | null;
    address: string | null;
    avatar: string;
    cvFile: string;
  };
}
