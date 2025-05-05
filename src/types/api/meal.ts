/**
 * 급식 정보 API 요청 파라미터 타입
 */
export interface MealApiParams {
  KEY?: string; // 인증키 (필수)
  Type?: "xml" | "json"; // 호출 문서(xml, json) (필수)
  pIndex?: number; // 페이지 위치 (필수)
  pSize?: number; // 페이지 당 신청 숫자 (필수)
  ATPT_OFCDC_SC_CODE: string; // 시도교육청코드 (필수)
  SD_SCHUL_CODE: string; // 표준학교코드 (필수)
  MLSV_YMD?: string; // 급식일자(YYYYMMDD) (선택)
  MLSV_FROM_YMD?: string; // 급식시작일자(YYYYMMDD) (선택)
  MLSV_TO_YMD?: string; // 급식종료일자(YYYYMMDD) (선택)
}

/**
 * 급식 정보 응답 데이터 타입
 */
export interface MealInfoData {
  ATPT_OFCDC_SC_CODE: string; // 시도교육청코드
  ATPT_OFCDC_SC_NM: string; // 시도교육청명
  SD_SCHUL_CODE: string; // 표준학교코드
  SCHUL_NM: string; // 학교명
  MMEAL_SC_CODE: string; // 식사코드
  MMEAL_SC_NM: string; // 식사명 (조식, 중식, 석식)
  MLSV_YMD: string; // 급식일자(YYYYMMDD)
  MLSV_FGR: string; // 급식인원수
  DDISH_NM: string; // 요리명
  ORPLC_INFO: string; // 원산지정보
  CAL_INFO: string; // 칼로리정보
  NTR_INFO: string; // 영양정보
  MLSV_FROM_YMD: string; // 급식시작일자
  MLSV_TO_YMD: string; // 급식종료일자
}

/**
 * 식사 코드 타입
 */
export enum MealCode {
  BREAKFAST = "1", // 조식
  LUNCH = "2", // 중식
  DINNER = "3", // 석식
}

/**
 * API 응답 타입
 */
export interface MealApiResponse {
  mealServiceDietInfo: [
    {
      head: [{ list_total_count: number }, { RESULT: { CODE: string; MESSAGE: string } }];
    },
    {
      row: MealInfoData[];
    },
  ];
}

/**
 * 가공된 급식 정보 타입
 */
export interface ProcessedMealInfo {
  date: string; // 급식일자 (YYYY-MM-DD 형식)
  mealType: string; // 식사유형 (조식, 중식, 석식)
  menu: string[]; // 메뉴 항목 배열
  calories: string; // 칼로리 정보
  nutrition: Record<string, string>; // 영양소 정보 (단백질, 탄수화물 등)
  origin: Record<string, string>; // 원산지 정보
}
