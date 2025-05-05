import dayjs from "dayjs";

/**
 * 날짜를 원하는 형식으로 포맷팅하는 함수
 * @param date 포맷팅할 날짜 객체 또는 문자열
 * @param format 날짜 포맷 (YYYY-MM-DD, YYYYMMDD 등)
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDate(date: Date | string, format: string = "YYYY-MM-DD"): string {
  return dayjs(date).format(format);
}

/**
 * YYYYMMDD 형식의 문자열을 Date 객체로 변환
 * @param dateString YYYYMMDD 형식의 날짜 문자열
 * @returns Date 객체
 */
export function parseYYYYMMDD(dateString: string): Date {
  return dayjs(dateString, "YYYYMMDD").toDate();
}

/**
 * YYYY-MM-DD 형식의 문자열을 Date 객체로 변환
 * @param dateString YYYY-MM-DD 형식의 날짜 문자열
 * @returns Date 객체
 */
export function parseYYYYMMDDDash(dateString: string): Date {
  return dayjs(dateString).toDate();
}

/**
 * 날짜를 YYYYMMDD 형식의 문자열로 변환
 * @param date 날짜 객체 또는 문자열
 * @returns YYYYMMDD 형식의 문자열
 */
export function toYYYYMMDD(date: Date | string): string {
  return dayjs(date).format("YYYYMMDD");
}

/**
 * 날짜를 YYYY-MM-DD 형식의 문자열로 변환
 * @param date 날짜 객체 또는 문자열
 * @returns YYYY-MM-DD 형식의 문자열
 */
export function toYYYYMMDDDash(date: Date | string): string {
  return dayjs(date).format("YYYY-MM-DD");
}

/**
 * 현재 날짜를 지정된 형식으로 반환
 * @param format 날짜 포맷
 * @returns 포맷팅된 현재 날짜
 */
export function getCurrentDate(format: string = "YYYY-MM-DD"): string {
  return dayjs().format(format);
}
