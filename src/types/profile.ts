export interface ProfileData {
  id?: string;
  userId: string;
  name: string;
  schoolName: string;
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  weight: number;
  goal: "체중 감량" | "균형 식단";
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isDefault: boolean;
}

export interface CreateProfileData {
  name: string;
  schoolName: string;
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  weight: number;
  goal: "체중 감량" | "균형 식단";
  isDefault?: boolean;
}

export interface UpdateProfileData {
  id: string;
  name?: string;
  schoolName?: string;
  ATPT_OFCDC_SC_CODE?: string;
  SD_SCHUL_CODE?: string;
  weight?: number;
  goal?: "체중 감량" | "균형 식단";
  isActive?: boolean;
  isDefault?: boolean;
}
