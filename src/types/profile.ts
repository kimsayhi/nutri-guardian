export enum Goal {
  WeightLoss = "weight_loss",
  BalancedDiet = "balanced_diet",
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface ProfileData {
  id: string;
  userId: string;
  name: string;
  schoolName: string;
  ATPT_OFCDC_SC_CODE: string;
  SD_SCHUL_CODE: string;
  weight: number;
  goal: Goal;
  gender: Gender;
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
  goal: Goal;
  gender: Gender;
  isDefault?: boolean;
}

export interface UpdateProfileData {
  id: string;
  name?: string;
  schoolName?: string;
  ATPT_OFCDC_SC_CODE?: string;
  SD_SCHUL_CODE?: string;
  weight?: number;
  goal?: Goal;
  gender?: Gender;
  isActive?: boolean;
  isDefault?: boolean;
}
