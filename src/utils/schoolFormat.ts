import { SchoolInfoData } from "@/types/api/school";
import { FormattedSchoolList } from "@/types/school";

/**
 * 학교 정보 배열을 받아 중복 이름을 처리한 포맷된 학교 정보 객체 배열 반환
 *
 * @param schools 학교 정보 배열
 * @returns 포맷된 학교 정보 객체 배열 (이름, 시도교육청코드, 행정표준코드)
 */
export function formatSchoolList(schools: SchoolInfoData[]): FormattedSchoolList[] {
  if (!schools || schools.length === 0) return [];

  // 학교명 중복 체크
  const nameCount = schools.reduce(
    (count, school) => {
      const name = school.SCHUL_NM;
      count[name] = (count[name] || 0) + 1;
      return count;
    },
    {} as Record<string, number>
  );

  return schools.map((school) => {
    const result: FormattedSchoolList = {
      schoolName: school.SCHUL_NM,
      ATPT_OFCDC_SC_CODE: school.ATPT_OFCDC_SC_CODE,
      SD_SCHUL_CODE: school.SD_SCHUL_CODE,
    };

    if (nameCount[school.SCHUL_NM] > 1) {
      const addressParts = school.ORG_RDNMA.split(" ");
      const locationName = addressParts.length > 1 ? addressParts[1] : "";

      if (locationName) {
        result.schoolName = `${school.SCHUL_NM}(${locationName})`;
      }
    }

    return result;
  });
}
