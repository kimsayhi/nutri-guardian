import axios from "axios";
import type { SchoolApiParams, SchoolInfoData, SchoolApiResponse } from "@/types/api/school";

export const SCHOOL_API_KEY =
  process.env.NEXT_PUBLIC_SCHOOL_API_KEY || "aa9b88a10fb041db8dc9a80cbc23b77c";
export const SCHOOL_API_BASE_URL =
  process.env.NEXT_PUBLIC_SCHOOL_API_BASE_URL || "https://open.neis.go.kr/hub/schoolInfo";

const schoolApiClient = axios.create({
  baseURL: SCHOOL_API_BASE_URL,
  params: {
    KEY: SCHOOL_API_KEY,
    Type: "json",
  },
});

export async function fetchSchoolInfo(params: SchoolApiParams): Promise<SchoolInfoData[]> {
  try {
    const defaultParams: SchoolApiParams = {
      pIndex: 1,
      pSize: 20,
    };

    const response = await schoolApiClient.get("", {
      params: {
        ...defaultParams,
        ...params,
      },
    });

    const data = response.data as SchoolApiResponse;

    if (!data.schoolInfo || data.schoolInfo.length < 2) {
      return [];
    }

    return data.schoolInfo[1].row || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios 오류:", error.message);
      if (error.response) {
        console.error("응답 데이터:", error.response.data);
        console.error("응답 상태:", error.response.status);
      } else if (error.request) {
        console.error("요청 오류:", error.request);
      }
    } else {
      console.error("학교 정보 조회 중 오류 발생:", error);
    }
    throw error;
  }
}

export async function searchSchoolByName(schoolName: string): Promise<SchoolInfoData[]> {
  if (schoolName.trim() === "") {
    return [];
  }
  return fetchSchoolInfo({ SCHUL_NM: schoolName });
}
