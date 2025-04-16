"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { CreateProfileData, ProfileData, UpdateProfileData } from "@/types/profile";

/**
 * 사용자의 모든 프로필을 조회합니다.
 */
export async function getProfiles(): Promise<ProfileData[]> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("프로필 조회 오류:", error);
    throw new Error("프로필을 조회하는 중 오류가 발생했습니다.");
  }

  const data: ProfileData[] = profiles.map((item) => ({
    id: item.id,
    userId: item.user_id,
    name: item.name,
    schoolName: item.school_name,
    ATPT_OFCDC_SC_CODE: item.atpt_ofcdc_sc_code,
    SD_SCHUL_CODE: item.sd_schul_code,
    weight: item.weight,
    goal: item.goal,
    gender: item.gender,
    createdAt: item.created_at,
    updatedAt: item.updated_at,
    isActive: item.is_active,
    isDefault: item.is_default,
  }));

  return data;
}

/**
 * 특정 프로필을 조회합니다.
 */
export async function getProfile(profileId: string): Promise<ProfileData | null> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", profileId)
    .eq("user_id", user.user.id)
    .eq("is_active", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      return null; // 데이터가 없는 경우
    }
    console.error("프로필 조회 오류:", error);
    throw new Error("프로필을 조회하는 중 오류가 발생했습니다.");
  }

  // 컬럼명을 camelCase로 변환
  const data: ProfileData = {
    id: profile.id,
    userId: profile.user_id,
    name: profile.name,
    schoolName: profile.school_name,
    ATPT_OFCDC_SC_CODE: profile.atpt_ofcdc_sc_code,
    SD_SCHUL_CODE: profile.sd_schul_code,
    weight: profile.weight,
    goal: profile.goal,
    gender: profile.gender,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
    isActive: profile.is_active,
    isDefault: profile.is_default,
  };

  return data;
}

export async function createProfile(profileData: CreateProfileData): Promise<ProfileData> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  // 대표 프로필로 설정할 경우, 기존 대표 프로필을 해제
  if (profileData.isDefault) {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ is_default: false })
      .eq("user_id", user.user.id)
      .eq("is_default", true);

    if (updateError) {
      console.error("기존 대표 프로필 업데이트 오류:", updateError);
    }
  }

  // 처음 만드는 프로필이면 자동으로 대표 프로필로 설정
  const { count } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.user.id)
    .eq("is_active", true);

  const isFirstProfile = count === 0;
  const shouldBeDefault = isFirstProfile || profileData.isDefault;

  const newProfile = {
    user_id: user.user.id,
    name: profileData.name,
    school_name: profileData.schoolName,
    atpt_ofcdc_sc_code: profileData.ATPT_OFCDC_SC_CODE,
    sd_schul_code: profileData.SD_SCHUL_CODE,
    weight: profileData.weight,
    goal: profileData.goal,
    gender: profileData.gender,
    is_active: true,
    is_default: shouldBeDefault,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  const { data: createdProfile, error } = await supabase
    .from("profiles")
    .insert([newProfile])
    .select()
    .single();

  if (error) {
    console.error("프로필 생성 오류:", error);
    throw new Error("프로필을 생성하는 중 오류가 발생했습니다.");
  }

  // 컬럼명을 camelCase로 변환
  const data: ProfileData = {
    id: createdProfile.id,
    userId: createdProfile.user_id,
    name: createdProfile.name,
    schoolName: createdProfile.school_name,
    ATPT_OFCDC_SC_CODE: createdProfile.atpt_ofcdc_sc_code,
    SD_SCHUL_CODE: createdProfile.sd_schul_code,
    weight: createdProfile.weight,
    goal: createdProfile.goal,
    gender: createdProfile.gender,
    createdAt: createdProfile.created_at,
    updatedAt: createdProfile.updated_at,
    isActive: createdProfile.is_active,
    isDefault: createdProfile.is_default,
  };

  revalidatePath("/main");
  return data;
}

/**
 * 프로필을 수정합니다.
 */
export async function updateProfile(profileData: UpdateProfileData): Promise<ProfileData> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", profileData.id)
    .eq("user_id", user.user.id)
    .single();

  if (fetchError) {
    console.error("프로필 조회 오류:", fetchError);
    throw new Error("프로필을 찾을 수 없습니다.");
  }

  // 대표 프로필로 설정할 경우, 기존 대표 프로필을 해제
  if (profileData.isDefault) {
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ is_default: false })
      .eq("user_id", user.user.id)
      .eq("is_default", true)
      .neq("id", profileData.id);

    if (updateError) {
      console.error("기존 대표 프로필 업데이트 오류:", updateError);
    }
  }

  // 필드 이름 매핑
  const updatedProfile: Record<string, string | number | boolean | null> = {};

  if (profileData.name !== undefined) updatedProfile.name = profileData.name;
  if (profileData.schoolName !== undefined) updatedProfile.school_name = profileData.schoolName;
  if (profileData.ATPT_OFCDC_SC_CODE !== undefined)
    updatedProfile.atpt_ofcdc_sc_code = profileData.ATPT_OFCDC_SC_CODE;
  if (profileData.SD_SCHUL_CODE !== undefined)
    updatedProfile.sd_schul_code = profileData.SD_SCHUL_CODE;
  if (profileData.weight !== undefined) updatedProfile.weight = profileData.weight;
  if (profileData.goal !== undefined) updatedProfile.goal = profileData.goal;
  if (profileData.gender !== undefined) updatedProfile.gender = profileData.gender;
  if (profileData.isActive !== undefined) updatedProfile.is_active = profileData.isActive;
  if (profileData.isDefault !== undefined) updatedProfile.is_default = profileData.isDefault;

  updatedProfile.updated_at = new Date().toISOString();

  const { data: updatedProfileData, error } = await supabase
    .from("profiles")
    .update(updatedProfile)
    .eq("id", profileData.id)
    .eq("user_id", user.user.id)
    .select()
    .single();

  if (error) {
    console.error("프로필 수정 오류:", error);
    throw new Error("프로필을 수정하는 중 오류가 발생했습니다.");
  }

  // 컬럼명을 camelCase로 변환
  const data: ProfileData = {
    id: updatedProfileData.id,
    userId: updatedProfileData.user_id,
    name: updatedProfileData.name,
    schoolName: updatedProfileData.school_name,
    ATPT_OFCDC_SC_CODE: updatedProfileData.atpt_ofcdc_sc_code,
    SD_SCHUL_CODE: updatedProfileData.sd_schul_code,
    weight: updatedProfileData.weight,
    goal: updatedProfileData.goal,
    gender: updatedProfileData.gender,
    createdAt: updatedProfileData.created_at,
    updatedAt: updatedProfileData.updated_at,
    isActive: updatedProfileData.is_active,
    isDefault: updatedProfileData.is_default,
  };

  revalidatePath("/main");
  return data;
}

export async function deleteProfile(profileId: string): Promise<void> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { data: profileData, error: fetchError } = await supabase
    .from("profiles")
    .select("is_default")
    .eq("id", profileId)
    .eq("user_id", user.user.id)
    .single();

  if (fetchError) {
    console.error("프로필 조회 오류:", fetchError);
    throw new Error("프로필을 찾을 수 없습니다.");
  }

  const { error } = await supabase
    .from("profiles")
    .update({ is_active: false, updated_at: new Date().toISOString() })
    .eq("id", profileId)
    .eq("user_id", user.user.id);

  if (error) {
    console.error("프로필 삭제 오류:", error);
    throw new Error("프로필을 삭제하는 중 오류가 발생했습니다.");
  }

  // 대표 프로필이 삭제된 경우 새로운 대표 프로필 설정
  if (profileData.is_default) {
    const { data: activeProfiles, error: listError } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user.user.id)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(1);

    if (!listError && activeProfiles && activeProfiles.length > 0) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_default: true })
        .eq("id", activeProfiles[0].id);

      if (updateError) {
        console.error("새 대표 프로필 설정 오류:", updateError);
      }
    }
  }

  revalidatePath("/main");
}

/**
 * 사용자의 대표 프로필을 조회합니다.
 */
export async function getDefaultProfile(): Promise<ProfileData | null> {
  const supabase = await createClient();

  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error("인증되지 않은 사용자입니다.");
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.user.id)
    .eq("is_active", true)
    .eq("is_default", true)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // 데이터가 없는 경우 (대표 프로필이 설정되지 않은 경우)
      return null;
    }
    console.error("대표 프로필 조회 오류:", error);
    throw new Error("대표 프로필을 조회하는 중 오류가 발생했습니다.");
  }

  // 컬럼명을 camelCase로 변환
  const data: ProfileData = {
    id: profile.id,
    userId: profile.user_id,
    name: profile.name,
    schoolName: profile.school_name,
    ATPT_OFCDC_SC_CODE: profile.atpt_ofcdc_sc_code,
    SD_SCHUL_CODE: profile.sd_schul_code,
    weight: profile.weight,
    goal: profile.goal,
    gender: profile.gender,
    createdAt: profile.created_at,
    updatedAt: profile.updated_at,
    isActive: profile.is_active,
    isDefault: profile.is_default,
  };

  return data;
}
