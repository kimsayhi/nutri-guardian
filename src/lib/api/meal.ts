import {
  MealApiParams,
  MealApiResponse,
  MealCode,
  MealInfoData,
  ProcessedMealInfo,
} from "@/types/api/meal";
import axios from "axios";

export const MEAL_API_KEY = process.env.NEXT_PUBLIC_MEAL_API_KEY;
export const MEAL_API_BASE_URL = process.env.NEXT_PUBLIC_MEAL_API_BASE_URL;

const mealApiClient = axios.create({
  baseURL: MEAL_API_BASE_URL,
  params: {
    KEY: MEAL_API_KEY,
    Type: "json",
  },
});

/**
 * 급식 정보를 가져오는 API 함수
 * @param params 급식 API 파라미터
 * @returns 급식 정보 배열
 */
export async function fetchMealInfo(params: MealApiParams): Promise<MealInfoData[]> {
  try {
    const defaultParams: Partial<MealApiParams> = {
      pIndex: 1,
      pSize: 100,
    };

    const response = await mealApiClient.get("", {
      params: {
        ...defaultParams,
        ...params,
      },
    });

    const data = response.data as MealApiResponse;
    console.log(data);
    if (!data.mealServiceDietInfo || data.mealServiceDietInfo.length < 2) {
      return [];
    }

    return data.mealServiceDietInfo[1].row || [];
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
      console.error("급식 정보 조회 중 오류 발생:", error);
    }

    // 에러 처리 후 빈 배열 반환 (또는 throw error로 에러를 상위로 전파 가능)
    return [];
  }
}

/**
 * 특정 날짜의 급식 정보를 가져오는 함수
 * @param SD_SCHUL_CODE 학교 코드
 * @param ATPT_OFCDC_SC_CODE 교육청 코드
 * @param MLSV_YMD 날짜 (YYYYMMDD 형식)
 * @returns 급식 정보 배열
 */
export async function getMealsByDate(
  SD_SCHUL_CODE: string,
  ATPT_OFCDC_SC_CODE: string,
  MLSV_YMD: string
): Promise<MealInfoData[]> {
  return fetchMealInfo({
    SD_SCHUL_CODE,
    ATPT_OFCDC_SC_CODE,
    MLSV_YMD,
  });
}

/**
 * 기간별 급식 정보를 가져오는 함수
 * @param SD_SCHUL_CODE 학교 코드
 * @param ATPT_OFCDC_SC_CODE 교육청 코드
 * @param MLSV_FROM_YMD 시작 날짜 (YYYYMMDD 형식)
 * @param MLSV_TO_YMD 종료 날짜 (YYYYMMDD 형식)
 * @returns 급식 정보 배열
 */
export async function getMealsByPeriod(
  SD_SCHUL_CODE: string,
  ATPT_OFCDC_SC_CODE: string,
  MLSV_FROM_YMD: string,
  MLSV_TO_YMD: string
): Promise<MealInfoData[]> {
  return fetchMealInfo({
    SD_SCHUL_CODE,
    ATPT_OFCDC_SC_CODE,
    MLSV_FROM_YMD,
    MLSV_TO_YMD,
  });
}

/**
 * 급식 정보를 가공하는 함수
 * @param mealData 원본 급식 데이터
 * @returns 가공된 급식 정보
 */
export function processMealInfo(mealData: MealInfoData): ProcessedMealInfo {
  // YYYYMMDD 형식을 YYYY-MM-DD로 변환
  const date = mealData.MLSV_YMD.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");

  // 요리명 분리 (쌀밥<br/>미역국<br/>... 형태)
  const menu = mealData.DDISH_NM.split("<br/>").map((item) => item.trim());

  // 칼로리 정보 추출
  const calories = mealData.CAL_INFO;

  // 식사 유형 결정
  let mealType = "알 수 없음";
  switch (mealData.MMEAL_SC_CODE) {
    case MealCode.BREAKFAST:
      mealType = "조식";
      break;
    case MealCode.LUNCH:
      mealType = "중식";
      break;
    case MealCode.DINNER:
      mealType = "석식";
      break;
  }

  // 영양소 정보 파싱 (단백질:13.3g 탄수화물:99.6g 형태)
  const nutrition: Record<string, string> = {};
  if (mealData.NTR_INFO) {
    mealData.NTR_INFO.split("<br/>").forEach((item) => {
      const [name, value] = item.split(":");
      if (name && value) {
        nutrition[name.trim()] = value.trim();
      }
    });
  }

  // 원산지 정보 파싱 (쌀:국내산 돼지고기:국내산 형태)
  const origin: Record<string, string> = {};
  if (mealData.ORPLC_INFO) {
    mealData.ORPLC_INFO.split("<br/>").forEach((item) => {
      const [item_name, origin_name] = item.split(":");
      if (item_name && origin_name) {
        origin[item_name.trim()] = origin_name.trim();
      }
    });
  }

  return {
    date,
    mealType,
    menu,
    calories,
    nutrition,
    origin,
  };
}
